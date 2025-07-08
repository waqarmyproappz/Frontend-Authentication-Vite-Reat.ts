import React, { useEffect, useState } from 'react'
import instance from '../axios'
import UpdatePassword from '../components/UpdatePassowrd';

interface User{
  _id: string;
  name: string;
  username: string;
  email: string;
}

const Home = () => {
  const [user, setuser] = useState<User[]>([]);

  const fetch = async () => {
    const response = await instance.get<User[]>('auth/alluser');
    console.log(response.data);
    setuser(response.data);

  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className='pt-10'>
      <div className='bg-amber-200 shadow-2xl p-4 rounded-2xl hover:scale-101'>
          <h2 className="text-2xl font-semibold text-center mb-4">All Users</h2>

  <ul className="list-disc pl-5 text-justify ">
    {user.map((user, index) => (
      <li className='m-2' key={index}>
<p className=' font-semibold text-justify leading-relaxed hover:bg-yellow-600 cursor-pointer'>
          <strong className='underline'>{user.name}</strong> ({user.username}) – {user.email}
        </p>      </li>
        
    ))}
  </ul>
</div>

    </div>
  )
}

export default Home