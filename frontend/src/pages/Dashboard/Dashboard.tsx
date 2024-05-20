import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const navigation = useNavigate();
  const { accessToken, logout } = useAuth();
  function handleClick() {
    userService.logOut();
    logout();
    navigation('/');
  }
  if (!accessToken) {
    userService.logOut();
    return <Navigate to='/' replace />;
  }
  return (
    <>
      <header className='w-full h-28 flex items-center'>
        <img src={Logo} className='grayscale h-full object-contain px-5' />
      </header>
      <section className='md:w-8/12 pt-24 items-center justify-center flex flex-col mx-auto md:px-0 px-8 '>
        <h1 className='font-semibold md:text-6xl text-3xl md:pb-10 pb-5 text-gray-900 md:px-0 px-5'>
          Hey There {`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`} !!
        </h1>
        <h3 className=' text-gray-800 md:text-xl text-lg'>
          With Moeez's App, you can enjoy a whole of 2 functionalities.
        </h3>
        <h3 className=' text-gray-800 md:text-xl text-lg'>
          Just to ensure that access token is not stored in localStorage:
          {localStorage.getItem('accessToken') ?? 'null'}
        </h3>
        <button
          onClick={handleClick}
          className='bg-gray-900 text-white rounded-sm px-5 py-3 mt-10 font-semibold hover:bg-amber-200 hover:text-gray-900 transition duration-300'
        >
          Log Out
        </button>
      </section>
    </>
  );
};

export default Dashboard;
