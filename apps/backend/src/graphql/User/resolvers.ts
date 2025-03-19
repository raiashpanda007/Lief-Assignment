import { CREATE_USER ,CLOCK_IN_USER, CLOCK_OUT_USER} from "@repo/types";
import UserService from "../services/User";

const queries = {
    getClockInUsers: async () => {
        return await UserService.getClockInUsers();
    },
};

const mutations = {
    createUser: async (_: any, payload: CREATE_USER) => {
        return await UserService.createUser(payload);
    },
    clockInUser: async (_:any,payload:CLOCK_IN_USER)=>{
        return await UserService.clockInUser(payload)
    },
    clockOutUser: async (_:any,payload:CLOCK_OUT_USER)=>{
        return await UserService.clockOutUser(payload)
    }

};

export const resolvers = {
    Query: queries,
    Mutation: mutations,
};
