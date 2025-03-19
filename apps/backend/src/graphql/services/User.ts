import bcrypt from "bcryptjs";
import type { CLOCK_IN_USER, CLOCK_OUT_USER, CREATE_USER } from "@repo/types";
import { prisma } from "@repo/db";

class UserService {
    public static async createUser(payload: CREATE_USER) {
        try {
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const userExists = await prisma.user.findUnique({
                where: { email: payload.email },
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

            if (payload.role === "MANAGER") {
                await prisma.manager.create({
                    data: {
                        user: { connect: { id: user.id } },
                        teamSize: 0, // Default value
                    },
                });
            } else {
                await prisma.worker.create({
                    data: {
                        user: { connect: { id: user.id } },
                    },
                });
            }

            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user. Please try again.");
        }
    }

    public static async getClockInUsers() {
        try {
            return await prisma.clockInRecord.findMany({});
        } catch (error) {
            console.error("Error fetching clock-in users:", error);
            throw new Error("Failed to get Clock-In Users");
        }
    }

    public static async clockInUser(payload: CLOCK_IN_USER) {
        try {
            return await prisma.$transaction(async (tx) => {
                // 🔹 Find the last clock-in record that has NOT been clocked out
                const lastClockIn = await tx.clockInRecord.findFirst({
                    where: {
                        userId: payload.userId,
                        clockOutId: null, // No clock-out linked → still active session
                    },
                });

                // 🔹 If the user is still clocked in, automatically clock them out
                if (lastClockIn) {
                    const clockOut = await tx.clockOutRecord.create({
                        data: {
                            userId: payload.userId,
                            timestamp: new Date(payload.timestamp), // Clock out at current time
                            latitude: lastClockIn.latitude, // Same location for now
                            longitude: lastClockIn.longitude,
                            clockInId: lastClockIn.id, // Link to clock-in
                        },
                    });

                    // 🔹 Update the previous clock-in record with clockOutId
                    await tx.clockInRecord.update({
                        where: { id: lastClockIn.id },
                        data: { clockOutId: clockOut.id },
                    });
                }

                // 🔹 Now, proceed with the new clock-in
                return await tx.clockInRecord.create({
                    data: {
                        userId: payload.userId,
                        timestamp: new Date(payload.timestamp),
                        latitude: parseFloat(payload.latitude),
                        longitude: parseFloat(payload.longitude),
                    },
                });
            });
        } catch (error) {
            console.error("Error clocking in user:", error);
            throw new Error("Failed to Clock In User");
        }
    }
    public static async  clockOutUser  (payload:CLOCK_OUT_USER) {
        try {
            return await prisma.$transaction(async (tx) => {
                const checkClockIn = await tx.clockInRecord.findFirst({
                    where: {
                        userId: payload.userId,
                        clockOutId: null
                    }
                })
                if(checkClockIn){
                    const clockOut = await tx.clockOutRecord.create({
                        data: {
                            userId: payload.userId,
                            timestamp: new Date(payload.timestamp),
                            message: payload.message,
                            latitude: checkClockIn.latitude,
                            longitude: checkClockIn.longitude,
                            clockInId: checkClockIn.id
                        }
                    })
                    await tx.clockInRecord.update({
                        where: {
                            id: checkClockIn.id
                        },
                        data: {
                            clockOutId: clockOut.id
                        }
                    })
                    return clockOut
                }
                
                
            })
        } catch (error) {
            console.error("Error clocking out user:", error);
            throw new Error("Failed to Clock Out User");
            
        }
    }
}

export default UserService;
