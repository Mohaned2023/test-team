import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // لحفظ فهرس المستخدم المراد تعديله

  const [data, setData] = useState({
    fullName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // البيانات دخله داخل setUsers
    // setUsers(البيانات) كذا
  }, []);

  const handleRemoveUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


    //   Backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    if (editIndex !== null) {
      // تحديث بيانات المستخدم
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { ...data };
      setUsers(updatedUsers);
      setEditIndex(null);
  
      // إخفاء النموذج بعد التحديث
      document.getElementById("userData").style.display = "none"; 
      document.getElementById("table").style.opacity = "1";
    }
  };
  

  const showUserData = (index) => {
    const user = users[index];
    setData({
      fullName: user.fullName,
      gender: user.gender,
      email: user.email,
      password: user.password,
      confirmPassword: user.password, // للتأكد من التوافق
    });
    setEditIndex(index);
    document.getElementById("userData").style.display = "block";
    document.getElementById("table").style.opacity = "0.5";
  };



  return (
    <>
      <table className="w-full bg-[#f9f9f9]" id="table">
        <thead>
          <tr className="*:border *:p-4 *:w-1/5 *:font-bold">
            <td>Full Name</td>
            <td>Gender</td>
            <td>Password</td>
            <td>Email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="*:border *:p-4 *:w-1/5">
              <td>{user.fullName}</td>
              <td>{user.gender}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
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
        Number of Users: <span id="userNum">{users.length}</span>
      </h3>

      {/* نموذج التعديل */}
      <div id="userData" className="hidden">
        <div className="h-fit flex justify-center items-top">
          <form className="container mx-auto w-1/2 p-12 border border-neutral-400" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your name"
                value={data.fullName}
                onChange={handleChange}
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
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="Male">Male</option>   
                    <option value="Female">Female</option> 
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
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue-500 block w-full p-2.5"
                placeholder="Confirm password"
                value={data.confirmPassword}
                onChange={handleChange}
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
