import Header from "./header-footer/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcommerceBrandProvider } from "./context/useEcommerceContext";

function App() {

  return (
    <EcommerceBrandProvider>
      <Router>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/category/productlist/:categoryId" element={<ProductList />} />
          <Route path="/category/productlist/details" element={<ProductDetails />} />
          <Route path="/user/wishlist" element={<WishList />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/profile/address" element={<Address />} />
          <Route path="/user/profile/addressupdate" element={<AddressUpdate />} />
          <Route path="/user/profile/checkout" element={<Checkout />} />
          <Route path="/user/profile/orders" element={<Order />} />
          <Route path="/" element={<div>Home placeholder</div>} />
        </Routes>
      </Router>
    </EcommerceBrandProvider>
  )
}

export default App;
