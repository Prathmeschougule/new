import React, { useState } from 'react';
import axios from 'axios';

function RegistrationNewUser() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost/ProjectFile/backend/register.php", formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className='dash-bord'>
      <h4 className='registraion text-center'>Registration Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>User Name</label>
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="User Name" required />
          </div>
          <div className="form-group col-md-6">
            <label>Phone Number</label>
            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
          </div>
        </div>  
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="form-group col-md-6">
            <label>Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegistrationNewUser;
