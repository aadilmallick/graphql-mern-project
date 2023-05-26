import React, { useState } from "react";
import ReactDOM from "react-dom";
import {} from "../mutations/clientMutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import type { Client } from "../queries/clientQueries";
import Select from "react-select";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
// TODO: explain how annoying it is to use enums in graphql
const AddProjectModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const { loading, data: clientData } = useQuery<{ clients: Client[] }>(
    GET_CLIENTS
  );
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId: client },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  //   const [addClient] = useMutation(ADD_CLIENT, {
  //     variables: {
  //       name,
  //       email,
  //       phone,
  //     },
  //     refetchQueries: [{ query: GET_CLIENTS }],
  //   });

  if (loading) return <h1>Loading</h1>;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent event default
    e.preventDefault();
    if (!name || !description || !client || !status) return;
    console.log(name, description, client, status);

    try {
      addProject();
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };
  return (
    <>
      {/* modal overlay: when clicked on, dismiss modal */}
      <div
        className="fixed z-40 bg-black/75 inset-0"
        onClick={closeModal}
      ></div>
      {/* modal container */}
      <div
        className="bg-white fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border min-w-[35rem]
      max-h-1/2 p-8 rounded-sm"
      >
        <h1 className="text-2xl capitalize mb-8">Add Project</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="name" className="capitalize">
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="p-1 text-lg border rounded mb-4"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description" className="capitalize">
            description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="p-1 text-lg border rounded mb-4"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select
            options={clientData?.clients.map((clientD) => ({
              value: clientD.id,
              label: clientD.name,
            }))}
            onChange={(option) => setClient(option!.value)}
            className="mb-4 capitalize"
            placeholder="Select client..."
            required
          />
          <Select
            options={[
              { value: "new", label: "Not Started" },
              { value: "progress", label: "In Progress" },
              { value: "completed", label: "Completed" },
            ]}
            onChange={(option) => setStatus(option!.value)}
            className="mb-4 capitalize"
            placeholder="Select status"
            required
          />

          <button className="px-4 py-2 rounded bg-pink-400 uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-md">
            Add Project
          </button>
        </form>
      </div>
    </>
  );
};

interface AddProjectModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddProjectModal = ({
  isOpen,
  closeModal,
}: AddProjectModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      {ReactDOM.createPortal(
        <AddProjectModalContent closeModal={closeModal} />,
        document.querySelector("#overlay-root")!
      )}
    </>
  );
};
