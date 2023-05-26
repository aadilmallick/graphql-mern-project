import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}
