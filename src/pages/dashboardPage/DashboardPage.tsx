import { useEffect, useState } from 'react';
import { Loader } from '@progress/kendo-react-indicators';

import { AmenitiesDial } from '../../components/amenitiesDial/AmenitiesDial';
import './dashboardPage.scss';
import { getData, getRatingsOverTime } from '../../api/SurveyApi';
import { RatingsGaugeChart } from '../../components/ratingsGuageChart/RatingsGuageChart';
import OccupationBarChart from '../../components/occupationBarChart/OccupationBarChart';
import { AgePieChart } from '../../components/agePie/AgePie';
import { RatingsLineChartWithToggle } from '../../components/ratingLineChart/RatingLineChart';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NotFoundPage } from '../notFound/NotFoundPage';
import { getUserLocationByIP } from '../../api/geolocationApi';
import { ILineChartData } from '../../interfaces/LineChartData';
import { IStats } from '../../interfaces/Stats';

export const COLORS = [
  '#c2a8d6',
  '#9460ad',
  '#6d3685',
  '#4a1e5e',
  '#2f123d',
  '#1a0a27',
  '#0f0515',
];

export const DashboardPage = () => {
  const [stats, setStats] = useState<IStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lineChartData, setLineChartData] = useState<ILineChartData[] | null>(
    null
  );
  const [lineChartError, setLineChartError] = useState<string | null>(null);

  const executeSearch = (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    getData(query)
      .then((data: { stats: IStats | null }) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load data');
        setLoading(false);
      });

    getRatingsOverTime(query)
      .then((lineChartData: ILineChartData[] | null) => {
        setLineChartData(lineChartData);
      })
      .catch(() => {
        setLineChartError('Failed to get line chart data');
      });
  };

  useEffect(() => {
    getUserLocationByIP().then((loc) => {
      const city = loc.city || 'Agra';
      setSearchQuery(city);
      executeSearch(city);
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch(searchQuery);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="large" type="infinite-spinner" themeColor="dark" />
      </div>
    );
  }

  const ageData = stats?.ageDistribution
    ? Object.entries(stats.ageDistribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];
  const occupationData = stats?.occupationDistribution
    ? Object.entries(stats.occupationDistribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <div className="search-dashboard-container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '36px 0 24px 0',
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search your locality"
          value={searchQuery}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#4a1e5e' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#4a1e5e',
                borderRadius: '12px',
              },
              '&:hover fieldset': {
                borderColor: '#7a4faa',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4a1e5e',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#4a1e5e',
            },
            background: '#fff',
          }}
        />
      </div>
      {error || !stats ? (
        <NotFoundPage />
      ) : (
        <div className="dashboard-container">
          <div className="summary-cards-row">
            <AmenitiesDial amenities={stats.amenitiesAvg} />
          </div>

          <div className="summary-cards-col">
            <RatingsGaugeChart ratings={stats.ratingsAvg} />
          </div>

          <div className="rating-line">
            <div>
              <RatingsLineChartWithToggle
                data={lineChartData}
                error={lineChartError}
              />
            </div>
          </div>

          <div className="age-pie-occ-bar">
            <AgePieChart data={ageData} />
            <OccupationBarChart data={occupationData} />
          </div>
          <div className="comments-section">
            <div
              style={{
                fontWeight: '700',
                fontSize: '20px',
                color: '#fff',
                marginBottom: '30px',
              }}
            >
              {`Resident's Insights`}
            </div>
            {stats.comments.map((c, idx) => (
              <div
                style={{
                  backgroundColor: '#fff',
                  borderBottomRightRadius: '15px',
                  borderBottomLeftRadius: '15px',
                  borderTopRightRadius: '15px',
                  padding: '10px',
                  margin: '10px',
                  color: '#2c2c2cff',
                  fontWeight: '500',
                }}
                key={idx}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
