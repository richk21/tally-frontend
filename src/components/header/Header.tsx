import { useNavigate, useLocation } from 'react-router-dom';
import './header.scss';
import Logo from '../../assets/images/tally-logo.png';
import { Box } from '@mui/material';
import {
  homeIcon,
  pageFooterSectionIcon,
  dashboardOutlineIcon,
} from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-react-common';

const pages = [
  { label: 'Landing Page', icon: homeIcon, path: '/' },
  { label: 'Survey Form', icon: pageFooterSectionIcon, path: '/survey' },
  { label: 'Dashboard', icon: dashboardOutlineIcon, path: '/dashboard' },
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
                key={icon.name}
                className={`nav-link${active ? ' active' : ''}`}
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
              >
                <SvgIcon
                  icon={icon}
                  size="large"
                  height={23}
                  width={23}
                  fontWeight="bold"
                />
                {/* {icon} */}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
