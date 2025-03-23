import { prisma } from "@repo/db";
import { UPDATE_MAP_LOCATION } from "@repo/types";
class Manager {
    public static async updateLocationOfHospital(payload:UPDATE_MAP_LOCATION) {
        try {
            const updateData: any = {};
    
            if (payload.latitude !== undefined) updateData.latitude = parseFloat(payload.latitude);
            if (payload.longitude !== undefined) updateData.longitude = parseFloat(payload.longitude);
            if (payload.radius !== undefined) updateData.radius = parseFloat(payload.radius);
    
            if (Object.keys(updateData).length === 0) {
              throw new Error("At least one field (latitude, longitude, radius) must be provided.");
            }
    
            const updatedManager = await prisma.manager.update({
              where: { userId: payload.userId },
              data: updateData,
            });
    
            return updatedManager; // Return true if successful
          } catch (error) {
            console.error("Error updating manager:", error);
            return false;
          }
    }
}
export default Manager