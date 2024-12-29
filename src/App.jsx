import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import Shop from "./pages/Shop";
import scrollHook from "./utils/scrollHook";
import SingleProduct from "./pages/SingleProduct";
import Footer from "./components/footer/Footer";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import WelcomeUser from "./components/modals/WelcomeUser";
import { AnimatePresence, motion } from "framer-motion";
import SellerDashboard from "./pages/SellerDashboard";
import Sidebar from "./components/navbar/Sidebar";
import useInactivityLogout from "./utils/useInactivityLogout";
import useCartStore from "./store/useCartLocalStorage";
import CartModal from "./components/modals/CartModal";
import SellerStore from "./pages/SellerStore";
import BuyerOrders from "./pages/BuyerOrders";
// import useFetchProducts from "./api/useFetchProducts";

function App() {
  // const { fetchAllProducts } = useFetchProducts();
  const { cartIsOpen, setCartIsOpen } = useCartStore();
  const { bannerIsHidden } = scrollHook();
  const location = useLocation();
  const hiddenPaths = ["/login", "/register"];
  const shouldShowNavbarAndFooter = !hiddenPaths.includes(location.pathname);

  const { user } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const [sidebarIsActive, setSidebarIsActive] = useState(false);

  const handleSidebar = () => setSidebarIsActive(!sidebarIsActive);

  useInactivityLogout();

  useEffect(() => {
    if (user) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // useEffect(() => {
  //   fetchAllProducts(); // Fetch all products on app load to populate the store with products data
  // }, []);

  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Cart Modal */}
      {<CartModal isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} />}

      {shouldShowNavbarAndFooter && (
        <>
          <ScrollToTop />
          <Navbar
            bannerIsHidden={bannerIsHidden}
            sidebarIsActive={sidebarIsActive}
            handleSidebar={handleSidebar}
          />
          <Sidebar
            sidebarIsShown={sidebarIsActive}
            handleSidebar={handleSidebar}
          />
        </>
      )}

      {showModal ? (
        <WelcomeUser />
      ) : (
        <>
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
                path="/shop/seller/:id"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <SellerStore />
                  </motion.div>
                }
              />
              <Route
                path="/account/myorders"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <BuyerOrders />
                  </motion.div>
                }
              />
              <Route
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
            </Routes>
          </AnimatePresence>
        </>
      )}

      {shouldShowNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
