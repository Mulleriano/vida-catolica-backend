import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../src/schema";
import { resolvers } from "../src/resolvers";

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
const apolloHandler = startServerAndCreateNextHandler(server);

export default async function handler(req: any, res: any) {
  // Cabeçalhos de Guerra contra o CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return await apolloHandler(req, res);
}