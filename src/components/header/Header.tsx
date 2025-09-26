import { useNavigate, useLocation } from 'react-router-dom';
import './header.scss';
import Logo from '../../assets/images/tally-logo.png';
import { Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const pages = [
  { label: 'Landing Page', icon: <HomeOutlinedIcon />, path: '/' },
  { label: 'Survey Form', icon: <AssignmentOutlinedIcon />, path: '/survey' },
  { label: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header-nav-bar">
      <div className="container">
        <div
          className="brand-name"
          onClick={() => navigate('/')}
          role="button"
          tabIndex={0}
          aria-label="Navigate to landing"
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ width: 60, height: 60, objectFit: 'contain' }}
          />
        </div>
        <nav className="nav-buttons">
          {pages.map(({ icon, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={icon.key}
                className={`nav-link${active ? ' active' : ''}`}
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
              >
                {icon}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
