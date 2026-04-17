import getHexColors from "./utils/getHexColors.ts";
import axios from "axios";

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

let cacheLiturgia: any = null;

export const resolvers = {
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
      const hoje = new Date().toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      if (cacheLiturgia && cacheLiturgia.data === hoje) {
        return cacheLiturgia;
      }

      try {
       const LITURGIA_URL = process.env.LITURGIA_API_URL;

       if (!LITURGIA_URL) {
         throw new Error(
           "ERRO: A variável de ambiente LITURGIA_API_URL não foi definida!",
         );
       }

       const response = await axios.get(LITURGIA_URL);

        cacheLiturgia = {
          data: response.data.data,
          celebracao: response.data.liturgia,
          cor: getHexColors(response.data.cor),
          leitura: response.data.leituras.primeiraLeitura[0],
          salmo: response.data.leituras.salmo[0],
          evangelho: response.data.leituras.evangelho[0],
        };

        return cacheLiturgia;
      } catch (error) {
        if (cacheLiturgia) return cacheLiturgia;
        throw new Error("API de Liturgia indisponível.");
      }
    },
  },
};
