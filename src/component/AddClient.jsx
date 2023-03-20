import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Togglecontext } from '../App';
import { ADD_CLIENT } from '../mutation/clientMutation';
import { GET_CLIENTS } from '../queries/Clientqueries';
import { toast } from 'react-toastify';

const AddClient = ({ setFormVisibility }) => {
  const { setVisibillity } = useContext(Togglecontext);

  const [name, setName] = useState('');
  const [warningborders, setWarningborders] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone, gender },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const submitClient = (e) => {
    e.preventDefault();
    if (!name || !email || !gender) {
      setWarningborders((prevvalue) => !prevvalue);

      setTimeout(() => {
        setWarningborders((prevvalue) => !prevvalue);
      }, 3000);
      return;
    }
    addClient(name, email, phone, gender);

    setVisibillity((prevValue) => !prevValue);
    setFormVisibility((prevValue) => !prevValue);
    toast.success('Added Succesfully');
  };

  return (
    <form onSubmit={submitClient} className="flex flex-col gap-3">
      <h3 className="text-2xl font-bold text-white">Add Project</h3>

      <div className="flex flex-col ">
        <label htmlFor="name" className="text-white">
          Developer's Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2 ${
            warningborders && 'ring-2 ring-red-500'
          }`}
        />
      </div>
      <div className="flex flex-col ">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2 ${
            warningborders && 'ring-2 ring-red-500'
          }`}
        />
      </div>
      <div className="flex flex-col ">
        <label htmlFor="name" className="text-white">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2 ${
            warningborders && 'ring-2 ring-red-500'
          }`}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="clientId" className="text-white">
          Gender
        </label>
        <select
          type="text"
          id="clientId"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={`bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2 ${
            warningborders && 'ring-2 ring-red-500'
          } `}
        >
          <option value="">Choose Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Cant't State">Can&apos;t State</option>
        </select>
      </div>
      <button className="btn p-2 mt-4 text-black" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddClient;
