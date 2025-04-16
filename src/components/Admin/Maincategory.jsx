import React from 'react'
import { Link } from 'react-router'
import { Outlet } from 'react-router-dom';
// import '../Admin/admin.css'
function Maincategory() {
  return (
    <>
    <div className='dash-bord'>

        <div>
            <p>Main Category</p>
        </div>
        <div className='row gap-4'>
            <div className="card col-lg-4 ">         
                <div className="card-body flex justify-between items-center">
                    <h5 className="card-title">Forest</h5>               
                    <Link to={"adminsub"}> <a  className="btn btn-primary">Go</a></Link>
                </div>
            </div>        
        </div>

    </div>
     
     </>
  )

}

export default Maincategory
