import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import EpInfo from './pages/EpInfo';
import Documentation from './pages/Documentation';
import './styles/Navbar.css';
import './styles/PageLayout.css';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar toggleTheme={toggleTheme} isDark={isDark} />
          <main className='amar'>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/epinfo/:id" element={<EpInfo />} />
              <Route 
                path="/watchlist" 
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
