import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { GraphQLSchema } from "graphql";
import depthLimit from "graphql-depth-limit";
import { createServer, Server } from "http";
import { userLoader } from "../../modules/user/loaders/userLoader";
import { IContext } from "../../types/myContext";
import { logInfo } from "../../utils/logger";
import createErrorFormatter from "./errorFormatter";
import onConnect from "./subscriptions/onConnect";
import onDisconnect from "./subscriptions/onDisconnect";
const PORT = process.env.PORT || 8000;

function createApolloServer(
  schema: GraphQLSchema,
  expressApp: Express,
  corsOptions: { credentials: boolean }
) {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, connection }): IContext =>
      !req && connection
        ? connection.context
        : {
            isAuthed: false,
            bearerToken: req?.headers["authorization"] || "",
            loaders: {
              userLoader: userLoader(),
            },
          },
    introspection: true,
    formatError: createErrorFormatter,
    tracing: true,
    debug: process.env.NODE_ENV === "dev",
    // enable GraphQL Playground
    subscriptions: {
      onConnect: onConnect,
      onDisconnect: onDisconnect,
    },
    validationRules: [depthLimit(4, undefined, (depths) => logInfo(depths))],
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  apolloServer.applyMiddleware({ app: expressApp, cors: corsOptions });

  const httpServer: Server = createServer(expressApp);
  apolloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT, () => {
    logInfo(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
  return apolloServer;
}

export default createApolloServer;
