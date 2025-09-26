import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Box } from '@mui/material';
import { COLORS } from '../../pages/dashboardPage/DashboardPage';
import './agePie.scss';

interface IAgePieChartProps {
  data: { name: string; value: number }[];
}

export const AgePieChart = ({ data }: IAgePieChartProps) => {
  const tooltipContent = (name: string, value: number) => {
    return (
      <div
        style={{
          background: '#fff',
          padding: '6px 10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        {name} : {value}
      </div>
    );
  };
  return (
    <Box
      className="age-pie"
      sx={{
        backgroundColor: '#fff',
        padding: 1,
        margin: 0,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(44,43,94,0.06)',
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
        The Age Spread
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, Math.max(...data.map((d) => d.value))]}
            tick={false}
          />
          <RadialBar dataKey="value" cornerRadius={8} label>
            {data.map((_, idx) => (
              <Cell key={`${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </RadialBar>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0];
                return tooltipContent(`${item.payload.name} ages`, item.value);
              }
              return null;
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </Box>
  );
};
