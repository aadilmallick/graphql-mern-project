import { useQuery, gql, useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import React from "react";
import { AddClientModal } from "./AddClientModal";
import { GET_CLIENTS } from "../queries/clientQueries";
import type { Client as ClientInterface } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export const Client = () => {
  // make data.clients of type Client[]. useQuery hook is typed based on
  // return value of data.
  const { loading, error, data } = useQuery<{ clients: ClientInterface[] }>(
    GET_CLIENTS
  );
  const [isOpen, setIsOpen] = React.useState(false);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>SOmething went wrong</h1>;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // TODO: explain scrollbar styling
  return (
    <section className="pt-48 pb-8 max-w-[90vw] mx-auto">
      <h1 className="text-2xl">Clients</h1>
      <div className="min-w-[600px] overflow-x-auto">
        <div className="grid grid-cols-[repeat(3,minmax(100px,1fr))_50px] border-b">
          <p className="font-bold capitalize">Name</p>
          <p className="font-bold capitalize">Email</p>
          <p className="font-bold capitalize">Phone</p>
        </div>
        {data?.clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </div>
      <div className="mt-20">
        <button
          className="px-4 py-2 rounded-sm bg-pink-400 uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-md"
          onClick={openModal}
        >
          Add client
        </button>
      </div>
      <AddClientModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
};

type ClientRowProps = {
  client: ClientInterface;
};

function ClientRow({ client }: ClientRowProps) {
  // create a mutation funciton from the apollo query, and passing in
  // an id variable with the value of client.id
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetches the following queries when the mutation is run. Allows data to change
    // without manually refetching
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });
  return (
    <div className="grid grid-cols-[repeat(3,minmax(75px,1fr))_50px] border-b items-center p-4 pr-16 hover:bg-gray-300 transition-colors min-w-[700px]">
      <p className="capitalize">{client.name}</p>
      <p className="capitalize">{client.email}</p>
      <p className="capitalize">{client.phone}</p>
      <button
        className="text-red-400 text-lg hover:text-red-600 transition-colors"
        onClick={() => deleteClient()}
      >
        <FaTrash />
      </button>
    </div>
  );
}
