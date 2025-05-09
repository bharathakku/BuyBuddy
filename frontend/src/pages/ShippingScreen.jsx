import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShippingScreen() {
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // List of countries (you can expand this list as needed)
  const countries = ['USA', 'Canada', 'India', 'Australia', 'UK'];

  // Regex for postal code validation based on USA format (you can change this according to your country)
  const postalCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !country) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!postalCodePattern.test(postalCode)) {
      toast.error('Please enter a valid postal code.');
      return;
    }

    const shippingAddress = { address, city, postalCode, country };
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));

    toast.success('Shipping address saved!');
    navigate('/checkout');
  };

  return (
    <div className="container mt-5">
      <h2>Shipping Address</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Postal Code</label>
          <input
            type="text"
            className="form-control"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Country</label>
          <select
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((countryName, index) => (
              <option key={index} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Continue
        </button>
      </form>
    </div>
  );
}

export default ShippingScreen;
