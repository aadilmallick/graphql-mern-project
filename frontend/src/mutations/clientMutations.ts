import { gql } from "@apollo/client";

// This mutation deletes a specified client and returns it.
// It takes in a nonNull id that is of type graphql id.
export const DELETE_CLIENT = gql`
  mutation deleteClient($id: String!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

// mutation {
//     addClient(name: "test", email: "test@test", phone: "777-777-7777") {
//       name
//       id
//       email
//     }
//   }
