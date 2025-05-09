import React from 'react';
import AdminNavbar from '../AdminNavbar';

const AdminLayout = ({ children }) => (
  <>
    <AdminNavbar />
    <div className="container mt-5 pt-4">
      {children}
    </div>
  </>
);

export default AdminLayout;
