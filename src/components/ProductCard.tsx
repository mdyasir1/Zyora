import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye, Plus } from "lucide-react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  searchQuery?: string;
}

const ProductCard = ({ product, searchQuery }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Function to highlight search terms
  const highlightText = (text: string, query?: string) => {
    if (!query || !text) return text;

    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escapedQuery})`, "gi");
      const parts = text.split(regex);

      return parts.map((part, index) => {
        // Check if this part matches the query (case insensitive)
        if (part.toLowerCase() === query.toLowerCase()) {
          return (
            <mark
              key={index}
              className="bg-yellow-200 text-gray-800 px-1 rounded"
            >
              {part}
            </mark>
          );
        }
        return part;
      });
    } catch {
      // Fallback to original text if regex fails
      return text;
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isWishlisted
            ? "bg-red-500 text-white"
            : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick Actions Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2"
          >
            <button
              onClick={handleAddToCart}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Stock Badge */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {highlightText(product.title, searchQuery)}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {highlightText(product.description, searchQuery)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        {/* Price and Brand */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-lg text-blue-600">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs text-gray-500 capitalize">{product.brand}</p>
          </div>

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
