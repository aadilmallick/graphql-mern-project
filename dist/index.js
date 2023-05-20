"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("./schema/schema");
const config_1 = require("./config");
dotenv_1.default.config();
const PORT = (process.env.PORT || 3000);
const app = (0, express_1.default)();
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema: schema_1.Schema,
}));
app.listen(PORT, () => {
    (0, config_1.connectDB)();
    console.log("listening on port " + PORT);
});
