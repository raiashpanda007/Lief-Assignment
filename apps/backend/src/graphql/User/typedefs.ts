export const typeDefs = `
    type User {
    id: ID!
    email: String!
    role: String
    name: String!
}

type ClockInUser {
    userId: String!
    user: User
}

type ClockInRecord {
    id: ID!
    userId: String!
    timestamp: String!
    latitude: Float!
    longitude: Float!
    clockOutId: String
    user: ClockInUser
}

    type ClockOutRecord {
        id: ID!
        userId: String!
        timestamp: String!
        latitude: Float!
        longitude: Float!
        message: String
        clockInId: String!
    }
    type ClockOutRecord {
        id: ID!
        userId: String!
        timestamp: String!
        latitude: Float!
        longitude: Float!
        message: String
        clockInId: String!
    }   
`