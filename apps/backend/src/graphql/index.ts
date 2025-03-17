import { ApolloServer } from '@apollo/server';


async function StartGraphQLServer() {
    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
               
            }
            type Mutation {
                
            }
        
            
        `,
        resolvers: {
            Query: {
                
            },
            Mutation:{
               
            }
            
        },
    });
    
    await graphqlServer.start()
    return graphqlServer
}
export { StartGraphQLServer }
    