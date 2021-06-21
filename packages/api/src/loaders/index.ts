import cors from "cors";
import express from "express";
import { logError } from "../utils/logger";
import createApolloServer from "./graphql/apolloServer";
import makeSchema from "./graphql/schema/makeSchema";
import createMongoConnection from "./mongoConnection";

async function createExpressServer() {
  try {
    // create mongoose connection
    await createMongoConnection();

    // create express app
    const app = express();

    // allow CORS from client app
    const corsOptions = {
      credentials: true,
    };
    app.use(cors(corsOptions));

    // allow JSON requests
    app.use(express.json());

    const schema = await makeSchema();

    // create GraphQL server
    createApolloServer(schema, app, corsOptions);
  } catch (err) {
    logError(err);
  }
}

export default createExpressServer;
