import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStroe'; 
import { toast } from 'react-hot-toast';
import useAuth from "../store/useAuth";
import Fotter from './Fotter';
import Navbar from './Navbar';

export default function CreateProductForm() {
  const { checkAuth } = useAuth();
  const { createProduct, loading } = useProductStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageURL: ''
  });
  const navigate = useNavigate();

  const validateForm = () => {
    const { name, description, price, imageURL } = formData;
    
    if (!name || !description || !price || !imageURL) {
      toast.error('All fields are required!');
      return false;
    }
    if (isNaN(price) || price <= 0) {
      toast.error('Price must be a positive number!');
      return false;
    }
    if (!imageURL.startsWith('http')) {
      toast.error('Image URL must start with http or https!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkAuth) {
      toast.error('Please sign up first');
      return navigate('/signUp');
    }
    
    if (!validateForm()) return;

    try {
      await createProduct(formData);
      toast.success('Product created successfully!');
      navigate('/products-list'); 
    } catch (error) {
      toast.error('Failed to create product!');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
    <Navbar/>
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-primary text-white py-4">
              <h3 className="mb-0">
                <i className="fas fa-plus-circle me-3"></i>
                Create New Product
              </h3>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold text-muted">
                    <i className="fas fa-tag me-2"></i>
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg border-2"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    disabled={loading}
                  />
                </div>

                {/* Description Field */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-bold text-muted">
                    <i className="fas fa-align-left me-2"></i>
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg border-2"
                    id="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    disabled={loading}
                  />
                </div>

                {/* Price & Image URL Row */}
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label fw-bold text-muted">
                      <i className="fas fa-dollar-sign me-2"></i>
                      Price
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-2">$</span>
                      <input
                        type="number"
                        className="form-control form-control-lg border-2"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="imageURL" className="form-label fw-bold text-muted">
                      <i className="fas fa-image me-2"></i>
                      Image URL
                    </label>
                    <input
                      type="url"
                      className="form-control form-control-lg border-2"
                      id="imageURL"
                      value={formData.imageURL}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg fw-bold" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plus-circle me-2"></i>
                        Create Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Fotter/>
    </>
  );
}