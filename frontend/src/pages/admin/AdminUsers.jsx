import React, { useEffect, useState } from 'react';
import API from '../../services/apiService';
import { toast } from 'react-toastify';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/users'); // Auth header should be auto-attached by API
      setUsers(data);
    } catch (error) {
      const message =
        error.response?.status === 401 || error.response?.status === 403
          ? 'Unauthorized. Admin access required.'
          : 'Failed to load users';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/admin/users/${id}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        const message =
          error.response?.status === 401 || error.response?.status === 403
            ? 'Unauthorized. Admin access required.'
            : 'Failed to delete user';
        toast.error(message);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm p-4">
        <h3 className="fw-bold mb-4">Manage Users</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-dark" role="status" />
            <p className="mt-2">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <p className="text-muted">No users found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.isAdmin ? 'bg-success' : 'bg-secondary'}`}>
                        {user.isAdmin ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteUser(user._id)}
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

export default AdminUsers;
