import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import WelcomeUser from "./components/modals/WelcomeUser";
import { AnimatePresence, motion } from "framer-motion";
import SellerDashboard from "./pages/SellerDashboard";

function App() {
  const { bannerIsHidden } = scrollHook();
  const location = useLocation();
  const shouldShowNavbarAndFooter =
    location.pathname !== "/login" && location.pathname !== "/register";

    const { user } = useAuthStore();

  const [showModal, setShowModal] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, },
    exit: { opacity: 0, y: 50 },
  };

  useEffect(() => {
    if (user) {
      setShowModal(true); // Show the modal
      const timer = setTimeout(() => {
        setShowModal(false); // Hide the modal after 3 seconds

      }, 3000); // 3000 ms = 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [user]); // Listen for changes to `user` and ensure `navigate` is up to date
 
  return (
    <div 
    className="bg-black">
      {showModal && <WelcomeUser />}

      {shouldShowNavbarAndFooter && (
        <>
          <ScrollToTop />
          <Navbar bannerIsHidden={bannerIsHidden} />
        </>
      )}

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            }
          />
       
        
          <Route
            path="/shop"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Shop />
              </motion.div>
            }
          />
          <Route
            path="/shop/product/:id"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <SingleProduct />
              </motion.div>
            }
          />
          <Route
            path="/cart"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                  <Cart />
              </motion.div>
            }
          />
            <Route
            path="/login"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                  <Register />
              </motion.div>
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                  <SellerDashboard />
              </motion.div>
            }
          />
        

          {/* <Route
            path="/contactus"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <ContactUs />
              </motion.div>
            }
          /> */}
          {/* <Route
            path="/checkout"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Checkout />
              </motion.div>
            }
          /> */}
        
        </Routes>
      </AnimatePresence>
      {shouldShowNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
