import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ZY</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zyora
            </span>
          </Link>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              to="/account"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" />
              {getTotalItems() > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {getTotalItems() > 99 ? "99+" : getTotalItems()}
                </motion.div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 py-4"
          >
            {/* Mobile Navigation */}
            <div className="space-y-4">
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Link>
              <Link
                to="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <User className="w-5 h-5 mr-2" />
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
