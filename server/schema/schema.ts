import { projects, clients } from "../data/sampleData";
import type { Project, Client } from "../data/sampleData";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";
import { ProjectModel } from "../models/Project";
import { ClientModel } from "../models/Client";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    clientId: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    // find matching client by seeing where the project's clientId matches the client's id
    client: {
      type: ClientType,
      resolve: async (parent: Project) => {
        const client = await ClientModel.findById(parent.clientId);
        return client;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // get single client based on id
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return ClientModel.findById(args.id);
      },
    },
    // get all clients
    clients: {
      type: GraphQLList(ClientType),
      resolve: () => ClientModel.find({}),
    },
    // get single project with id
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return ProjectModel.findById(args.id);
      },
    },
    // get all projects
    projects: {
      type: GraphQLList(ProjectType),
      resolve: () => ProjectModel.find({}),
    },
  },
});

// TODO do notes: mutations, enum type, mongo and mutations
const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  description: "add clients and projects",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const client = new ClientModel({ ...args });
        await client.save();
        return client;
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve: async (parent, args) => {
        const project = new ProjectModel({ ...args });
        await project.save();
        return project;
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const client = await ClientModel.findByIdAndRemove(args.id);
        return client;
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const project = await ProjectModel.findByIdAndRemove(args.id);
        return project;
      },
    },
    editProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate", //* has to be unique
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve: async (parent, args) => {
        return await ProjectModel.findByIdAndUpdate(
          args.id,
          {
            $set: { ...args, id: args.id },
          },
          { new: true }
        );
      },
    },
  },
});

export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
