import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { typeDefs } from "../src/schema";
import { resolvers } from "../src/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const apolloHandler = startServerAndCreateNextHandler(server);

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await apolloHandler(req, res);
}