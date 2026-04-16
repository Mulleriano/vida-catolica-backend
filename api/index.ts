import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import axios from "axios";

const typeDefs = `#graphql
    type Santo {
        id: ID!
        nome: String!
        historia: String
        imagemUrl: String
    }

    type ConteudoLeitura {
        referencia: String
        titulo: String
        texto: String
    }

    type Liturgia {
        data: String!
        celebracao: String!
        cor: String!
        leitura: ConteudoLeitura
        salmo: ConteudoLeitura
        evangelho: ConteudoLeitura
    }

    type Query {
        santoDoDia: Santo

        liturgiaDoDia: Liturgia
        buscarSanto(nome: String!): [Santo]
    }
`;

let cacheLiturgia: any = null;
let ultimaBusca: number = 0;
const santos = [
  {
    id: "1",
    nome: "São Francisco de Assis",
    historia:
      "São Francisco de Assis é conhecido por sua humildade e amor pelos animais.",
  },
  {
    id: "2",
    nome: "Santa Teresa de Ávila",
    historia:
      "Santa Teresa de Ávila foi uma mística e reformadora da ordem carmelita.",
  },
];

const resolvers = {
  Query: {
    santoDoDia: () => {
      return santos[0];
    },

    buscarSanto: (_: any, args: { nome: string }) => {
      return santos.filter((santo) =>
        santo.nome.toLowerCase().includes(args.nome.toLowerCase()),
      );
    },

    liturgiaDoDia: async () => {
      const AGORA = Date.now();
      const UMA_HORA = 3600000;

      if (cacheLiturgia && AGORA - ultimaBusca < UMA_HORA) {
        console.log("Servindo liturgia do Cache 🛡️");
        return cacheLiturgia;
      }

      try {
        const response = await axios.get("https://liturgia.up.railway.app/v2/");

        cacheLiturgia = {
          data: response.data.data,
          celebracao: response.data.liturgia,
          cor: response.data.cor,
          leitura: response.data.leituras.primeiraLeitura[0],
          salmo: response.data.leituras.salmo[0],
          evangelho: response.data.leituras.evangelho[0],
        };

        ultimaBusca = AGORA;
        return cacheLiturgia;
      } catch (error) {
        if (cacheLiturgia) return cacheLiturgia;
        throw new Error("API de Liturgia indisponível.");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

export default startServerAndCreateNextHandler(server, {
  async context(req, res) {
    return { req, res };
  },
});
