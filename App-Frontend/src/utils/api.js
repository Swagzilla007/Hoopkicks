import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout')
};

export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`)
};

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllOrders: () => api.get('/admin/orders'),
  updateOrder: (id, status) => api.put(`/admin/orders/${id}`, { status }),
  createProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  uploadImage: (formData) => api.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteOrder: (id) => api.delete(`/admin/orders/${id}`),
  createAdmin: (adminData) => api.post('/admin/register', adminData),
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
};
