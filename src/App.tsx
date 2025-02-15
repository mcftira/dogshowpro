import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';
import { CookieConsent } from './components/cookie-consent';
import HomePage from './pages/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import AuthCallback from './pages/auth/callback';
import DashboardPage from './pages/dashboard';
import OrganizeCompetitionPage from './pages/organize';
import ShopPage from './pages/shop';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/organize" element={<OrganizeCompetitionPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
        <CookieConsent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;