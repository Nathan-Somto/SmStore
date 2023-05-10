import {Routes, Route} from 'react-router-dom'
import Home from './Home';
import Product from './Product';
import Category from './Category';
import Notfound from './Notfound';
function Pages() {
  return (
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='product/:id' element={<Product/>}/>
          <Route path='category/:categoryname' element={<Category/>}/>
          <Route path='*' element={<Notfound/>}/>
      </Routes>
  )
}

export default Pages;