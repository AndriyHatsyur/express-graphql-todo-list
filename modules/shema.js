import { makeExecutableSchema } from "graphql-tools";
import { taskTypeDefs } from "../modules/task/typeDefs";
import taskResolvers from "../modules/task/resolver";

export const createGQLSchema = () =>
  makeExecutableSchema({
    typeDefs: [taskTypeDefs],
    resolvers: {
      ...taskResolvers,
    },
  });
