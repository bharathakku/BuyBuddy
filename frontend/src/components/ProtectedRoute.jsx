import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly }) => {
  let userInfo = null;

  try {
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
  } catch (err) {
    userInfo = null;
  }

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userInfo.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
