import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProductStore from '../store/productStroe';
import Fotter from './Fotter';
import Navbar from './Navbar';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchProductById,
    productDetail,
    loading,
    error,
    editProduct,
    deleteProduct
  } = useProductStore();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  });

  useEffect(() => {
    // fetch and populate
    fetchProductById(id).then((p) => {
      if (p) {
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          imageURL: p.imageURL
        });
      }
    });
  }, [id, fetchProductById]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await editProduct(id, form);
    navigate('/products-list');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      navigate('/products-list');
    }
  };

  if (loading) return (
    <div className="text-center mt-5">
      <i className="fas fa-spinner fa-pulse fa-2x"></i>
      <p>Loading product...</p>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger mt-5" role="alert">
      <i className="fas fa-exclamation-triangle"></i> {error}
    </div>
  );

  return (
    <>
    <Navbar />
    <div className="container my-4">
      <h2 className="mb-4"><i className="fas fa-box-open"></i> Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
           
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
           
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
           
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> Save Changes
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt"></i> Delete Product
          </button>
        </div>
      </form>
    </div>
    <Fotter />
    </>
  );
}
