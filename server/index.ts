import express, { Application, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { Schema } from "./schema/schema";
import { connectDB } from "./config";
import colors from "colors";
import cors from "cors";
dotenv.config();
const PORT = (process.env.PORT || 3000) as number;

const app = express();
// allow cross origin requests from anywhere
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: Schema,
  })
);

app.listen(PORT, () => {
  connectDB();
  console.log("listening on port " + PORT);
});
