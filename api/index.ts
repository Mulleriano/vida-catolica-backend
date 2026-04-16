import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
const apolloHandler = startServerAndCreateNextHandler(server);

export default async function handler(req: any, res: any) {
  const allowedOrigins = [
    "http://localhost:5173/",
    "https://vida-catolica-three.vercel.app/",
  ];

  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Apollo-Require-Preflight",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await apolloHandler(req, res);
}