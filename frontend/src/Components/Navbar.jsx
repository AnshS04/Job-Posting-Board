import React, { useContext, useEffect, useState } from 'react'
import logo from "../Assets/logo.png";
import TokenContext from '../Context/TokenContext';
import DropDown from './DropDown';

const Navbar = () => {
    const {token} = useContext(TokenContext);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        if(token !== "" || localStorage.getItem("token") !== null) {
            setHasToken(true);
        }
        else {
            setHasToken(false)
        }
    }, [token])
    

  return (
    <div className="flex justify-between px-10 py-5 border-b border-gray-300">
      {!hasToken ? (
        <>
          <img src={logo} alt="Logo" width={100} />
          <button>Contact</button>
        </>
      ) : (
        <>
          <img src={logo} alt="Logo" width={100} />
          <div className='flex flex-row space-x-5'>
          <button>Contact</button>
            <DropDown/>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar
