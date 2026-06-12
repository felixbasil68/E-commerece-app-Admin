import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa'

function Navbar({setToken}) {
  const navigate = useNavigate()
  
  const handleHomeClick = () => {
    navigate('/add')
  }
  const isLoggedIn = false 

  return (
    <>
      <nav className='flex items-center justify-between py-3 px-[4%] bg-linear-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700'>
        {/* Logo */}
        <div 
          onClick={handleHomeClick}
          className='flex items-center gap-3 cursor-pointer group'
        >
          <img 
            className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110" 
            src={assets.logo} 
            alt="Logo" 
          />
          <div className='hidden sm:block'>
            <h1 className='text-xl font-bold text-white'>
              Admin Panel
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-3'>
          <button
            onClick={handleHomeClick}
            className='hidden sm:flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-200'
          >
            <FaHome />
            <span>Dashboard</span>
          </button>

          {/* Logout Button */}
            <button 
              onClick={()=>setToken('')}
              className='flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25'
            >
              <FaSignOutAlt />
              <span className='text-sm'>Logout</span>
            </button>
       
            
        
        </div>
      </nav>
    </>
  )
}

export default Navbar