import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export const LandingPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#2f123d',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        px: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Welcome to Tally.
      </Typography>

      <Typography variant="h6" maxWidth={500}>
        Explore real resident insights and ratings for your locality. Get
        detailed analysis of amenities, age demographics, occupations, and more.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          mt: 4,
          color: '#9460ad',
          fontSize: 28,
        }}
      >
        <HomeIcon fontSize="inherit" />
        <SearchIcon fontSize="inherit" />
        <BarChartIcon fontSize="inherit" />
        <SentimentSatisfiedAltIcon fontSize="inherit" />
      </Box>

      <Typography variant="body1" sx={{ mt: 6, color: '#c2a8d6' }}>
        Start your search to discover your community like never before.
      </Typography>
    </Box>
  );
};
