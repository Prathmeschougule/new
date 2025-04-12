import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar2 from './components/Sidebar2';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import DocumentUpload from './components/DocumentUpload';
import './App.css'; // Assuming you have global styles

function App() {
  const [userId] = useState(2); // Simulated logged-in user ID

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Sidebar2 userId={userId} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Category userId={userId} />} />
              <Route path="/category/:categoryId" element={<Subcategory userId={userId} />} />
              <Route path="/subcategory/:subcategoryId" element={<DocumentUpload userId={userId} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;