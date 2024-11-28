import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeDetails from '../components/AnimeDetails';
import { useAuth } from '../context/AuthContext';
import '../styles/PageLayout.css';
import '../styles/Gallery.css';

const Gallery = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${currentPage}`);
        setAnimes(response.data.data);
        setTotalPages(response.data.pagination.last_visible_page);
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo(0, 0);
  };

  const handleViewDetails = (animeId) => {
    setSelectedAnimeId(animeId);
  };

  const handleWatchlistToggle = (anime) => {
    if (!user) {
      alert('Please login to add anime to your watchlist');
      return;
    }
    
    if (isInWatchlist(anime.mal_id)) {
      removeFromWatchlist(anime.mal_id);
    } else {
      addToWatchlist(anime);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`page-container ${selectedAnimeId ? 'with-details' : ''}`}>
      <div className="gallery-grid">
        {animes.map((anime) => (
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
                  onClick={() => handleViewDetails(anime.mal_id)}
                >
                  View Details
                </button>
                <button 
                  className={`watchlist-btn ${isInWatchlist(anime.mal_id) ? 'in-watchlist' : ''}`}
                  onClick={() => handleWatchlistToggle(anime)}
                >
                  {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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

export default Gallery;
