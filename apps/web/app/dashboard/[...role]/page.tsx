import { Card, Table } from 'antd';

interface StaffTableProps {
  staffData: {
    name: string;
    clockIn: string;
    clockOut: string;
    location: string;
  }[];
}

const StaffTable: React.FC<StaffTableProps> = ({ staffData }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Clock In', dataIndex: 'clockIn', key: 'clockIn' },
    { title: 'Clock Out', dataIndex: 'clockOut', key: 'clockOut' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
  ];

  return (
    <Card className="bg-black border border-gray-700 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Clocked-in Staff</h2>
      <Table columns={columns} dataSource={staffData} pagination={false} className="bg-gray-800" />
    </Card>
  );
};

interface StatsProps {
  avgHours: number;
  dailyClockIns: number;
  totalHours: number;
}

const DashboardStats: React.FC<StatsProps> = ({ avgHours, dailyClockIns, totalHours }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-black border border-gray-700 text-white p-4">
        <h3 className="text-lg">Avg Hours Per Day</h3>
        <p className="text-xl font-bold">{avgHours} hrs</p>
      </Card>
      <Card className="bg-black border border-gray-700 text-white p-4">
        <h3 className="text-lg">Daily Clock-ins</h3>
        <p className="text-xl font-bold">{dailyClockIns}</p>
      </Card>
      <Card className="bg-black border border-gray-700 text-white p-4">
        <h3 className="text-lg">Total Hours (Last Week)</h3>
        <p className="text-xl font-bold">{totalHours} hrs</p>
      </Card>
    </div>
  );
};

const ManagerDashboard: React.FC = () => {
  const staffData = [
    { name: 'John Doe', clockIn: '08:00 AM', clockOut: '04:00 PM', location: 'Hospital A' },
    { name: 'Jane Smith', clockIn: '09:00 AM', clockOut: '05:00 PM', location: 'Hospital B' },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Manager Dashboard</h1>
      <DashboardStats avgHours={8} dailyClockIns={15} totalHours={120} />
      <div className="mt-6">
        <StaffTable staffData={staffData} />
      </div>
    </div>
  );
};

export default ManagerDashboard;
