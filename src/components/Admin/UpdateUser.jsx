import React from 'react';
import  { useEffect, useState } from 'react';

function UpdateUser() {

  const [users,setUsers]=useState([]);
  const [selectUser,setSelectUser]= useState({
        id:"",
        username:"",
        email:"",
        phoneNo:"",
        password:""
    })

  useEffect(()=>{
    // fetch All user from the api
    fetch('http://localhost/ProjectFile/backend/getUser.php')
    .then((res)=>res.json())
    .then((data)=>{
      if(Array.isArray(data)){
          setUsers(data); //set the user data from the api
      }else{
        console.error(  "Failed To Fetch The User Data ");
      }
    })
    .catch((err)=>console.error("Error fetching user:",err));
  },[]);

  const handleEditClick =(userId)=>{
    const userToEdit =users.find(user=>user.id===userId);
    if (userToEdit){
      setSelectUser({
          id:userToEdit.id,
          username:userToEdit.username,
          phoneNo:userToEdit.phoneNo,
          password:userToEdit.password,   
          email:userToEdit.email     
      }); 
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost/ProjectFile/backend/updateUser.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectUser)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("User updated successfully!");
        window.location.reload(); // Reload to get updated user list
      } else {
        alert("Failed to update user: " + data.message);
      }
    })
    .catch(error => {
      console.error('Error updating user:', error);
      alert("Error updating user");
    });
}

  return (
    <div className='p-2'>
      <div>
        <p className='p-0 m-0 text-2xl font-semibold'>📝 Update User Information</p>
        <p>This page displays all users and allows admins to quickly edit and update user details like name, email, and role to keep information up to date.</p>
      </div>

      <div className='main-content d-flex mt-4' style={{ height: '450px' }}>
        {/* User Table List */}
        <div
          className='user-table flex-grow-1 me-4'
          style={{ overflowY: 'auto', maxHeight: '100%', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <table className="table">
            <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>             
                <th scope="col">User Name </th>
                <th scope="col">Email</th>
                <th scope="col">Phone No</th>
                <th scope='col'>Password</th>
                <th scope="col">Update </th>
                
              </tr>
            </thead>
            <tbody>
                 {users.length>0 ? (
                  users.map((user)=>(
                    <tr key={users.id}>
                      <th scope='row'>{user.username}</th>
                      <td>{user.email}</td>
                      <td>{user.phoneNo}</td>
                      <td>{user.password}</td>
                      <td>
                      <button
                        onClick={() => handleEditClick(user.id)}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </td>
                    </tr>
                  ))
                 ):
                 (
                    <tr>
                    <td colSpan="4">No users found</td>
                  </tr>
                 )
                 }
            </tbody>
          </table>
        </div>

        {/* Update User Form */}
        <div className='update-user-form' style={{ width: '350px' }}>
          <form onSubmit={handleUpdateSubmit}>
            <fieldset>
              <legend>Update User</legend>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">User Name </label>
                <input 
                type="text" 
                id="firstName" 
                className="form-control" 
                placeholder="Enter first name" 
                value={selectUser.username}
                onChange={(e) => setSelectUser({ ...selectUser, username: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Email Id</label>
                <input type="text" 
                id="lastName" 
                className="form-control" 
                placeholder="Enter last name" 
                value={selectUser.email}
                onChange={(e)=>setSelectUser({...selectUser,email:e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Password</label>
                <input type="" 
                id="" className="form-control" 
                placeholder="Enter email" 
                value={selectUser.password}
                onChange={(e)=>setSelectUser({...selectUser,password:e.target.value})}
                />
              </div>
              
              <button 
              type="submit" 
              className="btn btn-primary w-100"
              
              >Update User</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
