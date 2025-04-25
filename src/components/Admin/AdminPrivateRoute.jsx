// src/components/AdminPrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
