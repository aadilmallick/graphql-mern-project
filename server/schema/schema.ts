import { projects, clients } from "../data/sampleData";
import type { Project, Client } from "../data/sampleData";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
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
      resolve: (parent: Project) => {
        return clients.find((client) => client.id === parent.clientId);
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

// const RootMutation = new GraphQLObjectType({
//   name: "RootMutationType",
//   description: "add clients and projects",
// });

export const Schema = new GraphQLSchema({
  query: RootQuery,
});
