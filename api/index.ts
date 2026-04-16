import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import axios from "axios";

// 1. Defina o Schema aqui dentro
const typeDefs = `#graphql
  type Reading { referencia: String texto: String }
  type Liturgia { celebracao: String! cor: String! leitura: Reading salmo: Reading evangelho: Reading }
  type Query { liturgiaDoDia: Liturgia }
`;

// 2. Defina os Resolvers aqui dentro
const resolvers = {
  Query: {
    liturgiaDoDia: async () => {
      try {
        const response = await axios.get("https://liturgia.up.railway.app/v2/");
        return {
          celebracao: response.data.liturgia,
          cor: response.data.cor,
          leitura: response.data.leituras.primeiraLeitura[0],
          salmo: response.data.leituras.salmo[0],
          evangelho: response.data.leituras.evangelho[0],
        };
      } catch (e) { throw new Error("Erro na API externa"); }
    },
  },
};

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