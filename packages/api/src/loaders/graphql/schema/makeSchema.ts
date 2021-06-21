import { GraphQLSchema } from "graphql";
import { ObjectId } from "mongodb";
import path from "path";
import { buildSchema } from "type-graphql";
import { AsyncErrorHandler, TypegooseMiddleware } from "../../../middlewares";
import { ObjectIdScalar } from "../scalars/objectId";
import redisPubSub from "./redisPubSub";

// build TypeGraphQL executable schema
export default async function makeSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // add all typescript resolvers
    resolvers: [path.join(__dirname, "../../../", "modules/**/*.{ts,js}")],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),

    globalMiddlewares: [AsyncErrorHandler, TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
    pubSub: redisPubSub,
  });
  return schema;
}
