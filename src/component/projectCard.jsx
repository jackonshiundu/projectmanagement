import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative h-56 shadow-md bg-blue-200 w-full cursor-pointer hover:bg-transparent hover:ring-2 ring-blue-500 transition dutration-300 p-3 rounded-md">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <h3 className="text-gray-500">{project.timetaken}</h3>
      <div className="mb-20">
        {project.description.length > 100 ? (
          <p className=" font-bold">
            {project.description.substring(0, 100) + '...'}
          </p>
        ) : (
          <p>{project.description}</p>
        )}
      </div>
      <div className="absolute bottom-4 left-4 flex top-44 justify-between w-[90%]">
        <h3 className="font-bold">{project.status}</h3>
        <Link to={`/product/${project.id}`}>
          <button className="bg-white group-hover:bg-blue-200 p-2 rounded-md transition dutration-300">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
