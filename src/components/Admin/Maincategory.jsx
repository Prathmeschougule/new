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
    <div className='ml-50 mt-12 p-4'>
      <p className='text-xl font-bold '>Categories Folders</p>

      {categories.length > 0 ? (

        <div className='row gap-3 '>
          {categories.map((category) => (

            <div key={category.id} className="card col-lg-12  ">
              {/* <td className='border px-4 py-2'>{category.id}</td> */}
              <Link to={`adminsub/${category.id}`} className='xyxe' >
                <div className="card-body flex justify-start gap-2">
                  <FaFolderOpen className="text-4xl text-neutral-600" />
                  <p className="categoryName card-title mt-2 ">{category.name}</p>
                </div>
              </Link>

            </div>

          ))}
        </div>

      ) : (
        <p>No categories found for this user.</p>
      )}





    </div>
  );
}

export default Maincategory;
