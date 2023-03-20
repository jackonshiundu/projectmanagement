import { gql } from '@apollo/client';
const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      timetaken
    }
  }
`;
const GET_PROJECT = gql`
  query getProjects($id: ID!) {
    project(id: $id) {
      id
      name
      description
      timetaken
      status
      client {
        id
        name
        email
        phone
        gender
      }
    }
  }
`;
export { GET_PROJECTS, GET_PROJECT };
