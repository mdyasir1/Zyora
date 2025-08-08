import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product, CategoryColors } from "../types/product";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [searchInput, setSearchInput] = useState<string>(searchQuery);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(!!categoryParam || !!searchQuery);

  // Dynamic color generation based on category name
  const getCategoryColors = (_category: string, index: number): CategoryColors => {
    const colorPalettes = [
      {
        bg: "bg-blue-50",
        text: "text-blue-600",
        gradient: "from-blue-500 to-blue-600",
        border: "border-blue-200",
      },
      {
        bg: "bg-purple-50",
        text: "text-purple-600",
        gradient: "from-purple-500 to-purple-600",
        border: "border-purple-200",
      },
      {
        bg: "bg-pink-50",
        text: "text-pink-600",
        gradient: "from-pink-500 to-pink-600",
        border: "border-pink-200",
      },
      {
        bg: "bg-green-50",
        text: "text-green-600",
        gradient: "from-green-500 to-green-600",
        border: "border-green-200",
      },
      {
        bg: "bg-orange-50",
        text: "text-orange-600",
        gradient: "from-orange-500 to-orange-600",
        border: "border-orange-200",
      },
      {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
        gradient: "from-indigo-500 to-indigo-600",
        border: "border-indigo-200",
      },
      {
        bg: "bg-amber-50",
        text: "text-amber-600",
        gradient: "from-amber-500 to-amber-600",
        border: "border-amber-200",
      },
      {
        bg: "bg-rose-50",
        text: "text-rose-600",
        gradient: "from-rose-500 to-rose-600",
        border: "border-rose-200",
      },
      {
        bg: "bg-fuchsia-50",
        text: "text-fuchsia-600",
        gradient: "from-fuchsia-500 to-fuchsia-600",
        border: "border-fuchsia-200",
      },
      {
        bg: "bg-cyan-50",
        text: "text-cyan-600",
        gradient: "from-cyan-500 to-cyan-600",
        border: "border-cyan-200",
      },
      {
        bg: "bg-sky-50",
        text: "text-sky-600",
        gradient: "from-sky-500 to-sky-600",
        border: "border-sky-200",
      },
      {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        gradient: "from-emerald-500 to-emerald-600",
        border: "border-emerald-200",
      },
      {
        bg: "bg-violet-50",
        text: "text-violet-600",
        gradient: "from-violet-500 to-violet-600",
        border: "border-violet-200",
      },
      {
        bg: "bg-teal-50",
        text: "text-teal-600",
        gradient: "from-teal-500 to-teal-600",
        border: "border-teal-200",
      },
      {
        bg: "bg-lime-50",
        text: "text-lime-600",
        gradient: "from-lime-500 to-lime-600",
        border: "border-lime-200",
      },
    ];

    return colorPalettes[index % colorPalettes.length];
  };

  // Generate initials from category name
  const getCategoryInitials = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

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
    // Example for map
 
    
    // Example for filter
    filtered = filtered.filter((product: Product) => product.category === selectedCategory);
    
    // Example for sort
    filtered = [...filtered].sort((a: Product, b: Product) => (a.price || 0) - (b.price || 0));
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((category, index) => {
                const colors = getCategoryColors(category, index);

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="block w-full h-full">
                      <div
                        className={`
                        relative overflow-hidden rounded-3xl 
                        bg-white border-2 ${colors.border}
                        group-hover:shadow-2xl transition-all duration-500
                        aspect-square flex flex-col items-center justify-center p-3 sm:p-6
                        ${colors.bg}
                      `}
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-gray-400 to-transparent rounded-full -translate-x-10 -translate-y-10"></div>
                          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gray-400 to-transparent rounded-full translate-x-8 translate-y-8"></div>
                        </div>

                        {/* Gradient overlay on hover */}
                        <div
                          className={`
                          absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 
                          transition-all duration-500 ${colors.gradient}
                        `}
                        ></div>

                        {/* Category name */}
                        <div className="relative z-10 text-center">
                          <h3
                            className={`
                            font-bold text-sm sm:text-base md:text-lg capitalize mb-1 sm:mb-2 leading-tight
                            ${colors.text}
                            group-hover:scale-105 transition-transform duration-300
                          `}
                          >
                            {category.replace(/-/g, " ")}
                          </h3>
                        </div>

                        {/* Floating decorative elements */}
                        <div className="absolute top-3 right-3 w-2 h-2 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 animate-pulse"></div>

                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-all duration-700"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {showAllProducts && (
          <>
            {selectedCategory && !searchQuery && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{selectedCategory}</h2>
                <button
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium"
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
