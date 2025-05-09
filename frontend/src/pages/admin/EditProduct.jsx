import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/apiService';
import { toast } from 'react-toastify';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    countInStock: '',
    brand: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct({
          name: data.name,
          price: data.price,
          countInStock: data.countInStock,
          brand: data.brand,
          category: data.category,
          description: data.description,
        });
      } catch (err) {
        toast.error('Failed to fetch product details');
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, product);
      toast.success('Product updated');
      navigate('/admin/products');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm p-4">
        <h3 className="fw-bold mb-4">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="countInStock"
              value={product.countInStock}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={product.description}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
