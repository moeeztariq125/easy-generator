import { useState } from 'react';
import { AiFillHome, AiFillPhone } from 'react-icons/ai';
import { RiUserFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('HOME');
  const navigation = useNavigate();
  function changeActive(button: string) {
    // setActive(button);   commenting to only have HOME as selected
    if (button == 'HOME') {
      navigation('/dashboard');
    }
    return;
  }

  const buttonClasses =
    'text-amber-500 md:text-3xl text-2xl px-1 py-1 hover:text-gray-700 active:text-gray-900 transition duration-300 px-5 py-2';
  const buttons = (
    <>
      <button
        onClick={() => changeActive('CONTACT')}
        className={
          active == 'CONTACT'
            ? buttonClasses
                .replace('text-amber-500', 'text-gray-800')
                .replace('hover:text-gray-700', '')
            : buttonClasses
        }
      >
        <AiFillPhone />
      </button>
      <button
        onClick={() => changeActive('HOME')}
        className={
          active == 'HOME'
            ? buttonClasses
                .replace('text-amber-500', 'text-gray-800')
                .replace('hover:text-gray-700', '')
            : buttonClasses
        }
      >
        <AiFillHome />
      </button>
      <button
        onClick={() => changeActive('USER')}
        className={
          active == 'USER'
            ? buttonClasses
                .replace('text-amber-500', 'text-gray-800')
                .replace('hover:text-gray-700', '')
            : buttonClasses
        }
      >
        <RiUserFill />
      </button>
    </>
  );
  return (
    <nav className='bg-amber-300 bg-opacity-50 text-gray-800 fixed  bottom-10 left-1/2 transform -translate-x-1/2 md:w-2/4 w-3/4 rounded-3xl  transition duration-300 flex flex-row justify-between '>
      {buttons}
    </nav>
  );
};

export default Navbar;
