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
import Sidebar from "./components/navbar/Sidebar";

function App() {
  const { bannerIsHidden } = scrollHook();
  const location = useLocation();
  const hiddenPaths = ["/login", "/register"];
  const shouldShowNavbarAndFooter = !hiddenPaths.includes(location.pathname);

  const { user } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const [sidebarIsActive, setSidebarIsActive] = useState(false);

  const handleSidebar = () => setSidebarIsActive(!sidebarIsActive);

  useEffect(() => {
    if (user) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="bg-black min-h-screen">
      {showModal && <WelcomeUser />}

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
        </Routes>
      </AnimatePresence>

      {shouldShowNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
