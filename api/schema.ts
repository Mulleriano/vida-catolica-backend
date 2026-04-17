export const typeDefs = `#graphql
  
    type Santo {
        id: ID!
        nome: String!
        historia: String
        imagemUrl: String
    }

    type Cor {
        nome: String!
        hex: String
        hexTexto: String
    }

    type ConteudoLeitura {
        referencia: String
        titulo: String
        texto: String
    }

    type Liturgia {
        data: String!
        celebracao: String!
        cor: Cor!
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
