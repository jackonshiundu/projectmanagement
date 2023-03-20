import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: projectstatus
    $timetaken: timetaken
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
      timetaken: $timetaken
    ) {
      id
      name
      description
      status
      timetaken
      client {
        name
        email
        phone
        id
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation editProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: statusupdates
    $timetaken: timetakenupdates
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
      timetaken: $timetaken
    ) {
      id
      name
      description
      status
      timetaken
      client {
        name
        email
        phone
        id
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      name
    }
  }
`;
export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
