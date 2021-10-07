import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import config from "./config";
import { createGQLSchema } from "./modules/shema";

const { PORT } = config;

async function startApolloServer() {
  try {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema: createGQLSchema(),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  } catch (err) {
    console.log(err);
  }
}

startApolloServer();
