import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar2 from './components/Sidebar2';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import DocumentUpload from './components/DocumentUpload';
import Login from './components/Login';
import './App.css'; // Global styles
import Layout from './components/Layout';
import AdminNavbar from './components/Admin/AdminNavbar';
import RegistrationNewUser from './components/Admin/RegistrationNewUser';
import Maincategory from './components/Admin/Maincategory';
import AdminLayout from './components/Admin/AdminLayout';
import Adminshbord from './components/Admin/Adminshbord';
import AdminSubcategory from './components/Admin/AdminSubcategory';
import AdminDocuments from './components/Admin/AdminDocuments';

function App() {
  const [userId, setUserId] = useState(null);
  // Simulated logged-in user ID

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

    
  return (
    <Router>
      <div className="app">
       
        {/* <Navbar /> */}
        <div className="main-content">
          {/* <Sidebar2 userId={userId} /> */}
          <div className="content">

            <Routes>
              <Route path="/login" element={<Login setUserId={setUserId} />} />
              <Route path="/home" element={<Layout userId={userId} />}>
                <Route index element={<Category userId={userId} />} />
                <Route path="category/:categoryId" element={<Subcategory userId={userId} />} />
                <Route path="subcategory/:subcategoryId" element={<DocumentUpload userId={userId} />} />
              </Route>


              <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<Adminshbord/>} />
                <Route path='maincategory/:userId' element={<Maincategory/>}/>
                <Route path="maincategory/:userId/adminsub/:categoryId" element={<AdminSubcategory />} />
                <Route path="maincategory/:userId/adminsub/:categoryId/documents/:subcategoryId" element={<AdminDocuments/>} />
                <Route path="registration" element={<RegistrationNewUser/>}/>
                {/* Add more admin pages here */}
              </Route>
            </Routes> 
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
