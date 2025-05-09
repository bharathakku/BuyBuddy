import React, { useState } from 'react';
import API from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();
  try {
    // Change this to the correct admin login route
    const { data } = await API.post('/admin/login', { email, password });

    console.log(data); // Check the response data

    localStorage.setItem('userInfo', JSON.stringify(data));
    setTimeout(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('LocalStorage role:', userInfo?.role);

      if (userInfo?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }, 500);

    toast.success('Logged in successfully!');
    
    // Handle redirection based on the role
    if (data.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }

  } catch (error) {
    toast.error('Invalid Credentials');
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login to BuyBuddy</h3>
        <form onSubmit={submitHandler}>
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
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
