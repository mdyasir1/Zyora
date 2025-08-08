import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen onFinish={() => setLoading(false)} />
  ) : (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
