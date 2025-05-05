import { create } from 'zustand';;
import axiosInstance from '../utility/axios';
import { toast } from 'react-hot-toast';

const useProductStore = create((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/products/all-product');
      set({ products: response.data, loading: false });
    } catch (err) {
      console.error('fetchProducts error:', err);
      set({ loading: false, error: err });
      toast.error('Failed to load products');
    }
  },

  // Fetch single product by ID
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/products/product/${id}`);
      set({ currentProduct: response.data, loading: false });
    } catch (err) {
      console.error('fetchProductById error:', err);
      set({ loading: false, error: err });
      toast.error('Failed to load product');
    }
  },

  // Create a new product
  createProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/products/create-product', data);
      set(state => ({
        products: [...state.products, response.data],
        loading: false
      }));
      toast.success('Product created successfully');
    } catch (err) {
      console.error('createProduct error:', err);
      set({ loading: false, error: err });
      toast.error(err.response?.data?.msg || 'Failed to create product');
    }
  },

  // Update an existing product
  editProduct: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/products/edit-product/${id}`, updates);
      console.log('editProduct response:', response.data);
      set(state => ({
        products: state.products.map(p => p._id === id ? response.data : p),
        loading: false
      }));
      toast.success('Product updated successfully');
    } catch (err) {
      console.error('editProduct error:', err);
      set({ loading: false, error: err });
      toast.error(err.response?.data?.msg || 'Failed to update product');
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/products/delete-product/${id}`);
      set((state) => ({
        products: state.products.filter(product => product._id !== id)
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Delete error:', error.response?.data);
      toast.error(error.response?.data?.message || 'Deletion failed');
    }
  },
}));

export default useProductStore;
