
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import '@fontsource/ubuntu-mono';
import Navbar from './components/navbar/Navbar';
import Shop from './pages/Shop';
import scrollHook from './utils/scrollHook'
import SingleProduct from './components/product/SingleProduct';
import Footer from './components/footer/Footer';
import Cart from './pages/Cart';



function App() {
  const { bannerIsHidden } = scrollHook()

  return (
  <Router>
   <Navbar bannerIsHidden={bannerIsHidden}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />}/>
        <Route path='/shop/product/:id' element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
  </Router>
  )
}

export default App
