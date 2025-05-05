import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <i className="fas fa-gifts me-2"></i>
          Wishlist App
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fas fa-home me-2"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create-product">
                <i className="fas fa-plus-circle me-2"></i>
                Add Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="products-list">
                <i className="fas fa-plus-circle me-2"></i>
                All Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/all-wishlists">
                <i className="fas fa-heart me-2"></i>
                Wishlist
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;