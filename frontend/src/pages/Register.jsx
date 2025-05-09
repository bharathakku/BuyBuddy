import React, { useState } from 'react';
import API from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      toast.success('Account created!');
      navigate('/'); // Navigate to homepage after registration
    } catch (error) {
      console.error(error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Create Your BuyBuddy Account</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group mb-3">
            <label>Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Email address</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="example@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
