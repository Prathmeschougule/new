import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Admin/admin.css';

function AdminSidebar() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost/ProjectFile/backend/getUser.php')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Error fetching users:", data);
        }
      })
      .catch(error => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const match = location.pathname.match(/maincategory\/(\d+)/);
    if (match) {
      setActiveUserId(Number(match[1])); // Convert to number here
    }
  }, [location]);

  return (
    <div className='sibarcss'>
      <div>
        <p className='user-name'>All Users</p>
      </div>
      <div className='space-y-2'>
        {users.map(user => (
          <Link
            key={user.id}
            to={`maincategory/${user.id}`}
            onClick={() => setActiveUserId(user.id)}
            className={`user-link ${activeUserId === user.id ? 'active' : ''}`}
          >
            {user.username}
          </Link>
        ))}
      </div>
    </div>
  );
}


export default AdminSidebar;
