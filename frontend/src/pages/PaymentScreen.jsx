import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/apiService';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/profile');
        setUser(data.user);
        setForm({
          name: data.user.name || '',
          email: data.user.email || '',
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        toast.error('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setUpdating(true);
      const { data } = await API.put('/profile', {
        name: form.name,
        email: form.email,
        password: form.password || undefined,
      });
      toast.success('Profile updated');
      setUser(data.user);
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* Profile Sidebar */}
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <img
              src={user?.avatar || 'https://via.placeholder.com/100'}
              alt="User Avatar"
              className="rounded-circle mx-auto mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h5 className="mb-1">{user?.name}</h5>
            <p className="text-muted mb-1">{user?.email}</p>
            <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <h4 className="mb-4">My Profile</h4>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input type="password" name="confirmPassword" className="form-control" value={form.confirmPassword} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={updating}>
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
