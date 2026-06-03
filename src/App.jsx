import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./header-footer/header";
import Footer from "./header-footer/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcommerceBrandProvider } from "./context/useEcommerceContext";

import Home from "./pages/home";
import ProductList from "./pages/productList";
import ProductDetails from "./pages/productDetails";
import WishList from "./pages/wishlist";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import Address from "./pages/address";
import Checkout from "./pages/checkout";
import Order from "./pages/order";

function App() {

  return (
    <EcommerceBrandProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/productlist/:categoryId" element={<ProductList />} />
          <Route path="/category/productlist/details" element={<ProductDetails />} />
          <Route path="/user/wishlist" element={<WishList />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/profile/address" element={<Address />} />
          <Route path="/user/profile/checkout" element={<Checkout />} />
          <Route path="/user/profile/orders" element={<Order />} />
          <Route path="/" element={<div>Home placeholder</div>} />
        </Routes>
        <Footer />
      </Router>
    </EcommerceBrandProvider>
  )
}

export default App;
