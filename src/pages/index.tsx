import {useEffect} from "react";
import { useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom'
import { selectItem } from '../features/cart/cartSlice';
import Navbar from '../components/Navbar';
import Loader from "./Loader";
import Home from './Home';
import ProductDetails from './ProductDetails';
import Category from './Category';
import Cart from './Cart';
import Contact from './Contact';
import Checkout from './Checkout';
import Notfound from './Notfound';
import Success from './Success';
import About from './About';
import ScrollToUp from "../components/ScrollToUp";
import Footer from '../components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Pages() {
  const items = useSelector(selectItem);
  // as the user adds to thier cart we store it in local storage in case they refresh the app.
  useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(items));
  },[items])
  return (
    <>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Loader/>}/>
          <Route path='home' element={<Home/>} />
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='category/:categoryname' element={<Category/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path="about" element={<About/>}/>
          <Route path='success' element={<Success/>}/>
          <Route path='*' element={<Notfound/>}/>
      </Routes>
      <ScrollToUp/>
      <Footer/>
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      </>
  )
}

export default Pages;