import React from 'react';
import '../App.css'
import { Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <div >
          <p className='m-0 pl-4'>File Mangment</p>
      </div>
      <div>
      <Link to={"/login"}> <button className='custom-Login-button'>Log Out</button> </Link>
      </div>     
    </div>
  );
}

export default Navbar;