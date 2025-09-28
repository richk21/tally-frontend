import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Box } from '@mui/material';

interface OccupationBarChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

export const OccupationBarChart = ({ data }: OccupationBarChartProps) => {
  return (
    <Box
      className="occupation-bar-chart"
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(44, 43, 94, 0.06)',
        padding: 0,
        width: '100%',
      }}
    >
      <div
        style={{
          fontWeight: '700',
          fontSize: '15px',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        What do people do?
      </div>
      <ResponsiveContainer
        className="bar-chart-container"
        width={'90%'}
        height={250}
        style={{ padding: '10px' }}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill="#4a1e5e" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
