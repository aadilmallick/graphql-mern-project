"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const sampleData_1 = require("../data/sampleData");
const graphql_1 = require("graphql");
const Project_1 = require("../models/Project");
const Client_1 = require("../models/Client");
const ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
    }),
});
const ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        clientId: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        // find matching client by seeing where the project's clientId matches the client's id
        client: {
            type: ClientType,
            resolve: (parent) => {
                return sampleData_1.clients.find((client) => client.id === parent.clientId);
            },
        },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // get single client based on id
        client: {
            type: ClientType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: (parent, args) => {
                return Client_1.ClientModel.findById(args.id);
            },
        },
        // get all clients
        clients: {
            type: (0, graphql_1.GraphQLList)(ClientType),
            resolve: () => Client_1.ClientModel.find({}),
        },
        // get single project with id
        project: {
            type: ProjectType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: (parent, args) => {
                return Project_1.ProjectModel.findById(args.id);
            },
        },
        // get all projects
        projects: {
            type: (0, graphql_1.GraphQLList)(ProjectType),
            resolve: () => Project_1.ProjectModel.find({}),
        },
    },
});
// const RootMutation = new GraphQLObjectType({
//   name: "RootMutationType",
//   description: "add clients and projects",
// });
exports.Schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
