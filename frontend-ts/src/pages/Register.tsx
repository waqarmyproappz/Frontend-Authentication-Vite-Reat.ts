// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../axios';
import type {RegisterForm} from '../types/UserForm'
const Register:React.FC = () => {
  const [form, setForm] = useState<RegisterForm> ({
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleChange = (  e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
console.log(form);
    if (form.password !== form.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        username: form.username,
        name: form.name,
        email: form.email,
        password: form.password,
        // termsAccepted: form.termsAccepted,
      };

      const response = await instance.post('auth/register', payload);
      console.log(response.data);
      localStorage.setItem('user', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('Registration successful');
      navigate('/login');
    } catch (error:any) {
      console.error('Registration failed', error);
      
    if (error.response && error.response.data && error.response.data.msg) {
    alert(`Registration failed: ${error.response.data.msg}`);
  } else {
    alert('Registration failed. Please try again.');
  }}
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          title="Enter full name"

        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium">Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          value={form.repeatPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-5 flex items-center">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={form.termsAccepted}
          onChange={handleChange}
          className="mr-2"
          required
        />
        <label className="text-sm">I agree to the <a href="#" className="text-blue-600">terms and conditions</a></label>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Register
      </button>

      <p className="text-sm text-center mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">Login here</a>
      </p>
    </form>
  );
};

export default Register;
