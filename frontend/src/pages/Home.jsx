import React, { useEffect, useState } from 'react';
import API from '../services/apiService';
import { Link } from 'react-router-dom';

import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setFiltered(products);
      return;
    }
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="container mt-5 pt-4">
        <Carousel />

        <div className="text-center my-5">
          <h2 className="fw-bold display-6 text-dark">
            Explore Our <span className="text-primary">Premium</span> Collection
          </h2>
          <p className="text-muted fs-5">
            Performance. Elegance. Precision — handpicked just for you.
          </p>
        </div>

        <div className="row">
          {filtered.map((product) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted fs-4 my-5">
            No products found.
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
