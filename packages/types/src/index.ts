export interface CREATE_USER {
    name: string
    email: string
    password: string
    role: "MANAGER" | "WORKER"
}

export interface CLOCK_IN_USER {
    userId:string
    timestamp:string
    latitude:string
    longitude:string
}

export interface CLOCK_OUT_USER {
    userId:string
    message:string
    timestamp:string
    

}