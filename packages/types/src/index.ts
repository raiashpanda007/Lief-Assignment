export interface CREATE_USER {
    name: string
    email: string
    password: string
    role: "MANAGER" | "WORKER"
}

export interface CLOCK_IN_USER {
    userId:string
    timestamp:Date
    latitude:string
    longitude:string
}