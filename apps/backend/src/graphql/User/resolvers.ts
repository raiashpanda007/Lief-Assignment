import { CREATE_USER } from "@repo/types";
import UserService from "../services/User";

const queries = {
    hello: () => "Hello World",
};

const mutations = {
    createUser: async (_: any, payload: CREATE_USER) => {
        return await UserService.createUser(payload);
    },
};

export const resolvers = {
    Query: queries,
    Mutation: mutations,
};
