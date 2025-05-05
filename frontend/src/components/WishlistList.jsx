import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWishListStore from '../store/wishListStroe';
import { toast } from 'react-hot-toast';
import Fotter from './Fotter';
import Navbar from './Navbar';
import useAuth from "../store/useAuth";

export default function WishlistList() {
  const { fetchWishlists, wishlists, deleteWishlist, loading, error } = useWishListStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const handleView = (id) => navigate(`/wishlists/${id}`);
  const handleEdit = (id) => navigate(`/edit-wishlist/${id}`);
  

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this wishlist?')) return;
    try {
      await deleteWishlist(id);
      toast.success('Wishlist deleted');
    } catch {
      toast.error('Failed to delete wishlist');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
        <p className="mt-2">Loading wishlists...</p>
      </div>
    );
  }

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
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        <i className="fas fa-heart text-danger me-2"></i> My Wishlists
      </h2>

      {wishlists.length === 0 ? (
        <p className="text-center text-muted">No wishlists yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {wishlists.map((wishlist) => (
            <div key={wishlist._id} className="col">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">
                    <i className="fas fa-gift me-2"></i> {wishlist.name}
                  </h5>

                  <p className="card-text text-muted">
                    <i className="fas fa-users me-1"></i>{' '}
                    {wishlist.collaborators?.length || 0} Collaborators
                  </p>

                  <p className="card-text text-muted">
                    <i className="fas fa-box-open me-1"></i>{' '}
                    {wishlist.products?.length || 0} Products
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleView(wishlist._id)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEdit(wishlist._id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(wishlist._id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
                <div className="card-footer bg-white text-muted small d-flex justify-content-between">
                  <span>
                    <i className="fas fa-user"></i> {wishlist.owner?.username || 'You'}
                  </span>
                  <span>
                    <i className="fas fa-calendar-alt"></i>{' '}
                    {new Date(wishlist.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Fotter />
    </>
  );
}
