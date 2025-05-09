import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer'; 

const UserLayout = ({ children }) => (
  <>
    <Navbar />
  <div style={{ height: '70px' }}></div> {/* Spacer to push content below navbar */}
  <main className="min-vh-100 container py-4">
    {children}
  </main>
  <Footer />
  </>
);

export default UserLayout;
