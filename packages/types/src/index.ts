export interface CREATE_USER {
    name: string
    email: string
    password: string
    role: "MANAGER" | "WORKER"
}