export const typeDefs = `#graphql
  
    type Santo {
        id: ID!
        nome: String!
        historia: String
        imagemUrl: String
    }

    type Lirutgia {
        data: String!
        leitura: String!
        evangelho: String!
    }

    type Query {
        santoDoDia: Santo

        liturgiaDoDia(data: String!): Lirutgia
        buscarSanto(nome: String!): [Santo]
    }

`;
