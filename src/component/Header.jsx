import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenuFold } from 'react-icons/ai';
import { Togglecontext } from '../App';
const Header = () => {
  const { setVisibillity, visibility } = useContext(Togglecontext);
  const [menubar, setMenubar] = useState(false);
  const handleMenu = () => {
    setVisibillity((prevValue) => !prevValue);
    setMenubar((prevValue) => !prevValue);
  };
  return (
    <div>
      {visibility && (
        <div className="absolute w-full h-full bg-slate-800  opacity-70 left-0 transform duration-300"></div>
      )}
      <nav className=" bg-blue-300 fixed w-full">
        {visibility && (
          <div className="absolute w-full h-full bg-slate-800  opacity-70 left-0 transform duration-300"></div>
        )}
        <div className="flex justify-between p-8 ">
          <Link to="/">
            <div className="font-bold text-black">Brand</div>
          </Link>
          <AiOutlineMenuFold onClick={handleMenu} className="text-2xl" />
          <div
            className={`h-screen bg-blue-300 absolute w-1/2 top-0 ${
              menubar ? 'right-0' : '-right-[50vw]'
            }   pt-9 transition-all duration-500`}
          >
            <div className="flex font-bold  justify-around items-center text-xl z-50 md:text-5xl text-white">
              Projects Iventory{' '}
              <AiOutlineClose
                className="cursor-pointer font-bold text-2xl "
                onClick={handleMenu}
              />
            </div>
            <div className="flex flex-col gap-6 items-center pt-20 h-full">
              <Link to="/">
                <div className=" text-2xl font-bold " onClick={handleMenu}>
                  Projects
                </div>
              </Link>
              <Link to="/developers">
                <p className=" text-2xl font-bold " onClick={handleMenu}>
                  Developers
                </p>
              </Link>
              <Link to="/developers">
                <button
                  className="rounded-md shadow-md bg-gray-200 hover:bg-gray-300 active:bg-gray-400 active:scale-105 text-blue-700 h-fit p-3 text-2xl font-bold transition-all duration-300 "
                  onClick={handleMenu}
                >
                  Add Your Name
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
