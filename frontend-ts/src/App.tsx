import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UpdateProfile from './pages/UpdateProifle'; // Consider renaming to UpdateProfile.tsx
import './App.css';
import Register from './pages/Register';
import MainLayout from './Layouts/MainLayout';

const App: React.FC = () => {
  const [isloggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            isloggedIn={isloggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UpdateProfile />} />
      </Route>

      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
