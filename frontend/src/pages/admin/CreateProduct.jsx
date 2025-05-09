import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    countInStock: '',
    brand: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userInfo || !userInfo.token) {
      toast.error('Not authorized. Please login again.');
      navigate('/login');
      return;
    }
  
    if (!form.name || !form.price || !form.description || !form.countInStock || !form.brand || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }
  
    if (!imageFile) {
      toast.error('Please upload a product image');
      return;
    }
  
    if (isNaN(form.price) || isNaN(form.countInStock)) {
      toast.error('Price and Stock should be valid numbers');
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('description', form.description);
      formData.append('countInStock', form.countInStock);
      formData.append('brand', form.brand);
      formData.append('category', form.category);
      formData.append('image', imageFile); // VERY IMPORTANT: this must match upload.single('image')
  
      await axios.post(`${API_BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
  
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="container mt-5 mb-5">
      <div className="p-4 border rounded shadow-sm bg-light">
        <h2 className="mb-4 text-center fw-bold">Create New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                name="countInStock"
                value={form.countInStock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Brand</label>
              <input
                className="form-control"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
