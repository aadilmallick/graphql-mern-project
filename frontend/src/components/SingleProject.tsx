import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Project, GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
export const SingleProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data } = useQuery<{ project: Project }>(GET_PROJECT, {
    variables: {
      id,
    },
  });
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id,
    },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  if (loading) return <h1 className="mt-64 text-lg">loading</h1>;

  console.log(data?.project);
  return (
    <section className="h-[calc(100vh-5rem)] flex justify-center items-center">
      <div className="w-3/4 bg-gray-100 shadow-lg p-8 space-y-4 mx-auto">
        <h1 className="text-2xl font-bold">{data?.project.name}</h1>
        <p>{data?.project.description}</p>
        <p className="font-bold text-pink-400">{data?.project.status}</p>
        <h2 className="text-xl font-thin tracking-widest">Client info</h2>
        <div>
          <p>{data?.project.client.name}</p>
          <p>{data?.project.client.email}</p>
          <p>{data?.project.client.phone}</p>
        </div>
        <button
          className="text-2xl text-red-400 shadow-sm border-4 border-red-100 p-2 hover:bg-red-400 hover:text-white hover:border-red-400 transition-colors rounded"
          onClick={() => deleteProject()}
        >
          <FaTrash />
        </button>
      </div>
    </section>
  );
};
