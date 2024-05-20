import { CgDanger } from 'react-icons/cg';
import Logo from '../../assets/Logo.png';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import { validationSchema } from './validation';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('email') || '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await userService.signIn(values.email, values.password);
        if (response.redirectTo == 'SIGNUP') {
          return navigate('/sign-up');
        }
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('userID', response.data.userID);
        localStorage.setItem('email', values.email);
        login(response.data.accessToken, response.data.refreshToken);
        navigate('/dashboard');
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
        <div className='w-10/12 bg-white relative mx-auto z-10 my-20  rounded-lg shadow-lg overflow-hidden'>
          <div className='basis-3/4'>
            <div className='w-full h-28 flex flex-row flex-start items-center'>
              <img src={Logo} className='grayscale h-full object-contain px-5' />
              <button onClick={() => navigate(-1)} className='text-2xl hover:text-3xl'>
                <FaBackward className=' text-amber-300  transition duration-200' />
              </button>
            </div>
            <div className='md:w-10/12 w-11/12 mx-auto flex flex-col items-start'>
              <h1 className='md:text-4xl text-3xl  pt-15 text-gray-900 md:px-0 '>Sign In</h1>
              <form className='w-full md:w-3/4 lg:w-2/4 mx-auto' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col'>
                  {/* <label htmlFor={input.name}>{input.label}</label> */}
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formik.values.email}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Email Address'
                    className='w-full mt-5 py-3 bg-gray-300  rounded-md border-2 focus:outline-none text-black px-2'
                    disabled
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className='text-red-700 inline-flex items-center self-start'>
                      <CgDanger className='mr-1' />
                      {formik.errors.email}
                    </span>
                  ) : (
                    <span className='flex items-center'>&nbsp;</span> // Preserve the height when there's no error
                  )}
                </div>
                <div className='flex flex-col'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={formik.values.password}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Password'
                    className='w-full mt-5 py-3 bg-transparent  rounded-md border-2 focus:outline-none text-black px-2'
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span className='text-red-700 inline-flex items-center self-start'>
                      <CgDanger className='mr-1' />
                      {formik.errors.password}
                    </span>
                  ) : (
                    <span className='flex items-center'>&nbsp;</span> // Preserve the height when there's no error
                  )}
                </div>
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
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
