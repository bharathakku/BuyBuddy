import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Spinner } from 'react-bootstrap';

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/category/${category}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-capitalize">{category}</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
