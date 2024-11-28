import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimeDetails from '../components/AnimeDetails';
import '../styles/PageLayout.css';
import '../styles/Gallery.css';

const Watchlist = () => {
  const { user, watchlist, removeFromWatchlist } = useAuth();
  const navigate = useNavigate();
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (watchlist.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-watchlist">
          <h2>Your watchlist is empty</h2>
          <p>Go to the Gallery to add some anime to your watchlist!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-container ${selectedAnimeId ? 'with-details' : ''}`}>
      <h1 className="page-title">My Watchlist</h1>
      <div className="gallery-grid">
        {watchlist.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="anime-image"
            />
            <div className="anime-info">
              <h3 className="anime-title">{anime.title}</h3>
              <div className="anime-details">
                <p>Rating: {anime.score || 'N/A'}</p>
                <p>Episodes: {anime.episodes || 'N/A'}</p>
                <p>Status: {anime.status}</p>
              </div>
              <div className="anime-card-buttons">
                <button 
                  className="view-details-btn"
                  onClick={() => setSelectedAnimeId(anime.mal_id)}
                >
                  View Details
                </button>
                <button 
                  className="watchlist-btn in-watchlist"
                  onClick={() => removeFromWatchlist(anime.mal_id)}
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedAnimeId && (
        <AnimeDetails 
          animeId={selectedAnimeId} 
          onClose={() => setSelectedAnimeId(null)}
        />
      )}
    </div>
  );
};

export default Watchlist;
