import { create } from 'zustand';
import axiosInstance from '../utility/axios';
import { toast } from 'react-hot-toast';

const useWishListStore = create((set, get) => ({
  wishlists: [],
  wishlist: null,
  loading: false,
  error: null,

  // Fetch all wishlists for current user
  fetchWishlists: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get('/wishlist/all-wishlists');
      set({ wishlists: data });
    } catch (err) {
      set({ error: err.response?.data?.msg || 'Failed to fetch wishlists' });
      toast.error(get().error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch one wishlist by ID
  fetchWishlistById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get(`/wishlist/wishlist/${id}`);
      set({ wishlist: data });
    } catch (err) {
      set({ error: err.response?.data?.msg || 'Failed to fetch wishlist' });
      toast.error(get().error);
    } finally {
      set({ loading: false });
    }
  },

  // Create a new wishlist
  createWishlist: async (wishlistData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post('/wishlist/create-wishlist', wishlistData);
      set((state) => ({
        wishlists: [...state.wishlists, res.data],
        loading: false,
      }));
    } catch (err) {
      console.error('createWishlist error:', err);
      toast.error(err?.response?.data?.message || 'Error creating wishlist');
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Update wishlist (name or collaborators)
  updateWishlist: async (id, payload) => {
    try {
      // Normalize payload data
      const processedPayload = {
        ...payload,
        collaborators: payload.collaborators.map(email => email.toLowerCase().trim())
      };
  
      const { data } = await axiosInstance.put(
        `/wishlist/edit-wishlist/${id}`,
        processedPayload
      );
  
      set((state) => ({
        wishlists: state.wishlists.map(wl => 
          wl._id === id ? { ...wl, ...data } : wl
        ),
        wishlist: data
      }));
  
      toast.success('Wishlist updated successfully');
      return data;
    } catch (err) {
      const errorData = err.response?.data || {};
      const errorMessage = errorData.msg || 'Failed to update wishlist';
      const invalidEmails = errorData.invalidEmails || [];
  
      const fullMessage = invalidEmails.length > 0
        ? `${errorMessage}: ${invalidEmails.join(', ')}`
        : errorMessage;
  
      toast.error(fullMessage);
      throw new Error(fullMessage);
    }
  },

  // Delete a wishlist
  deleteWishlist: async (id) => {
    try {
      await axiosInstance.delete(`/wishlist/delete-wishlist/${id}`);
      set((state) => ({
        wishlists: state.wishlists.filter((wl) => wl._id !== id),
        wishlist: get().wishlist?._id === id ? null : get().wishlist,
      }));
      toast.success('Wishlist deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to delete wishlist');
    }
  },

  // Add product to wishlist
  addProductToWishlist: async (wishlistId, productId) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/wishlist/${wishlistId}/products`,
        { productId }
      );
      set({ wishlist: data });
      toast.success('Product added to wishlist');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to add product');
    }
  },

  // Remove product from wishlist
  removeProductFromWishlist: async (wishlistId, productId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/wishlist/${wishlistId}/products/${productId}`
      );
      set({ wishlist: data });
      toast.success('Product removed from wishlist');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to remove product');
    }
  },
}));

export default useWishListStore;
