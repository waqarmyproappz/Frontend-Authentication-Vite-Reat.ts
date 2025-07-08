import React from 'react';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: string;
}

const DeleteProfileButton: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      await instance.delete(`auth/delete/${userId}`);
      alert('Your profile has been deleted.');
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      navigate('/login');
    } catch (error: any) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div>
       <p className='ml-0 text-sm'>
               For <span className='text-red-700 font-bold '>Delete</span> Profile <span className='underline cursor-pointer  hover:text-blue-600' onClick={handleDelete}>Click Here </span>
           </p>
    </div>
  );
};

export default DeleteProfileButton;
