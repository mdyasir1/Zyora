import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(!!categoryParam || !!searchQuery);

  // Fetch products once
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=1000");
        const data = await res.json();
        setProducts(data.products);

        const uniqueCategories = [...new Set(data.products.map((product: Product) => product.category))].filter(Boolean);
        setCategories(uniqueCategories as string[]);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sync search/category to internal state and determine view mode
  useEffect(() => {
    setSearchInput(searchQuery);

    if (searchQuery) {
      setShowAllProducts(true);
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      setShowAllProducts(true);
    } else {
      setSelectedCategory("");
      setShowAllProducts(false);
    }
  }, [searchQuery, categoryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const handleCategorySelect = (category: string) => {
    setSearchParams({ category });
  };

  // Filtering logic
  let filtered = products;

  if (selectedCategory && !searchQuery) {
    filtered = filtered.filter((product) => product.category === selectedCategory);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((product) =>
      (product.title && product.title.toLowerCase().includes(query)) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (product.category && product.category.toLowerCase().includes(query)) ||
      (product.price && product.price.toString().includes(query)) ||
      (product.rating && product.rating.toString().includes(query))
    );
  }

  // Sorting logic
  switch (sortBy) {
    case "price-low":
      filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case "price-high":
      filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case "rating":
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "name":
      filtered = [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      break;
    default:
      break;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Discover Amazing Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Shop the latest trends with our curated collection of premium products
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm px-2 py-2 mb-8">
          <div className="flex sm:flex-row gap-2 sm:items-center">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-4 h-4"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Sort Dropdown */}
            {selectedCategory && !searchQuery && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-28 sm:w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            )}
          </div>
        </div>

        {/* Categories Section */}
        {!showAllProducts && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategorySelect(category)}
                  className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-all text-center aspect-square flex items-center justify-center"
                >
                  <div className="text-blue-600 capitalize font-medium">{category}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {showAllProducts && (
          <>
            {selectedCategory && !searchQuery && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{selectedCategory}</h2>
                <button
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Back to Categories
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or browse all products
                </p>
                <button
                  onClick={() => {
                    setSearchParams({});
                    setSortBy("");
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} searchQuery={searchQuery} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Result Summary */}
            {filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center text-gray-600"
              >
                Showing {filtered.length} products
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
