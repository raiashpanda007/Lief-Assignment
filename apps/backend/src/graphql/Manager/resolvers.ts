import { UPDATE_MAP_LOCATION } from "@repo/types"
import Manager from "../services/Manager"

const queries = {
    hello: ()=>'hi there'
}
const mutations = {
    updateLocationOfHospital :async (_:any,payload:UPDATE_MAP_LOCATION)=>{
        return await Manager.updateLocationOfHospital(payload);
    }
    
}
export const resolvers = {
    Query: queries,
    Mutation: mutations
}