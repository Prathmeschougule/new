import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Adminshbord from './Adminshbord';
import Maincategory from './Maincategory';
import Subcategory from '../Subcategory';
import AdminSubcategories from './AdminSubcategory';
import RegistrationNewUser from './RegistrationNewUser';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router';
import '../Admin/admin.css'
// import '../Admin/admin.css'

function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };
  
  

  return (
    <>
     <nav className="adminnav  bg-white ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <a  className=" text-decoration-none  flex  items-center space-x-3 rtl:space-x-reverse">
          <Link to={"/admin"}>  <p className='text-decoration-none mt-2 text-2xl  cursor-pointer text-neutral-800 font-bold'>Admin Panel</p> </Link>   
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded={dropdownOpen}
          >
            <span className="sr-only">Open user menu</span>
            <FaUserCircle  className='text-3xl text-blue-600'/>
          </button>

          {dropdownOpen && (
            <div className="absolute top-16 right-2 z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              
              <ul className="py-0">      
                <li>
                <Link to={"/login"}>  
                    
                    <a onClick={handleLogout}
                     href="#" className="block px-0 py-0 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">Sign out</a></Link>

                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>

    </>
  );
}

export default AdminNavbar;

