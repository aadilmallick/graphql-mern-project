import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
//  TODO: explain modal styling
const AddClientModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent event default
    e.preventDefault();
    console.log(name, email, phone);

    if (!name || !email || !phone) {
      alert("please fill out everything");
      return;
    }

    // close modal

    // add client
    addClient();
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
        className="bg-white fixed top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border min-w-[35rem]
      max-h-1/2 p-8 rounded-sm"
      >
        <h1 className="text-2xl capitalize mb-8">Add client</h1>
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
          <label htmlFor="email" className="capitalize">
            email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="p-1 text-lg border rounded mb-4"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="phone" className="capitalize">
            phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="p-1 text-lg border rounded mb-4"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="px-4 py-2 rounded bg-pink-400 uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-md">
            Add client
          </button>
        </form>
      </div>
    </>
  );
};

interface AddClientModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddClientModal = ({ isOpen, closeModal }: AddClientModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      {ReactDOM.createPortal(
        <AddClientModalContent closeModal={closeModal} />,
        document.querySelector("#overlay-root")!
      )}
    </>
  );
};
