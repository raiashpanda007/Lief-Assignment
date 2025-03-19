import bcrypt from "bcryptjs";
import type { CLOCK_IN_USER, CREATE_USER } from "@repo/types";
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
            if (userExists) {
                return userExists;
            }
            const user = await prisma.user.create({
                data: {
                    email: payload.email,
                    password: hashedPassword,
                    role: payload.role,
                    name: payload.name,

                },
            });
            if(payload.role === "MANAGER"){
                await prisma.manager.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        teamSize: 0 // or any default value
                    }
                })
            }  else {
                await prisma.worker.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                })
            }
            return user;

        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user. Please try again.");
        }
    }
    public static async getClockInUsers() {
        try {
            const ClockInUsers = await prisma.clockInRecord.findMany({});
            

            return ClockInUsers


        } catch (error) {
            throw Error("Failed to get ClockIn Users")
        }
    }
    public static async clockInUser(payload:CLOCK_IN_USER){
        try{
            const ClockInUser = await prisma.clockInRecord.create({
                data:{
                    userId:payload.userId,
                    timestamp: new Date(payload.timestamp),
                    latitude:parseFloat(payload.latitude),
                    longitude:parseFloat(payload.longitude)
                }
            })
            return ClockInUser
        }catch(error){
            console.error("Error clocking in user:", error);
            throw Error("Failed to Clock In User")
        }
    }
}

export default UserService;
