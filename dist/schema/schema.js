"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
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
            resolve: async (parent) => {
                const client = await Client_1.ClientModel.findById(parent.clientId);
                return client;
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
// TODO do notes: mutations, enum type, mongo and mutations
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "RootMutationType",
    description: "add clients and projects",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                phone: { type: graphql_1.GraphQLString },
            },
            resolve: async (parent, args) => {
                const client = new Client_1.ClientModel({ ...args });
                await client.save();
                return client;
            },
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                clientId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                description: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                status: {
                    type: new graphql_1.GraphQLEnumType({
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
                const project = new Project_1.ProjectModel({ ...args });
                await project.save();
                return project;
            },
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve: async (parent, args) => {
                const client = await Client_1.ClientModel.findByIdAndRemove(args.id);
                return client;
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve: async (parent, args) => {
                const project = await Project_1.ProjectModel.findByIdAndRemove(args.id);
                return project;
            },
        },
        editProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: "ProjectStatusUpdate",
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
                return await Project_1.ProjectModel.findByIdAndUpdate(args.id, {
                    $set: { ...args, id: args.id },
                }, { new: true });
            },
        },
    },
});
exports.Schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
