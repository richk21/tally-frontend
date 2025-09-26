import { Routes, Route } from 'react-router-dom';
import { SurveyPage } from './pages/surveyPage/SurveyPage';
import { Header } from './components/header/Header';
import { DashboardPage } from './pages/dashboardPage/DashboardPage';
import { NotFoundPage } from './pages/notFound/NotFoundPage';
import { LandingPage } from './pages/landingPage/LandingPage';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
