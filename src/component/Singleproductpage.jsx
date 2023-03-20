import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/ProjectsQuery';
import { FiEdit } from 'react-icons/fi';
import DeletingProject from './DeletingProject';
import Editcomponent from './Editcomponent';
import { Togglecontext } from '../App';
import { IoIosCloseCircle } from 'react-icons/io';
const Singleproductpage = () => {
  const { setVisibillity } = useContext(Togglecontext);
  const [formVisibility, setFormVisibility] = useState(true);
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (error) { 
    return <h1>An error occured</h1>;
  }
  const handleFormVisible = () => {
    setVisibillity((prevValue) => !prevValue);
    setFormVisibility((prevvalue) => !prevvalue);
  };
  return (
    <div>
      {loading ? (
        <div className="flex flex-col  gap-3 justify-evenly w-3/4 bg-slate-800 h-screen mx-auto p-10">
          <div className="bg-slate-600 animate-pulse w-3/4 md:w-3/4 mb-4 h-8 rounded-full"></div>
          <div className="bg-slate-600 animate-pulse w-3/4 h-3 mb-3 rounded-full"></div>
          <div className="bg-slate-600 animate-pulse w-1/2 md:w-1/4 mb-4 h-10 rounded-full"></div>

          <div className="flex  gap-10">
            <div className="bg-slate-600 animate-pulse w-3/4 h-3  rounded-full"></div>
            <div className="bg-slate-600 animate-pulse w-3/4 h-3   rounded-full"></div>
          </div>
          <div className="bg-slate-600 animate-pulse w-full h-3  rounded-full"></div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-600 animate-pulse w-20 h-20  rounded-full"></div>
            <div className="bg-slate-600 animate-pulse w-3/4 md:w-3/4 mb-4 h-10 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="bg-slate-600 animate-pulse w-3/4 h-3  rounded-full"></div>
            <div className="bg-slate-600 animate-pulse w-3/4 h-3   rounded-full"></div>
            <div className="bg-slate-600 animate-pulse w-3/4 h-3  rounded-full"></div>
            <div className="bg-slate-600 animate-pulse w-3/4 h-3   rounded-full"></div>
            <div className="bg-slate-600 animate-pulse w-3/4 h-3   rounded-full"></div>
          </div>
        </div>
      ) : (
        data && (
          <div className="relative flex flex-col  gap-3 w-[85%] bg-slate-800 mt-24 h-fit m-auto p-10">
            <h1 className=" text-2xl md:text-6xl text-white font-bold">
              {data?.project.name}
            </h1>
            <p className="text-2xl text-gray-400">{data.project.timetaken}</p>
            <p className="mt-10 text-white text-xl md:text-2xl tracking-wide ">
              {data.project.description}
            </p>
            <Link to="/">
              <button className="absolute top-10 right-6 bg-blue-100 px-4 font-bold  py-2">
                Back
              </button>
            </Link>
            <h4 className="font-bold text-right text-gray-400 m-6">
              {data.project.status}
            </h4>
            <div className="flex flex-col w-1/2 mx-auto items-center">
              <h1 className="text-white text-xl md:text-3xl mb-4">
                Developer&apos;s Info
              </h1>
              <p className="border-b-2 w-full mb-2 font-bold text-white uppercase text-center ">
                {data.project.client.name}
              </p>
              <p className="border-b-2 w-full mb-2 text-white  text-center corder white">
                {data.project.client.email}
              </p>
              <p className="border-b-2 w-full mb-2 text-white  text-center corder white">
                {data.project.client.phone}
              </p>
              <p className="border-b-2 w-full mb-2 text-white  text-center corder white">
                {data.project.client.gender}
              </p>
            </div>
            <div className="w-3/4 mx-auto flex justify-between mt-8">
              <DeletingProject projectId={data.project.id} />
              <div
                className="cursor-pointer text-3xl text-white hover:text-blue-500 active:text-blue-600"
                onClick={handleFormVisible}
              >
                <FiEdit />
              </div>
              <div
                className={`absolute w-3/4 md:w-1/2 p-4  ${
                  formVisibility ? '-top-[50rem]' : 'top-20'
                } z-30 transition-all  duration-300 left-11 sm:left-1/4 bg-slate-800 ring-2 ring-blue-400 p-7 `}
              >
                {' '}
                <div
                  className="absolute right-4 text-red-500 text-4xl right-0 font-bold cursor-pointer"
                  onClick={handleFormVisible}
                >
                  <IoIosCloseCircle />
                </div>
                <Editcomponent
                  project={data.project}
                  setFormVisibility={setFormVisibility}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Singleproductpage;
