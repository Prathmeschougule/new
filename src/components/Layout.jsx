import React from 'react'
import { Outlet } from 'react-router'
import Sidebar2 from '../components/Sidebar2'
import '../Layout.css';
import UserNavbar from './UserNavbar';

function Layout({ userId }) {
  return (
    <div  className="layout-container" >
       <UserNavbar/>
       <Sidebar2 userId={userId}/>
        <div className="content-area">
        <Outlet/>
</div>
         
    </div>
  )
}

export default Layout