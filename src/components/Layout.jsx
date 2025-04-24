import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar2 from '../components/Sidebar2';
import UserNavbar from './UserNavbar';
import { FaBars } from "react-icons/fa";

function Layout({ userId }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <UserNavbar />
        <div className="md:hidden p-3">
          <button onClick={toggleSidebar} className="text-2xl text-gray-700">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Main Layout under Navbar */}
      <div className="flex flex-1 pt-14 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-md transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:relative md:translate-x-0 md:block
          `}
        >
          <Sidebar2 userId={userId} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
