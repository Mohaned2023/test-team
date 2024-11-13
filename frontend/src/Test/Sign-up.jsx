import React, { useState } from 'react';

function SignUp() {
  // Store Values in data
  const [data, setData] = useState({
    fullName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  

  // Change the Values
  const handleChange = (e) => 
    {
        const { id, value } = e.target;
        setData((prevData) => ({
        ...prevData,[id]: value,}));
    };

   // Submit the Values
  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Backend Code


  return (
    <div className="h-screen flex justify-center items-center">
      <form className="container mx-auto w-1/2 p-12 border border-neutral-400" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-6">
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
          <input type="text" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your name" value={data.fullName}onChange={handleChange} required/>
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label htmlFor="gender" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
          <select id="gender" className="ml-2 border border-black" value={data.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5" placeholder="Enter email address" value={data.email} onChange={handleChange} required/>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5" placeholder="Enter password" value={data.password} onChange={handleChange} required/>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
          <input type="password" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5" placeholder="Confirm password" value={data.confirmPassword} onChange={handleChange} required/>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue dark:focus:ring-blue-800"> Submit </button>
      </form>
    </div>
  );
}}

export default SignUp;
