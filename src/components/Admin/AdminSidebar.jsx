import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import '../Admin/admin.css';

function AdminSidebar() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const location = useLocation();

  const fetchUsers = () => {
    fetch('http://localhost/ProjectFile/backend/getUser.php')
      .then(response => response.json())
      .then(data => {
        console.log(data);        
        if (Array.isArray(data)) {
          const filteredUsers = data.filter(user => user.role === 'user');
          setUsers(filteredUsers);
        } else {
          console.error("Error fetching users:", data);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const match = location.pathname.match(/maincategory\/(\d+)/);
    if (match) {
      setActiveUserId(Number(match[1]));
    }
  }, [location]);

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will also delete the user's categories, subcategories, and documents.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost/ProjectFile/backend/deleteUser.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ userId })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            Swal.fire("Deleted!", "User and related data has been deleted.", "success");
            fetchUsers(); // Refresh users list
          } else {
            Swal.fire("Error!", data.message || "Failed to delete user.", "error");
          }
        })
        .catch(error => {
          console.error(error);
          Swal.fire("Error!", "Something went wrong.", "error");
        });
      }
    });
  };

  return (
    <div className='sibarcss'>
      <div>
        <p className='user-name'> User List </p>
      </div>

      <div className='space-y-2'>
        {users.map(user => (
          <div key={user.id} className="row align-items-center mb-2">
            <div className="col-lg-8">
              <Link
                to={`maincategory/${user.id}`}
                onClick={() => setActiveUserId(user.id)}
                className={`user-link ${activeUserId === user.id ? 'active' : ''}`}
              >
                {user.username}
              </Link>
            </div>

            <div className="col-lg-3 text-end">
              <button
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
                title="Delete user"
              >
               <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;
