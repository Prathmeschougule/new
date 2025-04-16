import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Adminshbord from './Adminshbord';
import Maincategory from './Maincategory';
import Subcategory from '../Subcategory';
import AdminSubcategories from './AdminSubcategory';
import RegistrationNewUser from './RegistrationNewUser';

function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <nav className="bg-yellow-50 border z-50  border-gray-600 ">

      

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <a  className=" text-decoration-none flex items-center space-x-3 rtl:space-x-reverse">
            <h2 className='text-decoration-none'>Admin Dashbord</h2>    
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded={dropdownOpen}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="user" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-16 right-2 z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              
              <ul className="py-0">      
                <li>
                  <a href="#" className="block px-0 py-0 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">Sign out</a>
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

