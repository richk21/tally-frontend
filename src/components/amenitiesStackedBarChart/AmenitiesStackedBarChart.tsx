import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Box, Typography } from '@mui/material';

interface IDataPoint {
  name: string;
  value: number;
}

interface StackedBarChartProps {
  amenitiesData: IDataPoint[];
  occupationData: IDataPoint[];
}

export const AmenitiesOccupationStackedBarChart = ({
  amenitiesData,
  occupationData,
}: StackedBarChartProps) => {
  const combinedData = [
    ...amenitiesData.map((d) => ({ name: d.name, Amenities: d.value })),
    ...occupationData.map((d) => ({ name: d.name, Occupation: d.value })),
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        padding: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" textAlign="center" gutterBottom>
        Amenities & Occupation Overview
      </Typography>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={combinedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Amenities" stackId="a" fill="#9064a2ff" />
          <Bar dataKey="Occupation" stackId="a" fill="#4a1e5e" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
