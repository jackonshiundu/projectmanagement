import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
      gender
    }
  }
`;
const GET_CLIENT = gql`
  query getClient($id: ID!) {
    clients(id: $id) {
      id
      name
      email
      phone
      gender
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };
