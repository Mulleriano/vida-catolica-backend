export const typeDefs = `#graphql
  
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
