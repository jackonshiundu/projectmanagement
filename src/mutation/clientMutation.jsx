import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!
    $gender: String!
    $email: String!
    $phone: String!
  ) {
    addClient(name: $name, gender: $gender, email: $email, phone: $phone) {
      id
      name
      phone
      gender
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      phone
      gender
      phone
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT };
