import { ApolloServer } from "@apollo/server";
import { gql } from "apollo-server";
import { User } from "./User";

async function StartGraphQLServer() {
    const graphqlServer = new ApolloServer({
        typeDefs: [
            gql`
                ${User.typeDefs}
                type Query {
                    ${User.queries}
                }
                type Mutation {
                    ${User.mutations}
                }
            `,
        ],
        resolvers: {
            Query: {
                ...User.resolvers.Query,
            },
            Mutation: {
                ...User.resolvers.Mutation,
            },
        },
    });

    await graphqlServer.start();
    return graphqlServer;
}

export { StartGraphQLServer };
