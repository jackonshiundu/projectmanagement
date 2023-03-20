import { useMutation } from '@apollo/client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutation/clientMutation';
import { GET_CLIENTS } from '../queries/Clientqueries';
import { toast } from 'react-toastify';
import { GET_PROJECTS } from '../queries/ProjectsQuery';

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });
  const deleteClientInfo = () => {
    deleteClient(client.id);
    var confirm = window.confirm('Are you sure you want to delete?');
    if (confirm === true) {
      deleteClient(client.id);
    } else {
      return;
    }
    toast.warning('Deleted Succesfully');
  };

  return (
    <>
      <tr className="text-center md:text-xl">
        <td className="border border-slate-600">{client.name}</td>
        <td className="border border-slate-600">{client.email}</td>
        <td className="border border-slate-600">{client.phone}</td>
        <td className="border border-slate-600">{client.gender}</td>
        <td>
          <button className="text-red-500 px-3 " onClick={deleteClientInfo}>
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
