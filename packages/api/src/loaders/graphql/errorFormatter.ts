import type { GraphQLError } from "graphql";
import { logError, logExpectedError } from "../../utils/logger";

const errorPath = (error: GraphQLError) => {
  if (!error.path) return "";
  return error.path
    .map((value, index) => {
      if (!index) return value;
      return typeof value === "number" ? `[${value}]` : `.${value}`;
    })
    .join("");
};

const handleServerError = (error: GraphQLError) => {
  logError("---Server Error---");
  logError(error);
  error.extensions?.exception &&
    logError(error.extensions.exception?.stacktrace?.join("\n"));

  const path = errorPath(error);
  path && logError("path", path);
  logError("-------------------\n");
};

const handleExpectedError = (error: GraphQLError) => {
  logExpectedError("---Intended Error---");
  logExpectedError(error);
  const path = errorPath(error);
  path && logExpectedError("path", path);
  logExpectedError("-------------------\n");
};

const createErrorFormatter = (error: GraphQLError) => {
  const err = error;
  const isExpected = err.extensions?.code === "EXPECTED_ERROR";
  if (isExpected) handleExpectedError(error);
  else handleServerError(error);
  error.message = isExpected ? error.message : "Internal Server Error";
  return error;
};

export default createErrorFormatter;
