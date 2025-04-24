import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Adminshbord() {
  const [totalUsers, setTotalUsers] = useState(0);
  const[totalDocument ,setTotalDocument] = useState(0);
  const[totalCategory , setTotalCategory ] = useState(0);

  useEffect(() => {
    fetch('http://localhost/ProjectFile/backend/get_total_users.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalUsers(data.total_users);
        } else {
          console.error(data.message);
        }
      })
      .catch((err) => console.error("Error fetching total users:", err));
  }, []);

  useEffect(() => {
    fetch('http://localhost/ProjectFile/backend/get_total_document.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalDocument(data.total_document);
        } else {
          console.error(data.message);
        }
      })
      .catch((err) => console.error("Error fetching total users:", err));
  }, []);
  


  useEffect(() => {
    fetch('http://localhost/ProjectFile/backend/get_total_category.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalCategory(data.total_category);
        } else {
          console.error(data.message);
        }
      })
      .catch((err) => console.error("Error fetching total users:", err));
  }, []);


  return (
    <div className='p-4 md:p-8'>
      <div className="adduser text-right mb-6">
        <Link to="registration">
          <button className='btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow'>
            Add New User
          </button>
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0'>
        <div className='box border rounded-2xl  text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out bg-white'>
          <p className='font-semibold text-lg md:text-xl'>Total Users</p>
          <p className='text-blue-600 text-2xl md:text-3xl font-bold'>{totalUsers}</p>
        </div>

        <div className='box border rounded-2xl text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out bg-white'>
          <p className='font-semibold text-lg md:text-xl'>Total Document</p>
          <p className='text-green-600 text-2xl md:text-3xl font-bold'>{totalDocument}</p>
        </div>

        <div className='box border rounded-2xl  text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out bg-white'>
          <p className='font-semibold text-lg md:text-xl'>Total Categories</p>
          <p className='text-purple-600 text-2xl md:text-3xl font-bold'>{totalCategory}</p>
        </div>
      </div>
    </div>
  );
}

export default Adminshbord;
