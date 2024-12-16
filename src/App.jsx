import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import "@fontsource/ubuntu-mono";
import Navbar from "./components/navbar/Navbar";
import Shop from "./pages/Shop";
import scrollHook from "./utils/scrollHook";
import SingleProduct from "./components/product/SingleProduct";
import Footer from "./components/footer/Footer";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { bannerIsHidden } = scrollHook();
  const location = useLocation();
  const shouldShowNavbarAndFooter =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <div className="">
      {shouldShowNavbarAndFooter && (
        <>
          <ScrollToTop />
          <Navbar bannerIsHidden={bannerIsHidden} />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {shouldShowNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
