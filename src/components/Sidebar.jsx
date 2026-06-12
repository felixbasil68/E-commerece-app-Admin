import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaPlus, FaList, FaClipboardList } from 'react-icons/fa'

function Sidebar() {
  return (
    <>
      <div className='w-[18%] min-h-screen border-r border-gray-200 bg-linear-to-b from-gray-50 to-white'>
        <div className='p-6'>
          {/* Logo/Brand Area */}
          <div className='mb-10 px-2'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>M</span>
              </div>
              <div className='hidden md:block'>
                <h2 className='text-xl font-bold text-gray-900'>Admin Panel</h2>
                <p className='text-xs text-gray-500'>Management Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col gap-2'>
            <NavLink 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${
                  isActive 
                    ? 'bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              } 
              to="/add"
            >
              <div className={`p-2 rounded-lg ${window.location.pathname === '/add' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FaPlus className='w-5 h-5 text-gray-700' />
              </div>
              <span className='hidden md:block font-medium'>Add Items</span>
              <div className='ml-auto hidden md:block'>
                {window.location.pathname === '/add' && (
                  <div className='w-2 h-2 rounded-full'></div>
                )}
              </div>
            </NavLink>

            <NavLink 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${
                  isActive 
                    ? 'bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              } 
              to="/list"
            >
              <div className={`p-2 rounded-lg ${window.location.pathname === '/list' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FaList className='w-5 h-5 text-gray-700' />
              </div>
              <span className='hidden md:block font-medium'>List Items</span>
              <div className='ml-auto hidden md:block'>
                {window.location.pathname === '/list' && (
                  <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                )}
              </div>
            </NavLink>

            <NavLink 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${
                  isActive 
                    ? 'bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              } 
              to="/orders"
            >
              <div className={`p-2 rounded-lg ${window.location.pathname === '/orders' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <FaClipboardList className='w-5 h-5 text-gray-700' />
              </div>
              <span className='hidden md:block font-medium'>Orders</span>
              <div className='ml-auto hidden md:block'>
                {window.location.pathname === '/orders' && (
                  <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                )}
              </div>
            </NavLink>
          </div>

          {/* Bottom Info/User Area */}
          <div className='mt-auto pt-10'>
            <div className='px-4 py-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold'>A</span>
                </div>
                <div className='hidden md:block'>
                  <p className='font-medium text-gray-900'>Admin User</p>
                  <p className='text-xs text-gray-500'>Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar