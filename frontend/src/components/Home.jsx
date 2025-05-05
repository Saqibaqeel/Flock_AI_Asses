import React from 'react';
import ProductList from './ProductList';
import Fotter from './Fotter';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  return (
    <div>
      <Navbar/>
      {/* Hero Section */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4 mb-3">
            <i className="fas fa-shopping-bag text-primary"></i> Welcome to ShopEase
          </h1>
          <p className="lead mb-4">
            Discover our curated selection of products, handpicked just for you. 
            Shop, save, and enjoy! 
          </p>
          <a href="#products" className="btn btn-primary btn-lg">
            <i className="fas fa-star"></i> Explore Products
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fas fa-bolt fa-3x mb-3 text-warning"></i>
                <h5>Fast &amp; Reliable</h5>
                <p>Quick loading and smooth experience across all devices.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fas fa-heart fa-3x mb-3 text-danger"></i>
                <h5>Community Favorites</h5>
                <p>Top rated products loved by our users worldwide.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fas fa-lock fa-3x mb-3 text-success"></i>
                <h5>Secure Checkout</h5>
                <p>Your data is safe with industry-standard security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <Fotter/>
      
    </div>
  );
}