import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../axios';
import DeleteProfileButton from '../components/DeleteProfile';
import type { UpdateProfileForm } from '../types/UserForm';
import UpdatePassword from '../components/UpdatePassowrd';

const UpdateProfile: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<UpdateProfileForm>({
    username: '',
    name: '',
    email: '',
    password: '',
    _id: '',
  });

  const [showPasswordBox, setShowPasswordBox] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      alert('Not logged in');
      navigate('/login');
      return;
    }
console.log(localStorage.getItem('userInfo'));

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo) {
      setForm({
        _id: userInfo._id || '',
        username: userInfo.username || '',
        name: userInfo.name || '',
        email: userInfo.email || '',
        password: '',
      });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.put(`/auth/update/${form._id}`, form);
      alert('Profile updated successfully');
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const handlePasswordUpdateDone = () => {
    setShowPasswordBox(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Update {showPasswordBox? 'Password' : 'Profile'}
      </h2>

      {!showPasswordBox ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email (cannot be changed)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled
                className="shadow-xs bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg 
                block w-full p-2.5 cursor-not-allowed 
                dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
              />
            </div>

            {/* <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                autoComplete="new-password"
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div> */}

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
              px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800 cursor-pointer"
            >
              Update
            </button>
          </form>

            <p className='text-sm mt-2'>
               For Update Password <span className='underline cursor-pointer hover:text-blue-600 ' onClick={() => setShowPasswordBox(true)}>Click Here </span>
           </p>
        
          <div className="  ">
            <DeleteProfileButton userId={form._id} />
          </div>

         
        </>
      ) : (
        <div className="mt-4 p-5 rounded shadow-amber-900 hover:shadow-sm ">
          <UpdatePassword id={form._id} onClose={handlePasswordUpdateDone} />
          <button
            onClick={handlePasswordUpdateDone}
            className="cursor-pointer mt-2 text-sm text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
