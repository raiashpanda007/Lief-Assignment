export const typeDefs = `
    type User {
        id: ID!
        email: String!
        role: String
        name: String!
    }
    type ClockInRecord {
        id: ID!
        userId: String!
        timestamp: String!
        latitude: Float!
        longitude: Float!

    }`