import React, { useState } from 'react';
import axios from 'axios';

function RegistrationNewUser() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.phone || !formData.email || !formData.password) {
      alert("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email format.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/ProjectFile/backend/register.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res);

      // Handle response
      if (res.data && typeof res.data === "object") {
        if (res.data.success !== undefined && res.data.message) {
          alert(res.data.message);

          // Clear the form on successful registration
          setFormData({
            username: '',
            phone: '',
            email: '',
            password: '',
            role: 'user',
          });

          // Reload the page after successful registration
          window.location.reload();
        } else {
          alert("Unexpected response format from server.");
        }
      } else {
        alert("Invalid response from server.");
      }
    } catch (err) {
      console.error("API error:", err.response || err.message);
      const errorMessage = err.response?.data?.message || err.message || "Registration failed.";
      alert("Registration failed: " + errorMessage);
    }
  };

  return (
    <div style={{ minHeight: "80vh" }} className=''>
      <div>
        <h4 className=' text-start p-0 mt-4'>➕ Add New User</h4>
        <p className=' p-0 m-0'>Fill in the details below to register a new user.</p>
      </div>

      {/* Form section  */}
      <div className="d-flex mt-15 justify-content-center align-items-center bg-light">
        <div className="p-4 bg-white shadow rounded" style={{ width: "100%", maxWidth: "600px" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary px-5">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default RegistrationNewUser;
