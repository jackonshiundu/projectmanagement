import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { IoIosAdd, IoIosCloseCircle } from 'react-icons/io';
import { Togglecontext } from '../App';
import AddClient from '../component/AddClient';
import ClientRow from '../component/ClientRow';
import { GET_CLIENTS } from '../queries/Clientqueries';

const Developers = () => {
  const { setVisibillity } = useContext(Togglecontext);

  const { data } = useQuery(GET_CLIENTS);
  const [formvisibilty, setFormVisibility] = useState(false);
  const handleFormVisible = () => {
    setFormVisibility((prevValue) => !prevValue);
    setVisibillity((prevValue) => !prevValue);
  };
  return (
    <div className="mt-24  w-full p-7 sm:w-3/4 sm:mx-auto">
      <h1 className="text-4xl text-blue-700 text-center font-bold mb-6">
        Developers Information
      </h1>
      <table className="w-full">
        <thead>
          <tr className="text-xl border-1 ">
            <th className="border border-slate-600">Name</th>
            <th className="border border-slate-600">Email</th>
            <th className="border border-slate-600">Phone</th>
            <th className="border border-slate-600">Gender</th>
          </tr>
        </thead>
        <tbody>
          {data?.clients.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              setFormVisibility={setFormVisibility}
            />
          ))}
        </tbody>
      </table>
      <div
        className="fixed right-11 bottom-11 h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-5xl cursor-pointer"
        onClick={handleFormVisible}
      >
        <IoIosAdd />
      </div>
      {formvisibilty && (
        <div
          className={`absolute w-3/4 md:w-1/2 mx-auto z-30    py-10 px-4 bg-slate-800 ${
            formvisibilty ? 'top-5' : '-top-[43rem]'
          } transition-all  duration-300`}
        >
          <div
            className="absolute right-4 text-red-500 text-4xl right-0 font-bold cursor-pointer"
            onClick={handleFormVisible}
          >
            <IoIosCloseCircle />
          </div>
          <AddClient setFormVisibility={setFormVisibility} />
        </div>
      )}
    </div>
  );
};

export default Developers;
