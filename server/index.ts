import express, { Application, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { Schema } from "./schema/schema";
import { connectDB } from "./config";
import colors from "colors";
import cors from "cors";
const path = require("path");
dotenv.config({
  path: `.env${process.env.NODE_ENV === "production" ? ".production" : ""}`,
});
console.log("NODE_ENV:", process.env.NODE_ENV);

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("welcome to API"));
}

app.listen(PORT, () => {
  connectDB();
  console.log("listening on port " + PORT);
});
