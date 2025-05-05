// components/CreateWishlist.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useWishListStore from '../store/wishListStroe';
import { toast } from 'react-hot-toast';
import useAuth from "../store/useAuth";
import Fotter from './Fotter';
import Navbar from './Navbar';
export default function CreateWishlist() {
  const { checkAuth } = useAuth();
  const [name, setName] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const { createWishlist, loading } = useWishListStore();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = location.state?.productId || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkAuth) {
      toast.error('Please sign up first');
      return navigate('/signUp');
    }

    if (!name.trim()) {
      toast.error('Wishlist name is required');
      return;
    }

    const collabArray = collaborators
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    try {
      await createWishlist({
        name,
        collaborators: collabArray,
        products: productId ? [productId] : []
      });

      toast.success('Wishlist created!');
      navigate('/all-wishlists');
    } catch (err) {
      toast.error('Failed to create wishlist');
    }
  };

  return (
    <>
      <Navbar />
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="fas fa-heart me-2"></i> Create Wishlist
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Wishlist Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Birthday Gifts"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Collaborators (comma-separated user emails)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., user1@example.com, user2@example.com"
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
              />
              <div className="form-text">
                Leave empty if you don’t want collaborators now.
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              <i className="fas fa-plus-circle me-1"></i>
              {loading ? 'Creating...' : 'Create Wishlist'}
            </button>
          </form>
        </div>
      </div>
    </div>
      <Fotter />
    </>
  );
}
