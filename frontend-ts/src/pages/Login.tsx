import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../axios';

interface LoginProps{
  setIsLoggedIn:(value:boolean)=>void;
}
const Login:React.FC<LoginProps> = ({setIsLoggedIn}) => {
  const [form, setForm] = useState<{email:string; password:string}>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await instance.post<{ token: string; msg?: string }>('auth/login', form);
      setIsLoggedIn(true);
      localStorage.setItem('user', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      alert('Login successful');
      navigate('/');
    } catch (error:any) {
      console.error('Login failed', error);
      if (error.response && error.response.data && error.response.data.msg) {
    alert(`Login failed: ${error.response.data.msg}`);
  } else {
    alert('Login failed. Please try again.');
  }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">Register here</a>
      </p>
    </form>
  );
};

export default Login;
