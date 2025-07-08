import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  isloggedIn:boolean;
  setIsLoggedIn:(value:boolean)=>void;
}
const MainLayout:React.FC<MainLayoutProps> = ({isloggedIn, setIsLoggedIn}) => {
  return (
    <>
      <Navbar isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="pt-16 p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
