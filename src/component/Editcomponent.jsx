import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Togglecontext } from '../App';
import { UPDATE_PROJECT } from '../mutation/Mutation';
import { GET_PROJECT } from '../queries/ProjectsQuery';
import { toast } from 'react-toastify';
const Editcomponent = ({ project, setFormVisibility }) => {
  const { setVisibillity } = useContext(Togglecontext);

  const [warningborders, setWarningborders] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState();
  const [timetaken, setTimetaken] = useState();
  const [clientId] = useState(project.client.name);

  const [editProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      name,
      clientId,
      description,
      status,
      timetaken,
      id: project.id,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const submitProject = (e) => {
    e.preventDefault();
    if (!name || !description || !clientId) {
      setWarningborders((prevvalue) => !prevvalue);

      setTimeout(() => {
        setWarningborders((prevvalue) => !prevvalue);
      }, 3000);
      return;
    }
    editProject(name, clientId, description, status, timetaken);

    setFormVisibility((prevvalue) => !prevvalue);

    setVisibillity((prevvalue) => !prevvalue);
    toast.info('Editted Successfully');
  };
  return (
    <form onSubmit={submitProject}>
      <h3 className="text-2xl font-bold text-white">Edit Project</h3>
      <div className="flex flex-col mt-8">
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
          <option value="fivedays">1-5 days</option>
          <option value="oneweek">1 week</option>
          <option value="twoweeks">2 weeks</option>
          <option value="threeweeks">3 weeks</option>
          <option value="fourweeks">4 weeks</option>
          <option value="onemonth">1 Month</option>
          <option value="twomonth">2 Months</option>
        </select>
      </div>

      <button className="btn p-2 mt-4 text-black" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Editcomponent;
