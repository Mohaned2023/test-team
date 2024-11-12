import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';

function SignIn()
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    // Handle Email
    const handleEmailChange = (e) =>
        {
            setEmail(e.target.value);
        }
        
        // Handle Pasword
    const handlePasswordChange = (e) =>
    {
        setPassword(e.target.value);
    }

    // Handle Submit (Backend)
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
          setError('Please fill in both fields.');
          return;
        }
    
        try {
            const response = await fetch("https://my-app-backend.com/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  username: "your_username",
                  password: "your_password"
                })
              });
                  

          if (response.ok) {
            // هذه يا زعم الطريقة عشان يفتح Users
            navigate('/users');
          } else {
            setError('Invalid email or password.');
          }
        } catch {
          setError('An error occurred, please try again later.');
        }
      };

    return(
        <>
        <div className="bg-[#e3e3e3] h-screen flex justify-center items-center">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <div className="px-6 py-4">
    
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome to Our First Test Project</h3>
    
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>
    
            <form onSubmit={handleSubmit}>
                {/* Email Address */}
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" onChange={handleEmailChange} />
                </div>

                {/* Password */}
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" onChange={handlePasswordChange} />
                </div>

                
                <div className="flex items-center justify-between mt-4">
                    {/*  */}
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
    )
}

export default SignIn