import bcrypt from "bcryptjs";
import type { CREATE_USER } from "@repo/types";
import { prisma } from "@repo/db";

class UserService {
    public static async createUser(payload: CREATE_USER) {
        try {
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const userExists = await prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            });
            if(userExists) {
                return userExists;
            }
            const user = await prisma.user.create({
                data: {
                    email: payload.email,
                    password: hashedPassword,
                    role: payload.role ,
                    name: payload.name,
                    
                },
            });
            return user;

        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user. Please try again.");
        }
    }
}

export default UserService;
