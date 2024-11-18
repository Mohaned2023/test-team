import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  // Store Values in data
  const [data, setData] = useState({
    username: '',
    name: '',
    gender: true, 
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  console.log(data);
  

  // Change the Values
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "gender") {
      setData((prevData) => ({
        ...prevData,
        [id]: value === "true" ? true : false,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    
  };
}

  // Submit the Values

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

  

    try {
      const backend = "https://test-production-1e72.up.railway.app"; 
      const requestBody = {
        username: data.username,
        name: data.name,
        password: data.password,
        email: data.email,
        gender: data.gender,
      };
      const response = await fetch(`${backend}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 201) {
        // Success: User Created
        setSuccessMessage("User created successfully!");
        navigate('/');
        setError(null);
      } else if (response.status === 302) {
        // Error: Username or Email already exists
        setError("Username or Email is already in use!");
        setSuccessMessage(null);
      } else if (response.status === 400) {
        // Error: Invalid Request
        setError("Missing or invalid fields in the request.");
        setSuccessMessage(null);
      } 
        else if (response.status === 429) {
        // Error: Invalid Request
        setError("More than 3req/1s or 10req/20s or 30req/1m.");
        setSuccessMessage(null);
      } 
        else if (response.status === 500) {
        // Error: Invalid Request
        setError("Backend failure");
        setSuccessMessage(null);
      } 
      else {
        // Other errors
        setError("An unexpected error occurred.");
        setSuccessMessage(null);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while connecting to the server.");
      setSuccessMessage(null);
    }
  };


  return (
    <div className="h-screen flex justify-center items-center">
      <form className="container mx-auto w-1/2 p-12 border border-neutral-400" onSubmit={handleSubmit}>
        {/* Success Message */}
        {successMessage && (
          <p className="mb-4 text-sm text-green-500 text-center">{successMessage}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Username */}
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter username"
            onChange={handleChange}
            required
          />
        </div>

        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gender
          </label>
          <select
            id="gender"
            className="ml-2 border border-black"
            onChange={handleChange}
            required
          >
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter email address"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
