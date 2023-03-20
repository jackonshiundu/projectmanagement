import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAdd, IoIosCloseCircle } from 'react-icons/io';
import { Togglecontext } from '../App';
import { GET_PROJECTS } from '../queries/ProjectsQuery';
import AddProject from './addProject';
import Loader from './Loader';
import ProjectCard from './projectCard';
const Projects = () => {
  const { setVisibillity } = useContext(Togglecontext);
  //fetching projects
  const { loading, data } = useQuery(GET_PROJECTS);

  const [formVisibility, setFormVisibility] = useState(false);

  /*   const [items, setItems] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = items?.projects.name?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    <div className="absolute w-full h-screen bg-slate-800  opacity-50 left-0 transform duration-300"></div>;

    setItems(filteredData);
  }, [searchTerm]);
 */
  const handleFormVisible = () => {
    setVisibillity((prevValue) => !prevValue);
    setFormVisibility((prevvalue) => !prevvalue);
  };

  return (
    <div className="flex flex-col gap-6 mt-24">
      <div className="relative flex  items-center gap-2 mx-auto border-2 w-3/4 rounded-md group group-focus:ring-2 ring-blue-400  border-blue-300">
        <AiOutlineSearch className="w-10 text-xl ont-bold" />
        <input
          type="search"
          placeholder="Search"
          className="outline-none border-none pr-4  p-2 w-3/4 "
          /* onChange={(e) => setSearchTerm(e.target.value)} */
        />
        <button className="btn absolute p-2 right-0 hover:-right-3 hover:-mb-3 active:scale-105 transform duration-300">
          Search
        </button>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : data ? (
          <div className="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p>Error</p>
        )}
      </div>
      <div
        className="fixed right-11 bottom-11 h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-5xl cursor-pointer"
        onClick={handleFormVisible}
      >
        <IoIosAdd />
      </div>
      <div
        className={`absolute w-3/4 md:w-1/2 p-4  ${
          formVisibility ? 't-20' : '-mt-[50rem]'
        } z-30 transition-all  duration-300 left-20 sm:left-1/4 bg-slate-800 p-7 `}
      >
        <div
          className="absolute right-4 text-red-500 text-4xl right-0 font-bold cursor-pointer"
          onClick={handleFormVisible}
        >
          <IoIosCloseCircle />
        </div>
        <AddProject setFormVisibility={setFormVisibility} />
      </div>
    </div>
  );
};

export default Projects;
