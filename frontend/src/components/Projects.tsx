import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import type { Project } from "../queries/projectQueries";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddProjectModal } from "./AddProjectModal";

export const Projects = () => {
  const { data, loading, error } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );
  const [isOpen, setIsOpen] = useState(false);
  const openModal = setIsOpen.bind(null, true);
  const closeModal = setIsOpen.bind(null, false);

  if (loading) return <h1 className="text-3xl">Loading projects</h1>;
  if (error) {
    console.log(error);
    return <h1>error</h1>;
  }
  return (
    <section className="max-w-6xl pt-32 px-8 mx-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {data?.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <button
          className="text-5xl font-extrabold uppercase bg-pink-400 px-4 py-2 rounded-sm"
          onClick={openModal}
        >
          +
        </button>
      </div>
      <AddProjectModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white shadow-lg rounded p-4 border">
      <h3 className="text-xl font-bold">{project.name}</h3>
      <p className="text-gray-400">{project.description}</p>
      <p className="text-pink-400 text-lg">{project.status}</p>
      {/* placeholder link */}
      <Link
        className="block text-pink-200 hover:text-pink-500"
        to={`/project/${project.id}`}
      >
        View
      </Link>
    </div>
  );
}
