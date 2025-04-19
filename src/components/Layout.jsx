import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar2 from '../components/Sidebar2';
import UserNavbar from './UserNavbar';
import { FaBars } from "react-icons/fa";

function Layout({ userId }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      <UserNavbar />

      {/* Toggle Button for Mobile */}
      <div className="md:hidden p-3">
        <button onClick={toggleSidebar} className="text-2xl text-gray-700">
          <FaBars />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar: hidden on mobile, shown on md+ screens */}
        <div
          className={`
            fixed z-40 md:relative md:translate-x-0 transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            w-64 bg-white h-screen shadow-md
          `}
        >
          <Sidebar2 userId={userId} />
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
