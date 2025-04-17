// components/Admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
    return (
        <div >
            <AdminNavbar/>
            <AdminSidebar/>
            <div >
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
