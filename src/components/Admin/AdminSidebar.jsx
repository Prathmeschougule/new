import React from 'react'
import '../Admin/admin.css'
import { Link } from 'react-router'

function AdminSidebar() {
  return (
    <div className='sidebar-admin'>
        <div>
            <p className='user-name text-2xl'>User Name</p>
        </div>
     <div className='text-center mt-4 '>
            <div className='cursor-pointer'>
              <Link to={"maincategory"}>  <p>username</p> </Link>
            </div>         
    </div>
</div>
  )
}

export default AdminSidebar
