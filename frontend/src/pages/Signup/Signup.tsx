import { CgDanger } from 'react-icons/cg';
import Logo from '../../assets/Logo.png';
import { validationSchema } from './validations';
import { useFormik } from 'formik';
import Analytics from '../../assets/analytics-removebg-preview.png';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { useState } from 'react';
const Signup = () => {
  const navigation = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('email') || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await userService.checkUser(values.email);
        localStorage.setItem('email', values.email);
        if (response.redirectTo == 'SIGNIN') {
          navigation('/sign-in');
        }
        if (response.redirectTo == 'SIGNUP') {
          navigation('/sign-up-submit');
        }
      } catch (err: any) {
        setError(err.errorMessage);
      }
    },
  });
  function handleChange(e: any) {
    formik.handleChange(e);
    if (error) {
      setError('');
    }
  }

  return (
    <>
      <div className=' bg-white'>
        <div className='p-24 bg-amber-200 w-0 fixed top-0 z-0'></div>
        <div className='w-10/12 bg-white relative mx-auto z-10 my-20 flex flex-row flex-wrap rounded-lg shadow-lg overflow-hidden'>
          <div className='basis-3/4'>
            <div className='w-full h-28 flex items-center'>
              <img src={Logo} className='grayscale h-full object-contain px-5' />
            </div>
            <div className='md:w-10/12 w-11/12 mx-auto flex flex-col items-center justify-center'>
              <h1 className='md:text-5xl text-4xl md:pt-24 pt-15 text-gray-900 md:px-0 px-5'>
                Sign up
              </h1>
              <h2 className='md:text-md text-lg pt-5 text-gray-500 '>
                By signing up, I agree to Moeez's privacy policy.
              </h2>
              <form className='w-full flex flex-col' onSubmit={formik.handleSubmit}>
                {/* <label htmlFor='email'>Email</label> */}
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formik.values.email}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Email Address'
                  className='w-full mt-5 py-3 bg-transparent  rounded-md border-2 focus:outline-none text-black px-2'
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className='text-red-700 inline-flex items-center self-start'>
                    <CgDanger className='mr-1' />
                    {formik.errors.email}
                  </span>
                ) : (
                  <span className='flex items-center'>&nbsp;</span> // Preserve the height when there's no error
                )}
                {error ? (
                  <span className='text-red-700 inline-flex items-center self-start'>
                    <CgDanger className='mr-1' />
                    {error}
                  </span>
                ) : (
                  <span className='flex items-center'>&nbsp;</span> // Preserve the height when there's no error
                )}
                <button
                  type='submit'
                  className='bg-amber-300 w-full py-3 mt-5 rounded-md hover:shadow-xl transition duration-200 mb-5 text-white'
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className='bg-gray-500 basis-1/4 flex flex-col align-center justify-center px-6 '>
            <img src={Analytics} className=' object-contain' />
            <div className='flex flex-col mt-5'>
              <h3 className='text-2xl'>Steps To Do</h3>
              <h3 className='inline-flex items-center text-lg  justify-self-start mt-2'>
                <FaRegCheckCircle className='text-amber-300 mx-1' /> Enter Your Email
              </h3>
              <h3 className='inline-flex items-center text-lg  justify-self-start mt-2'>
                <FaRegCheckCircle className='text-amber-300 mx-1' /> Enter Your Account Details
              </h3>
              <h3 className='inline-flex items-center text-lg  justify-self-start mt-2'>
                <FaRegCheckCircle className='text-amber-300 mx-1' /> Press Submit
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
