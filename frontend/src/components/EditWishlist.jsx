import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWishListStore from '../store/wishListStroe';
import { toast } from 'react-hot-toast';
import Fotter from './Fotter';
import Navbar from './Navbar';

export default function EditWishlist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchWishlistById,
    updateWishlist,
    selectedWishlist,
    loading,
    error,
  } = useWishListStore();

  const [name, setName] = useState('');
  const [collaborators, setCollaborators] = useState('');

  useEffect(() => {
    fetchWishlistById(id);
  }, [id, fetchWishlistById]);

  useEffect(() => {
    if (selectedWishlist) {
      setName(selectedWishlist.name || '');
      setCollaborators((selectedWishlist.collaborators || []).join(', '));
    }
  }, [selectedWishlist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate name
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error('Wishlist name is required');
      return;
    }
  
    // Process collaborators
    const collaboratorEmails = collaborators
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);
  
    // Frontend validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = collaboratorEmails.filter(email => !emailRegex.test(email));
  
    if (invalidEmails.length > 0) {
      toast.error(`Invalid email format: ${invalidEmails.join(', ')}`);
      return;
    }
  
    try {
      await updateWishlist(id, { 
        name: trimmedName,
        collaborators: collaboratorEmails 
      });
      navigate('/all-wishlists');
    } catch (err) {
      toast.error(err.message || 'Failed to update wishlist');
    }
  };

 
  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-white">
          <h4 className="mb-0">
            <i className="fas fa-edit me-2"></i> Edit Wishlist
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Wishlist Name */}
            <div className="mb-3">
              <label className="form-label">Wishlist Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Summer Shopping"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Collaborators */}
            <div className="mb-3">
              <label className="form-label">
                Collaborators (comma-separated emails or usernames)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., friend1@example.com, saqib"
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
              />
              <div className="form-text">
                Leave empty if you don’t want collaborators.
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-warning text-white">
                <i className="fas fa-save me-2"></i>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
    <Fotter />
    </>
  );
}
