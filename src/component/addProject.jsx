import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Togglecontext } from '../App';
import { ADD_PROJECT } from '../mutation/Mutation';
import { GET_CLIENTS } from '../queries/Clientqueries';
import { GET_PROJECTS } from '../queries/ProjectsQuery';
import { toast } from 'react-toastify';

const AddProject = ({ setFormVisibility }) => {
  const { setVisibillity } = useContext(Togglecontext);

  const [name, setName] = useState('');
  const [warningborders, setWarningborders] = useState(false);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState();
  const [timetaken, setTimetaken] = useState();
  const [clientId, setClientId] = useState('');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, timetaken, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });
  const { data } = useQuery(GET_CLIENTS);
  const submitProject = (e) => {
    e.preventDefault();
    if (!name || !description || !clientId) {
      setWarningborders((prevvalue) => !prevvalue);

      setTimeout(() => {
        setWarningborders((prevvalue) => !prevvalue);
      }, 3000);
      return;
    }
    addProject(name, description, status, timetaken, clientId);
    setClientId('');
    setName('');
    setDescription('');
    setStatus('');
    setTimetaken('');

    setFormVisibility((prevvalue) => !prevvalue);

    setVisibillity((prevvalue) => !prevvalue);
    toast.success('Project Added succesfully');
  };
  return (
    <form onSubmit={submitProject}>
      <h3 className="text-2xl font-bold text-white">Add Project</h3>

      <div className="flex flex-col mt-10">
        <label htmlFor="name" className="text-white">
          Project Name
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
      <div className="flex flex-col">
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2 ${
            warningborders && 'ring-2 ring-red-500'
          }`}
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="status" className="text-white">
          Status
        </label>
        <select
          type="text"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2"
        >
          <option value="">Stage in your project</option>

          <option value="ideamapping">Idea Mapping</option>
          <option value="notstarted">Not Started</option>
          <option value="inprogress">In progress</option>
          <option value="completed">Completed</option>
          <option value="notsure">Not Sure</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="timetaken" className="text-white">
          Time Taken
        </label>
        <select
          type="text"
          id="timetaken"
          value={timetaken}
          onChange={(e) => setTimetaken(e.target.value)}
          className="bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2"
        >
          {' '}
          <option value="">Duration of your project</option>
          <option value="fivedays">1-5 days</option>
          <option value="oneweek">1 week</option>
          <option value="twoweeks">2 weeks</option>
          <option value="threeweeks">3 weeks</option>
          <option value="fourweeks">4 weeks</option>
          <option value="onemonth">1 Month</option>
          <option value="twomonth">2 Months</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="clientId" className="text-white">
          Client Id
        </label>
        <select
          type="text"
          id="clientId"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className={`bg-blue-100 outline-0 border-0 hover:ring-2 focus:ring-2 ring-blue-500 p-2 ${
            warningborders && 'ring-2 ring-red-500'
          } `}
        >
          <option value="">Select Your Name</option>
          {data?.clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn p-2 mt-4 text-black" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddProject;
