import React, { useEffect, useState } from 'react';
import API from '../../services/apiService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Manage Products</h3>
          <Link to="/admin/products/create" className="btn btn-dark">
            + Add Product
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-dark" role="status" />
            <p className="mt-2">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-muted">No products found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
