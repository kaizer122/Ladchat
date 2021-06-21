import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloClientProvider,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { Constants } from "./config";
import constants from "./config/constants";
import { AUTH_TOKEN_KEY } from "./stores/AuthStore";
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem(AUTH_TOKEN_KEY) || null,
    },
  }));
  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: `${Constants.API_URL}/api`,
});
const cache = new InMemoryCache({});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
const wsLink = new WebSocketLink({
  uri: constants.WS_URL,
  options: {
    lazy: true,
    reconnect: true,
    // When connectionParams is a function, it gets evaluated before each connection.
    connectionParams: () => {
      return {
        authToken: localStorage.getItem(AUTH_TOKEN_KEY) || null,
      };
    },
    reconnectionAttempts: 5,
    timeout: 10000,
    connectionCallback: (error: Error[]) => {
      if (error) {
        console.log(error);
      }
      console.log("connectionCallback");
    },
    inactivityTimeout: 0,
  },
});

const client = new ApolloClient({
  cache,
  link: split(
    ({ query }) => {
      //@ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    from([errorLink, authMiddleware, uploadLink])
  ),
});

const ApolloProvider: React.FC = ({ children }) => {
  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};

export default ApolloProvider;
