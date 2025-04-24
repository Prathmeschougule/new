import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFolderOpen } from "react-icons/fa";
import '../Admin/admin.css';

function Maincategory({ users }) {
  const { userId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/ProjectFile/backend/getCategoriesByUserId.php?user_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Error fetching categories:", data);
        }
      })
      .catch(error => console.error("Error:", error));
  }, [userId]);

  return (
    <div className='  px-4 py-6 md:px-8 lg:px-20'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xl font-bold mb-6 text-left md:text-left'>Categories Folders</p>
        </div>
        <div className=''>
          <button
            onClick={() => window.open(`http://localhost/ProjectFile/backend/downloadAllDocuments.php?user_id=${userId}`, '_blank')}
            className='export mb-4  text-white px-4 py-2 rounded'
          >
            Download All as ZIP
          </button>
        </div>
      </div>


      {categories.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories.map((category) => (
            <Link
              to={`adminsub/${category.id}`}
              key={category.id}
              className='bg-white shadow-md rounded-xl p-4 hover:bg-gray-100 transition duration-300 ease-in-out categoryName'
            >
              <div className='flex items-center gap-3'>
                <FaFolderOpen className=' text-3xl text-yellow-600' />
                <p className=' mt-3 text-md font-medium truncate'>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 mt-8'>No categories found for this user.</p>
      )}
    </div>
  );
}

export default Maincategory;
