import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Product, CategoryColors } from "../types/product";
import { Sparkles } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const productRes = await fetch(
          "https://dummyjson.com/products?limit=10000"
        );
        const productData = await productRes.json();

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(
            productData.products.map((product: Product) => product.category)
          ),
        ].filter(Boolean) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Categories</h2>
          <p className="text-gray-600 text-lg">
            Discover our amazing product collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const colors = getCategoryColors(category, index);
            const initials = getCategoryInitials(category);

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
              >
                <Link
                  to={`/home?category=${category}`}
                  className="block w-full h-full"
                >
                  <div
                    className={`
                    relative overflow-hidden rounded-3xl 
                    bg-white border-2 ${colors.border}
                    group-hover:shadow-2xl transition-all duration-500
                    aspect-square flex flex-col items-center justify-center p-6
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

                    {/* Icon container with gradient */}
                    <div
                      className={`
                      relative z-10 mb-6 p-4 rounded-2xl 
                      bg-gradient-to-br ${colors.gradient} 
                      group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                      shadow-lg group-hover:shadow-xl
                    `}
                    >
                      <div className="text-white text-2xl font-bold">
                        {initials}
                      </div>
                    </div>

                    {/* Category name */}
                    <div className="relative z-10 text-center">
                      <h3
                        className={`
                        font-bold text-lg capitalize mb-2 leading-tight
                        ${colors.text}
                        group-hover:scale-105 transition-transform duration-300
                      `}
                      >
                        {category.replace(/-/g, " ")}
                      </h3>
                      <div className="flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium">
                          Explore
                        </p>
                        <Sparkles className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute top-3 right-3 w-2 h-2 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute bottom-3 left-3 w-1 h-1 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 animate-pulse"></div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-all duration-700"></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
