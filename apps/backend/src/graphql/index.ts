import { ApolloServer } from "@apollo/server";
import { gql } from "apollo-server";
import { User } from "./User";
import { Manager } from "./Manager";
async function StartGraphQLServer() {
    const graphqlServer = new ApolloServer({
        typeDefs: [
            gql`
                ${User.typeDefs}
                ${Manager.typeDefs}

                type Query {
                    ${User.queries}
                    ${Manager.queries}
                }
                type Mutation {
                    ${User.mutations}
                    ${Manager.mutations}
                }
            `,
        ],
        resolvers: {
            Query: {
                ...User.resolvers.Query,
                ...Manager.resolvers.Query
            },
            Mutation: {
                ...User.resolvers.Mutation,
                ...Manager.resolvers.Mutation
            },
        },
    });

    await graphqlServer.start();
    return graphqlServer;
}

export { StartGraphQLServer };
