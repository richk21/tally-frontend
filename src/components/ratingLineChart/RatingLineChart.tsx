import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ILineChartData } from '../../interfaces/LineChartData';

const LABEL_MAP: Record<RatingKey, string> = {
  cleanliness: 'Cleanliness',
  airQuality: 'Air Quality',
  waterQuality: 'Water Quality',
  noiseLevel: 'Noise Level',
};

const COLOR_MAP: Record<RatingKey, string> = {
  cleanliness: '#6d3685',
  airQuality: '#4a1e5e',
  waterQuality: '#9460ad',
  noiseLevel: '#2f123d',
};

type RatingKey = 'cleanliness' | 'airQuality' | 'waterQuality' | 'noiseLevel';

interface IRatingsLineChartProps {
  data: ILineChartData[] | null;
  error: string | null;
}

export const RatingsLineChartWithToggle = ({
  data,
  error,
}: IRatingsLineChartProps) => {
  const [visibleLines, setVisibleLines] = useState<Record<RatingKey, boolean>>({
    cleanliness: true,
    airQuality: true,
    waterQuality: true,
    noiseLevel: true,
  });

  const toggleLine = (key: RatingKey) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(44,43,94,0.06)',
        width: '100%',
      }}
    >
      <div
        style={{
          fontWeight: '700',
          fontSize: '20px',
          padding: '10px',
          marginBottom: '15px',
        }}
      >
        Living Quality Snapshot!
      </div>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {(Object.keys(visibleLines) as RatingKey[]).map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={visibleLines[key]}
                onChange={() => toggleLine(key)}
                sx={{
                  color: COLOR_MAP[key],
                  '&.Mui-checked': { color: COLOR_MAP[key] },
                }}
              />
            }
            label={LABEL_MAP[key]}
          />
        ))}
      </Box>

      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Legend />
          {(Object.entries(visibleLines) as [RatingKey, boolean][]).map(
            ([key, visible]) =>
              visible && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLOR_MAP[key]}
                  strokeWidth={2}
                  name={LABEL_MAP[key]}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
