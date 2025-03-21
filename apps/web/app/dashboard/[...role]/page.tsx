"use client";
import { gql, useQuery } from "@apollo/client";
import {  useMemo } from "react";
import DashboardStats from "../../../Components/DashboardStats";
import StaffTable from "../../../Components/StaffTable";
import { Button, InputNumber } from "antd";
import { useRouter } from "next/navigation";

// GraphQL query to get clocked-in users
const GET_CLOCK_IN_USERS = gql`
  query GetClockInUsers {
    getClockInUsers {
      id
      userId
      timestamp
      latitude
      longitude
      user {
        userId
        user {
          id
          email
          role
          name
        }
      }
    }
  }
`;

// TypeScript Interfaces
interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}
interface User1 {
  user: User;
}

interface ClockedInUser {
  id: string;
  userId: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  user: User1;
}

interface GetClockInUsersResponse {
  getClockInUsers: ClockedInUser[];
}

const ManagerDashboard: React.FC = () => {
  const router = useRouter()
  // Fetch API Data
  const { data, loading, error } =
    useQuery<GetClockInUsersResponse>(GET_CLOCK_IN_USERS);

  const totalClockedInDuration = useMemo(() => {
    if (!data?.getClockInUsers?.length) return "N/A";

    const now = Date.now(); // Get current time in milliseconds

    const totalMinutes = data.getClockInUsers.reduce((sum, user) => {
      let timestamp = Number(user.timestamp); // Ensure it's a number

      // Convert seconds to milliseconds if needed
      if (timestamp.toString().length === 10) {
        timestamp *= 1000;
      }

      const clockInTime = new Date(timestamp);

      if (isNaN(clockInTime.getTime())) {
        console.error("Invalid timestamp:", user.timestamp);
        return sum; // Skip invalid timestamps
      }

      const diffMinutes = (now - clockInTime.getTime()) / (1000 * 60); // Convert ms to minutes
      return sum + diffMinutes;
    }, 0);

    const avgMinutes = totalMinutes / data.getClockInUsers.length;

    return `${Math.floor(avgMinutes / 60)}h ${Math.floor(avgMinutes % 60)}m`;
  }, [data]);

  return (
    <div className="p-4 md:p-8 h-full">
      <h1 className="text-2xl font-bold text-white mb-6">Manager Dashboard</h1>
      <div className="w-1/4 flex justify-between items-center py-2">
        <Button variant="dashed" className="bg-transparent text-white" onClick={() => router.push("/map")}>
          Change location
        </Button>
        <div>
          <span className="text-white mr-2">Radius:</span>
          <InputNumber
            defaultValue={5}
            min={1}
            max={100}
            formatter={(value) => `${value} km`}
            
          />
        </div>
      </div>

      {/* Pass actual data when available */}
      <DashboardStats
        totalClockedIn={data?.getClockInUsers?.length || 0}
        avgClockedInHours={totalClockedInDuration}
      />

      <div className="mt-6 bg-black p-4 rounded-lg">
        <StaffTable staffData={data?.getClockInUsers || []} />
      </div>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">Error loading data.</p>}
    </div>
  );
};

export default ManagerDashboard;
