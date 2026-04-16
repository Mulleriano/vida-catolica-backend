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
let ultimaBusca: number = 0;

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
