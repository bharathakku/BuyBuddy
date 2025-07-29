import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import PaymentScreen from './pages/PaymentScreen';
import OrderDetailsScreen from './pages/OrderDetailsScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import EditProduct from './pages/admin/EditProduct';
import CreateProduct from './pages/admin/CreateProduct';
import OrderList from './pages/OrderList';
import Success from './pages/Success';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import UserLayout from './components/layouts/UserLayout';
import AdminLayout from './components/layouts/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />
      <Routes>

        
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/product/:id" element={<UserLayout><ProductDetails /></UserLayout>} />
        <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
        <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
        <Route path="/register" element={<UserLayout><Register /></UserLayout>} />
        <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />
        
        <Route path="/payment/:id" element={<UserLayout><PaymentScreen /></UserLayout>} />
        <Route path="/order/:id" element={<UserLayout><OrderDetailsScreen /></UserLayout>} />
        <Route path="/shipping" element={<UserLayout><ShippingScreen /></UserLayout>} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <UserLayout><OrderList /></UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserLayout><ProfileScreen /></UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout><AdminProducts /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout><AdminOrders /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout><AdminUsers /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout><CreateProduct /></AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout><EditProduct /></AdminLayout>
            </ProtectedRoute>
          }
        />
<Route path="/success" element={<Success />} />

        <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
