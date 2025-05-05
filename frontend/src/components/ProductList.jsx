import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStroe';
import Fotter from './Fotter';
import Navbar from './Navbar';
import { toast } from 'react-hot-toast';

export default function ProductList() {
  const { fetchProducts, fetchProductById, loading, products, error } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCardClick = async (productId) => {
    await fetchProductById(productId);
    navigate(`/products/${productId}`);
  };

  const handleCreateWishlistWithProduct = (e, productId) => {
    e.stopPropagation();
    navigate('/create-wishlist', { state: { productId } });
  };

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-3 mt-4" role="alert">
        <i className="fas fa-exclamation-circle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-primary">
        <i className="fas fa-box-open me-2"></i>
        All Products
      </h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="display-1 text-muted mb-3">
              <i className="fas fa-box-open"></i>
            </div>
            <h4 className="text-muted">No products found</h4>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="col">
              <div 
                className="card h-100 shadow-sm border-0 hover-shadow transition-all"
                onClick={() => handleCardClick(product._id)}
                role="button"
              >
                <div className="ratio ratio-16x9">
                  <img
                    src={product.imageURL}
                    className="card-img-top object-fit-cover"
                    alt={product.name}
                  />
                </div>
                
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">{product.name}</h5>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={(e) => handleCreateWishlistWithProduct(e, product._id)}
                      title="Add to wishlist"
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                  
                  <p className="card-text text-muted flex-grow-1">
                    {product.description}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge bg-primary rounded-pill fs-6">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(product._id);
                      }}
                    >
                      <i className="fas fa-info-circle me-2"></i>
                      Details
                    </button>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between small text-muted">
                  <div>
                    <i className="fas fa-user me-1"></i>
                    {product.addedBy?.username || 'Unknown'}
                  </div>
                  {product.createdAt && (
                    <div>
                      <i className="fas fa-calendar me-1"></i>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
    <Fotter />
    </>
  );
}