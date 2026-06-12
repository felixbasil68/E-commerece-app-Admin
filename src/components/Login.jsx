import React, { useState } from 'react'
import { adminLoginAPI } from '../services/allAPIs';
import {  toast } from 'react-toastify';

function Login({setToken}) {
  const [showPassword,setShowPassword]=useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  console.log(email,password);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const reqBody = {
        email,
        password
    }

    if (!email || !password) {
        alert("Enter the fields completely")
    } else {
        try {

            const result = await adminLoginAPI(reqBody)
            console.log(result)

            if (result.data.success) {
              setToken(result.data.token)
               alert("Welocme to Admin pannel")
            }
            else{
             alert(result.data.message)
              
              
            }

        } catch (error) {
            console.log(error)
        }
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">Access your dashboard</p>
        </div>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input onChange={(e)=>setEmail(e.target.value) } value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input onChange={(e)=>setPassword(e.target.value) } value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 px-2 py-1 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit" onClick={onSubmitHandler}
            className="w-full py-3.5 px-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login