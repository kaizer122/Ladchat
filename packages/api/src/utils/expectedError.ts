// Taken from https://github.com/kadirahq/graphql-errors

import { ApolloError } from "apollo-server-errors";

class ExpectedError extends ApolloError {
  constructor(message: string) {
    super(message, "EXPECTED_ERROR");
    Object.defineProperty(this, "name", { value: "EXPECTED_ERROR" });
  }
}

export default ExpectedError;
