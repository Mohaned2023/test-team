import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backend = "https://test-production-1e72.up.railway.app";
      const response = await fetch(`${backend}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);

        // Save token to local storage
        localStorage.setItem("accessToken", result.accessToken);

        setUser(result.user);
        setError(null); // Clear previous errors if successful

        // Navigate to the users page
        navigate('/users'); 
      } 
      else if (response.status === 400) {
        // Success: User Created
        setSuccessMessage("Request body is missing some fields.");
        console.log(`Gender: ${data}`);
        setError(null);
      } else if (response.status === 401) {
        // Error: Username or Email already exists
        setError("Invalid password.");
        setSuccessMessage(null);
      } else if (response.status === 404) {
        // Error: Invalid Request
        setError("User with username not found.");
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
        console.error("Error logging in:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
        <div className="bg-[#e3e3e3] h-screen flex justify-center items-center">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <div className="px-6 py-4">
    
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome to Our First Test Project</h3>
    
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>
    
            <form onSubmit={handleSubmit}>
                {/* Email Address */}
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Username"  id="username"value={formData.username} onChange={handleChange}  />
                </div>

                {/* Password */}
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password"  id="password" value={formData.password} onChange={handleChange} />
                </div>

                
                <div className="flex items-center justify-between mt-4">
                    {/* Button */}
                    <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 w-full">Sign In</button>
                </div>
            </form>
        </div>
    
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
    
            <Link to="/signup" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</Link>
        </div>
    </div>
        </div>
        </>

    
  );
}

export default Login;
