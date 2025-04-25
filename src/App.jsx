// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import DocumentUpload from './components/DocumentUpload';
import AdminLayout from './components/Admin/AdminLayout';
import Adminshbord from './components/Admin/Adminshbord';
import RegistrationNewUser from './components/Admin/RegistrationNewUser';
import Maincategory from './components/Admin/Maincategory';
import AdminSubcategory from './components/Admin/AdminSubcategory';
import AdminDocuments from './components/Admin/AdminDocuments';
import AdminPrivateRoute from './components/Admin/AdminPrivateRoute';
import UpdateUser from './components/Admin/UpdateUser';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Routes */}
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route path="/login" element={<Login setUserId={setUserId} />} />

        {/* User Routes */}
        <Route path="/home" element={<Layout userId={userId} />}>
          <Route index element={<Category userId={userId} />} />
          <Route path="category/:categoryId" element={<Subcategory userId={userId} />} />
          <Route path="subcategory/:subcategoryId" element={<DocumentUpload userId={userId} />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Adminshbord />} />
            <Route path="maincategory/:userId" element={<Maincategory />} />
            <Route path="maincategory/:userId/adminsub/:categoryId" element={<AdminSubcategory />} />
            <Route path="maincategory/:userId/adminsub/:categoryId/documents/:subcategoryId" element={<AdminDocuments />} />
            <Route path="registration" element={<RegistrationNewUser />} />
            <Route path='updateUser' element={<UpdateUser/>}/>
          </Route>
        </Route>

        {/* ✅ Catch-all Route — Redirect unknown URLs to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
