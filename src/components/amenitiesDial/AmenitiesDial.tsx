import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ParkIcon from '@mui/icons-material/Park';
import './amenitiesDial.scss';

const COLORS = [
  '#c2a8d6',
  '#9460ad',
  '#6d3685',
  '#4a1e5e',
  '#2f123d',
  '#1a0a27',
  '#0f0515',
];

const AMENITIES_DIAL_TITLES: Record<string, string> = {
  hospital: 'Healthcare',
  groceryStore: 'Groceries',
  schools: 'Schools',
  publicTransport: 'Transport',
  recreation: 'Recreation',
};

const AMENITY_KEYS = [
  'hospital',
  'groceryStore',
  'schools',
  'publicTransport',
  'recreation',
];

const AMENITY_ICONS: Record<string, React.ReactElement> = {
  hospital: <LocalHospitalIcon fontSize="small" sx={{ color: 'white' }} />,
  groceryStore: (
    <LocalGroceryStoreIcon fontSize="small" sx={{ color: 'white' }} />
  ),
  schools: <SchoolIcon fontSize="small" sx={{ color: 'white' }} />,
  publicTransport: (
    <DirectionsBusIcon fontSize="small" sx={{ color: 'white' }} />
  ),
  recreation: <ParkIcon fontSize="small" sx={{ color: 'white' }} />,
};

interface DialProps {
  name: string;
  value: number;
  max?: number;
  color?: string;
  icon?: React.ReactElement;
}

const DialChart = ({ name, value, max = 5, color, icon }: DialProps) => {
  const data = [
    { name: 'Score', value },
    { name: 'Gap', value: max - value },
  ];

  return (
    <div
      style={{
        width: 200,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ borderRadius: '8px', padding: '5px' }}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={2}
              stroke="#ccc"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{
                marginTop: '-50px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={0.8}
          flexDirection={'column'}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translate(-30%, -50%)',
              pointerEvents: 'none',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#2f123d',
                borderRadius: '50%',
                height: '50px',
                width: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </div>
            <div
              style={{
                fontWeight: '700',
                paddingLeft: '10px',
              }}
            >
              {((value / max) * 100).toFixed(0)}%
            </div>
            <div
              style={{
                color: '#2c2c2cff',
                fontWeight: 500,
                whiteSpace: 'normal',
                fontSize: '14px',
              }}
            >
              {name}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

interface AmenitiesDialBoxProps {
  amenities: Record<string, number>;
}

const AmenitiesDialBox = ({ amenities }: AmenitiesDialBoxProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '5px',
        height: '100%',
      }}
      className="amenities-dials-container"
    >
      {Object.entries(amenities)
        .filter(([amenity]) => AMENITY_KEYS.includes(amenity))
        .map(([amenity, avg]) => (
          <DialChart
            key={amenity}
            name={AMENITIES_DIAL_TITLES[amenity]}
            icon={AMENITY_ICONS[amenity]}
            value={avg}
            color={COLORS[4]}
          />
        ))}
    </div>
  );
};

interface AmenitiesDialChartsProps {
  amenities: Record<string, number>;
}

export const AmenitiesDial = ({ amenities }: AmenitiesDialChartsProps) => {
  return (
    <div className="amenities-dial-charts-container">
      <div className="amenities-dial-charts-title">
        Amenities ratings at a glance
      </div>
      <AmenitiesDialBox amenities={amenities} />
    </div>
  );
};
