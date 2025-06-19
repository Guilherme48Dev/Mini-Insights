import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';

import DashboardPage from '../pages/Dashboard/DashboardPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
