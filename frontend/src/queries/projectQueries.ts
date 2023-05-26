import { gql } from "@apollo/client";
import { Client } from "./clientQueries";

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
  client: Client;
}

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
      description
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      name
      id
      clientId
      client {
        name
        email
        phone
        id
      }
      description
      status
    }
  }
`;

// {
//   project(id: "646a35d160649d294bf43023") {
// name
// id
// clientId
// client {
//   name
//   email
//   phone
//   id
// }
// description
// status
//   }
// }
