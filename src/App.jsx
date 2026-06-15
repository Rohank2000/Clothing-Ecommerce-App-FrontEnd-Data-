import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./header-footer/header";
import Footer from "./header-footer/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcommerceBrandProvider } from "./context/useEcommerceContext";
import { useEffect } from "react";
import Alert from "./component/alert";

import Home from "./pages/home";
import ProductList from "./pages/productList";
import ProductDetails from "./pages/productDetails";
import WishList from "./pages/wishlist";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import Address from "./pages/address";
import Checkout from "./pages/checkout";
import Order from "./pages/order";
import OrderSuccess from "./pages/orderSuccess";

function App() {

    useEffect(() => {
    const keepBackendWarm = () => {
      fetch(`${BASE_URL}/api/fetch/clothing`).catch(() => {});
      fetch(`${BASE_URL}/api/fetch/categories`).catch(() => {});
    };

    keepBackendWarm();

    const interval = setInterval(keepBackendWarm, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

return (
  <EcommerceBrandProvider>
    <Router>
      <div className="app-root d-flex flex-column min-vh-100">
        <Header />
        <Alert />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/productlist/:categoryId" element={<ProductList />} />
            <Route path="/category/productlist/details/:clothingId" element={<ProductDetails />} />
            <Route path="/user/wishlist" element={<WishList />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/address" element={<Address />} />
            <Route path="/user/profile/checkout" element={<Checkout />} />
            <Route path="/user/profile/order-success" element={<OrderSuccess />} />
            <Route path="/user/profile/orders" element={<Order />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </EcommerceBrandProvider>
);
}

export default App;
