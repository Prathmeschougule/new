// components/Admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { FaBars } from "react-icons/fa";

function AdminLayout() {


    return (


        <div >
            <AdminNavbar />
            <div className='flex'>
                <AdminSidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>   
        </div>


    );
}

export default AdminLayout;
