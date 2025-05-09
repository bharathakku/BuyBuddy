import React, { useEffect, useState } from 'react';
import API from '../services/apiService';
import { Link } from 'react-router-dom';

import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import { getFullImageUrl } from '../utils/imageURL';
const fallbackImage = 'https://via.placeholder.com/500x500?text=No+Image';

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
        <h2 className="text-center mb-4">Our Products</h2>

        <div className="row">
          {filtered.map((product) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={product.image ? getFullImageUrl(product.image) : fallbackImage} // Make sure to use the getFullImageUrl function
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '280px', objectFit: 'cover' }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text fw-semibold">${product.price}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-dark mt-auto"
                    style={{ borderRadius: '6px' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
