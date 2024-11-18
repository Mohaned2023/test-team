import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // لحفظ فهرس المستخدم المراد تعديله
  const [numberOfUsers, setNumberOfUsers ] = useState();
  const [chosenUser,setChosenUser] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    name: '',
    userName: '',
    gender: '',
    email: '',
    username: '',
  });

  const backend = "https://test-production-1e72.up.railway.app";
  const token = localStorage.getItem("accessToken");

  // Get Number Of Users

  useEffect(() => {
    async function getNumberOfUsers() {
      try {
        const response = await fetch(`${backend}/api/v1/auth/length`);
        const jsonData = await response.json();
        setNumberOfUsers(jsonData.numberOfUsers);
      } catch (error) {
        console.error("Error fetching number of users:", error);
      }
    }
    getNumberOfUsers();
  }, [users]);


  // Get Users
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${backend}/api/v1/auth/users?start=${startIndex}&end=${endIndex}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const jsonData = await response.json();
        setUsers(jsonData.users);
        if (response.status === 200) {
          // Success: User Created
          console.log("Ok.");
          setError(null);
        }
        else if (response.status === 429) {
          // Error: Invalid Request
          setError("More than 3req/1s or 10req/20s or 30req/1m.");
          setSuccessMessage(null);
        } 
        else if (response.status === 401) {
          // Error: Invalid Request
          setError("Invalid accessToken.");
          setSuccessMessage(null);
        } 
        else if (response.status === 403) {
          // Error: Invalid Request
          setError("User is not admin.");
          setSuccessMessage(null);
        } 
        else if (response.status === 404) {
          // Error: Invalid Request
          setError("Start and end out of range.");
          setSuccessMessage(null);
        } 
          else if (response.status === 500) {
          // Error: Invalid Request
          setError("Backend failure");
          setSuccessMessage(null);
        } 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getData();
  }, [startIndex, endIndex]);

  // Handle More Users Button
  const handleLoadMore = () => {
    if (endIndex < numberOfUsers) {
      setStartIndex(startIndex + 20);
      setEndIndex(endIndex + 20);
    }
  };
  // Handle Back Button
  const handleBack = () => {
    setStartIndex(startIndex - 20);
    setEndIndex(endIndex - 20);
  };
  
  // Remove user
  const handleRemoveUser = async (index) => {
    const username = users[index].username;
    if (!username || username.length < 3) {
      alert("Invalid username.");
      return;
    }
  
    if (window.confirm(`Are you sure you want to delete the user '${username}'?`)) {
      try {
        const response = await fetch(`${backend}/api/v1/auth/delete/${username}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message); // عرض رسالة النجاح
          setUsers(users.filter((_, i) => i !== index)); // تحديث القائمة بعد الحذف
        } 
        else if (response.status === 429) {
          // Error: Invalid Request
          setError("More than 3req/1s or 10req/20s or 30req/1m.");
          setSuccessMessage(null);
        } 
        else if (response.status === 400) {
          // Error: Invalid Request
          setError("Invalid username..");
          setSuccessMessage(null);
        } 
        else if (response.status === 401) {
          // Error: Invalid Request
          setError("Invalid accessToken.");
          setSuccessMessage(null);
        } 
        else if (response.status === 403) {
          // Error: Invalid Request
          setError("User is not admin.");
          setSuccessMessage(null);
        } 
        else if (response.status === 404) {
          // Error: Invalid Request
          setError("Start and end out of range.");
          setSuccessMessage(null);
        } 
          else if (response.status === 500) {
          // Error: Invalid Request
          setError("Backend failure");
          setSuccessMessage(null);
        } 
        else {
          alert(`Error: ${result.message}`); // عرض رسالة الخطأ
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };
  

  // Handle Inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  

  // Change Data of User
async function handleSubmit(e) {
  e.preventDefault();

  if (editIndex !== null) {
    // تحديث بيانات المستخدم
    const updatedUsers = [...users];
    updatedUsers[editIndex] = { ...data };
    setUsers(updatedUsers);
    setEditIndex(null);

    try {
      const updatedData = {
        name: data.name,
        username: data.username,
        email: data.email,
        gender: data.gender === 'true' ? true : false, 
      };

      const response = await fetch(`${backend}/api/v1/auth/update/${chosenUser}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User updated:", result);
        alert("User updated successfully!");
      }
      else if (response.status === 429) {
        // Error: Invalid Request
        setError("More than 3req/1s or 10req/20s or 30req/1m.");
        setSuccessMessage(null);
      } 
      else if (response.status === 400) {
        // Error: Invalid Request
        setError("Invalid username..");
        setSuccessMessage(null);
      } 
      else if (response.status === 401) {
        // Error: Invalid Request
        setError("Invalid accessToken.");
        setSuccessMessage(null);
      } 
      else if (response.status === 403) {
        // Error: Invalid Request
        setError("User is not admin.");
        setSuccessMessage(null);
      } 
      else if (response.status === 404) {
        // Error: Invalid Request
        setError("Start and end out of range.");
        setSuccessMessage(null);
      } 
        else if (response.status === 500) {
        // Error: Invalid Request
        setError("Backend failure");
        setSuccessMessage(null);
      } 
      else {
        console.log("Error:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      alert("An error occurred while updating the user.");
    }

    // إخفاء النموذج بعد التحديث
    document.getElementById("userData").style.display = "none";
    document.getElementById("table").style.opacity = "1";
  }
}

  // Show Data
    function showUserData (index) {
    const user = users[index];
    setData({
      name: user.name,
      gender: user.gender,
      email: user.email,
      username: user.username,
      create_at: user.create_at,
    });

    setChosenUser(users[index].username);

    setEditIndex(index);
    document.getElementById("userData").style.display = "block";
    document.getElementById("table").style.opacity = "0.5";
  };

  // Close the user form
  const handleClose = () => {
    setEditIndex(null);  // إلغاء التعديل في حالة كان هناك تعديل مفتوح
    setData({
      name: '',
      userName: '',
      gender: '',
      email: '',
      username: '',
    });  // إعادة تعيين البيانات إلى القيم الافتراضية
    document.getElementById("userData").style.display = "none";  // إخفاء النموذج
    document.getElementById("table").style.opacity = "1";  // إعادة إظهار الجدول
  };


  return (
    <>
      <table className="w-full bg-[#f9f9f9]" id="table">
        <thead>
          <tr className="*:border *:p-4 *:w-1/6 *:font-bold">
            <td>Name</td>
            <td>User Name</td>
            <td>Gender</td>
            <td>Email</td>
            <td>Create At</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="*:border *:p-4 *:w-1/6">
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.gender ? "Male" : "Female"}</td>
              <td>{user.email}</td>
              <td>{user.create_at}</td>
              <td className="space-x-2">
                <button
                  className="bg-[#990000] p-1 text-white rounded-md hover:bg-[#99000080]"
                  onClick={() => handleRemoveUser(index)}
                >
                  Delete
                </button>
                <a
                  href="#"
                  className="bg-[#000099] p-1 text-white rounded-md hover:bg-[#00009980]"
                  onClick={() => showUserData(index)}
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Number of Users: <span id="userNum">{numberOfUsers}</span>
      </h3>

      {/* Show more USers */}
      {endIndex < numberOfUsers && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Load More
        </button>
      )}

      {/* زر "الرجوع" */}
      {startIndex > 0 && (
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Back
        </button>
      )}

      {/* Form Editing*/}
      <div id="userData" className="hidden absolute top-1/4 w-full z">
        <div className="h-fit flex justify-center items-top ">
          <form className="container mx-auto w-1/2 p-12 border border-neutral-400 relative bg-yellow-200" onSubmit={handleSubmit}>
          {/* Close Button */}
        <button className='absolute top-0 right-0 bg-red-500 text-white' onClick={handleClose}>Close </button>
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your name"
                value={data.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
              <select
                    id="gender"
                    className="ml-2 border border-black"
                    value={data.gender}  
                    onChange={handleInputChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="true">Male</option>   
                    <option value="false">Female</option> 
            </select>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter email address"
                value={data.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Username */}
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input
                type="text"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter password"
                value={data.username}

                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>

    </>
  );
}

export default Users;
