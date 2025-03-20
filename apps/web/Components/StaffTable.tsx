import { Card, Table } from "antd";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface User1 {
  user:User
}
interface ClockedInUser {
  id: string;
  userId: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  user: User1;
}

interface StaffTableProps {
  staffData: ClockedInUser[];
}

const StaffTable: React.FC<StaffTableProps> = ({ staffData }) => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Clock In Time", dataIndex: "clockIn", key: "clockIn" },
    { title: "Latitude", dataIndex: "latitude", key: "latitude" },
    { title: "Longitude", dataIndex: "longitude", key: "longitude" },
    { title: "Clocked-in Duration", dataIndex: "clockedInHours", key: "clockedInHours" },
  ];

  // Current time for calculating clock-in duration
  const now = new Date();

  // Format data to display
  const dataWithKeys = staffData.map((item, index) => {
    let timestamp = Number(item.timestamp); // Ensure it's a number
  
    // Convert seconds to milliseconds if needed
    if (timestamp.toString().length === 10) {
      timestamp *= 1000;
    }
  
    const clockInTime = new Date(timestamp);
    console.log("ClockInTime:", clockInTime);
  
    if (isNaN(clockInTime.getTime())) {
      console.error("Invalid timestamp:", item.timestamp);
      return null; // Skip invalid timestamps
    }
  
    const diffMinutes = (now.getTime() - clockInTime.getTime()) / (1000 * 60); // Convert ms to minutes
    const formattedDuration = `${Math.floor(diffMinutes / 60)}h ${Math.floor(diffMinutes % 60)}m`;
  
    return {
      key: item.id || index.toString(),
      name: item.user.user.name,
      email: item.user.user.email,
      role: item.user.user.role,
      clockIn: clockInTime.toLocaleString(),
      latitude: item.latitude.toFixed(6),
      longitude: item.longitude.toFixed(6),
      clockedInHours: formattedDuration,
    };
  }).filter(Boolean); 

  return (
    <Card>
      <Table columns={columns} dataSource={dataWithKeys} />
    </Card>
  );
};

export default StaffTable;
