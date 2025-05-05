import React from 'react'
import { Routes,Route ,useNavigate} from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import useAuth from './store/useAuth';
import { useEffect } from "react";
import { Toaster} from 'react-hot-toast'
import CreateProductForm from './components/CreateFromProduct';
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetails'
import CreateWishlist from './components/CreateWishList'
import WishlistList from './components/WishlistList'
import EditWishlist from './components/EditWishlist'

function App() {
  const navigate = useNavigate();
  const {checkAuth,isCheckingAuth,authUser}=useAuth()

  useEffect(() => {
    checkAuth();
   
  
   
  }, [])
  
  {
    if(isCheckingAuth && !authUser){
      <p>loading..</p>
    }
  }
  return (
    
    <div>
     
      
       
      <Routes>
        <Route path='/' element={!authUser?<SignUp/>:<Home/>}/>
        <Route path='/create-wishlist' element={!authUser?<SignUp/>:<CreateWishlist/>}/>
        <Route path='/all-wishlists' element={<WishlistList/>}/>
        <Route path='/edit-wishlist/:id' element={!authUser?<SignUp/>:<EditWishlist/>}/>
        <Route path='/products-list' element={<ProductList/>}/>
        <Route path='/products/:id' element={!authUser?<SignUp/>:<ProductDetail/>}/>
        <Route path='/create-product' element={!authUser?<SignUp/>:<CreateProductForm/>}/>
   
        <Route path='/login'element={<Login/>}/>
        <Route path='/signUp'element={<SignUp/>}/>
   


      </Routes>
     <Toaster/>

    </div>
  )
}

export default App