import { useMutation } from '@apollo/client';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutation/Mutation';
import { GET_PROJECTS } from '../queries/ProjectsQuery';
import { toast } from 'react-toastify';
const DeletingProject = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  const deletingProject = () => {
    var confirm = window.confirm('Are you sure you want to delete?');
    if (confirm === true) {
      deleteProject();
    } else {
      return;
    }
    toast.warning('Deleted');
  };
  return (
    <div
      className="cursor-pointer text-3xl text-white hover:text-red-500 active:text-red-600"
      onClick={() => deletingProject()}
    >
      <AiFillDelete />
    </div>
  );
};

export default DeletingProject;
