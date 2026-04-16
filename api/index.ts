import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
const apolloHandler = startServerAndCreateNextHandler(server);

export default async function handler(req: any, res: any) {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://meu-app.vercel.app",
  ];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
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