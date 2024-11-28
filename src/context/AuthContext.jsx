import { createContext, useContext, useState, useEffect } from 'react';
import users from '../data/users.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setWatchlist(parsedUser.watchlist || []);
    }
  }, []);

  const login = (username, password) => {
    const foundUser = users.users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      const userWithWatchlist = {
        ...foundUser,
        watchlist: foundUser.watchlist || []
      };
      setUser(userWithWatchlist);
      setWatchlist(userWithWatchlist.watchlist);
      localStorage.setItem('user', JSON.stringify(userWithWatchlist));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setWatchlist([]);
    localStorage.removeItem('user');
  };

  const addToWatchlist = (anime) => {
    if (!user) return false;
    
    const isAlreadyInWatchlist = watchlist.some(item => item.mal_id === anime.mal_id);
    if (isAlreadyInWatchlist) return false;

    const updatedWatchlist = [...watchlist, anime];
    setWatchlist(updatedWatchlist);
    
    const updatedUser = { ...user, watchlist: updatedWatchlist };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return true;
  };

  const removeFromWatchlist = (animeId) => {
    if (!user) return false;

    const updatedWatchlist = watchlist.filter(item => item.mal_id !== animeId);
    setWatchlist(updatedWatchlist);
    
    const updatedUser = { ...user, watchlist: updatedWatchlist };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return true;
  };

  const isInWatchlist = (animeId) => {
    return watchlist.some(item => item.mal_id === animeId);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        watchlist, 
        addToWatchlist, 
        removeFromWatchlist,
        isInWatchlist 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
