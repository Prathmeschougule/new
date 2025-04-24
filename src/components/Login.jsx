// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css' 

function Login({ setUserId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost/ProjectFile/backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);
    
                setUserId(data.userId);
    
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                alert(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Server error occurred.');
        }
    };
    



    return (
        <>
         <nav>
        <div className='login-nav-bar'>
          <p className='mt-2'>File Management System</p>
        </div>
      </nav>
      
          <div className="  min-h-screen flex items-center justify-center">
            <form className= " loginpage bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <label className="form-label block mb-2" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control border rounded w-full py-2 px-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-6">
                <label className="form-label block mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control border rounded w-full py-2 px-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full py-2">Sign in</button>
            </form>
          </div>
        </>
      );
      
}

export default Login;
