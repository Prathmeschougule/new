import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
    return (
        <div>
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <AdminNavbar />
            </div>

            <div className="flex">
                {/* Fixed Sidebar below the Navbar */}
                <div className="fixed top-10 left-0 h-full w-64 bg-white shadow z-40">
                    <AdminSidebar />
                </div>

                {/* Main Content area */}
                <main className="ml-64 mt-10 p-2 w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
