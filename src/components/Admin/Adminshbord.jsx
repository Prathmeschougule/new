import React from 'react'
import { Link } from 'react-router'

function Adminshbord() {
  return (
    <div className='dash-bord toppage '>
        <div className="adduser justify-items-end">
       <Link to={"registration"}> <button className='btn btn-primary'>Add New User </button></Link>
      </div>
        <div className='boxes flex gap-5 mt-10 justify-center'>
            <div className='box'>
                <p>Total User</p>
                <p>5</p>
            </div>
            <div className='box'>
                <p>Total Document</p>
                <p>5</p>
            </div>
            <div className='box'>
                <p>Total Category</p>
                <p>5</p>
            </div>
        </div>
    </div>
  )
}

export default Adminshbord
