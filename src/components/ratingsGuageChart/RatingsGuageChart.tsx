import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Box } from '@mui/material';

const GaugeChart = ({
  label,
  value,
  max = 5,
  color,
}: {
  label: string;
  value: number;
  max?: number;
  color: string;
}) => {
  const data = [
    { name: 'Score', value },
    { name: 'Remaining', value: max - value },
  ];

  return (
    <Box sx={{ width: 180, height: 200, textAlign: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            stroke="#ccc"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? color : '#E0E0E0'}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ fontWeight: '700', marginTop: -100 }}>
        {((value / max) * 100).toFixed(0)}%
      </div>
      <div>{label}</div>
    </Box>
  );
};

export const RatingsGaugeChart = ({
  ratings,
}: {
  ratings: Record<string, number>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ fontWeight: '700', fontSize: '18px', margin: '0 10px' }}>
        Living Standards
      </div>
      <GaugeChart
        label="Road Quality"
        value={ratings.roadQuality}
        color="#5470C6"
      />
      <GaugeChart
        label="Affordability"
        value={ratings.affordability}
        color="#91CC75"
      />
      <GaugeChart label="Safety" value={ratings.safety} color="#FAC858" />
      <GaugeChart
        label="Internet Quality"
        value={ratings.internetQuality}
        color="#EE6666"
      />
    </Box>
  );
};
