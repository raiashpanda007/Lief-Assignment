export const mutations = `
    createUser(email: String!, name: String!, password: String!, role: String!): User
    clockInUser(userId: String!, timestamp: String!, latitude: String!, longitude: String!): ClockInRecord
`
