import { prisma } from "@repo/db";
import { UPDATE_MAP_LOCATION } from "@repo/types";
class Manager {
    public static async updateLocationOfHospital(payload:UPDATE_MAP_LOCATION) {
        try {
            const updateLoaction = await prisma.manager.update({
                where: {
                    userId: payload.userId
                },
                data: {
                    latitude: parseFloat(payload.latitude),
                    longitude: parseFloat(payload.longitude)
                }
            })
            return updateLoaction
            
        } catch (error) {
            
        }
    }
}