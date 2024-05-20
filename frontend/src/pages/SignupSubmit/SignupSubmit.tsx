import { CgDanger } from 'react-icons/cg';
import Logo from '../../assets/Logo.png';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import { validationSchema } from './validations';
import { formConfig, FormValues } from './formInputs';
import { userService } from '../../services/userService';
import { useState } from 'react';
const SignupSubmit = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik<FormValues>({
    initialValues: {
      email: localStorage.getItem('email') || '',
      dob: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await userService.signUp(
          values.email,
          values.password,
          values.firstName,
          values.lastName,
          values.dob,
        );
        if (response.redirectTo == 'SIGNIN') {
          navigate('/sign-in');
          return;
        }
        navigate('/sign-in');
      } catch (err: any) {
        setError(err.errorMessage);
      }
      localStorage.setItem('email', values.email);
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
              <h1 className='md:text-4xl text-3xl  pt-15 text-gray-900 md:px-0 '>Sign Up Form</h1>
              <form className='w-full' onSubmit={formik.handleSubmit}>
                <div className='w-full flex flex-row justify-between md:flex-nowrap flex-wrap'>
                  <div className='w-full flex flex-col mx-5'>
                    {formConfig.col1.map((input, index) => (
                      <div key={index} className='flex flex-col'>
                        {/* <label htmlFor={input.name}>{input.label}</label> */}
                        <input
                          type={input.type}
                          name={input.name}
                          id={input.id}
                          value={formik.values[input.name]}
                          disabled={input.disabled}
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={input.placeholder}
                          className={`w-full mt-5 py-3 bg-${
                            input.disabled ? 'gray-300' : 'transparent'
                          }  rounded-md border-2 focus:outline-none text-black px-2`}
                        />
                        {formik.touched[input.name] && formik.errors[input.name] ? (
                          <span className='text-red-700 inline-flex items-center justify-start'>
                            <CgDanger className='mr-1' />
                            {formik.errors[input.name]}
                          </span>
                        ) : (
                          <span className='flex items-center self-start'>&nbsp;</span> // Preserve the height when there's no error
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='w-full flex flex-col mx-5'>
                    {formConfig.col2.map((input, index) => (
                      <div key={index} className='flex flex-col'>
                        {/* <label htmlFor={input.name} className='text-gray-400'>{input.label}</label> */}
                        <input
                          type={input.type}
                          name={input.name}
                          id={input.id}
                          value={formik.values[input.name]}
                          disabled={input.disabled}
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={input.placeholder}
                          className={`w-full mt-5 py-3 bg-${
                            input.disabled ? 'gray-300' : 'transparent'
                          }  rounded-md border-2 focus:outline-none text-black px-2`}
                        />
                        {formik.touched[input.name] && formik.errors[input.name] ? (
                          <span className='text-red-700 inline-flex items-center '>
                            <CgDanger className='mr-1' />
                            {formik.errors[input.name]}
                          </span>
                        ) : (
                          <span className='flex items-center self-start'>&nbsp;</span> // Preserve the height when there's no error
                        )}
                      </div>
                    ))}
                  </div>
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
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupSubmit;
