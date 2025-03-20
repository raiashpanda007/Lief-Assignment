"use client"
import { Card } from "antd";

interface StatsProps {
  totalClockedIn: number;
  avgClockedInHours: string; // Formatted duration
}

const DashboardStats: React.FC<StatsProps> = ({
  totalClockedIn,
  avgClockedInHours,
}) => {
  console.log("Total Clocked-in:", totalClockedIn);
  console.log("Avg Clocked-in Duration:", avgClockedInHours);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black border">
      <Card className="bg-black border border-gray-700 text-white p-4">
        <h3 className="text-lg">Currently Clocked-in</h3>
        <p className="text-xl font-bold">{totalClockedIn}</p>
      </Card>
      <Card className="bg-black border border-gray-700 text-white p-4">
        <h3 className="text-lg">Avg Clocked-in Duration</h3>
        <p className="text-xl font-bold">{avgClockedInHours}</p>
      </Card>
    </div>
  );
};

export default DashboardStats;
