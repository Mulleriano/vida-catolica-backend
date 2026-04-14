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

    liturgiaDoDia: (_: any, args: { data: string }) => {
      return {
        data: args.data,
        leitura: "Leitura do Livro de Gênesis",
        evangelho: "Proclamação do Evangelho de Jesus Cristo segundo Mateus",
      };
    }
  },
};
