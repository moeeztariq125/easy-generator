import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const Homepage = () => {
  localStorage.removeItem('email');
  return (
    <>
      <section className='h-screen '>
        <header className='w-full h-28 flex items-center'>
          <img src={Logo} className='grayscale h-full object-contain px-5' />
        </header>
        <section className='md:w-8/12 pt-24 items-center justify-center flex flex-col mx-auto md:px-0 px-8 '>
          <h1 className='font-semibold md:text-6xl text-3xl md:pb-10 pb-5 text-gray-900 md:px-0 px-5'>
            The #1 Sign-In & Sign Up Platform
          </h1>
          <h3 className=' text-gray-800 md:text-xl text-lg'>
            With Moeez's App, you can enjoy a whole of 2 functionalities
          </h3>
        </section>
        <section className='md:w-8/12 pt-20 items-center justify-center flex flex-col mx-auto md:px-0 px-8'>
          <button className='bg-gray-900 text-white rounded-sm px-5 py-3 font-semibold hover:bg-amber-200 hover:text-gray-900 transition duration-300'>
            <Link to={'/sign-up'}>Get Started</Link>
          </button>
        </section>
      </section>
    </>
  );
};

export default Homepage;
