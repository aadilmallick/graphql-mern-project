import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus
    $clientId: String!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        name
        email
        phone
        id
      }
    }
  }
`;

// mutation {
//   deleteProject(id: "646fb328eabfa40b2385661a") {
//     name
//     id
//     description
//   }
// }

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      name
      id
      description
    }
  }
`;
