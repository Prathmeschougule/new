// src/components/UserPrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
  const role = localStorage.getItem('role');

  if (role !== 'user') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserPrivateRoute;
