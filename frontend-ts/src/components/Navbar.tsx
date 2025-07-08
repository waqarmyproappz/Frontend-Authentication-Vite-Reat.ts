// import React from 'react'
import { Link, NavLink, useNavigate ,useLocation} from 'react-router-dom'
// import { useState } from 'react'

interface NavbarProps {
  isloggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Navbar : React.FC<NavbarProps>= ({isloggedIn,setIsLoggedIn}) => {
    const navigate= useNavigate();
    const handlelogout=()=>{
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/login')
    }
     const location = useLocation(); // gives the full current location
  const loc = location.pathname; // e.g. "/profile"
    return (
<div className='fixed top-0 w-full left-0 z-50 ' >
        <nav className="bg-gray-900 h-16 text-white p-2 shadow-md">

            <div className="container h-full mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <NavLink to="/" className="hover:text-gray-300">MyApp</NavLink>
                </div>
                <div className="space-x-4">
                    <NavLink to="/"
                        className={({ isActive }) =>
                            isActive ? "text-white font-semibold underline" : "text-gray-300 hover:text-white"
                        }
                    >Home</NavLink>

                    {
                        isloggedIn && <NavLink to="/profile"
                        className={({ isActive }) =>
                            isActive ? "text-white font-semibold underline" : "text-gray-300 hover:text-white"
                        }
                    >Profile</NavLink>
                    }
                    
                    {
                        isloggedIn ? (
                            <button onClick={() => handlelogout()}
                                className="text-gray-300 hover:text-white cursor-pointer"
                            >Logout</button>
                        ) : (
                            < NavLink to="/login"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold underline" : "text-gray-300 hover:text-white"
                                }
                            >Login</NavLink>
                        )
                    }


                </div>
            </div>
             <div className="mb-4">
       
      </div>
      
        </nav >
        {
            loc=='/profile' &&  <Link to="/" className=" pl-7 text-blue-600  hover:underline text-md font-bold">
          ← Back
        </Link>
        }
        
        </div>

    )
}

export default Navbar