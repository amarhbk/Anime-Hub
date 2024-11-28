import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/AnimeDetails.css';

const AnimeDetails = ({ animeId, onClose }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
        setAnime(response.data.data);
        
        // Fetch first episode details
        if (response.data.data.episodes > 0) {
          const episodeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/episodes/1`);
          setEpisodes(episodeResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching anime details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  useEffect(() => {
    // Add open class after a short delay to trigger animation
    const timer = setTimeout(() => {
      const panel = document.querySelector('.anime-details-panel');
      if (panel) {
        panel.classList.add('open');
      }
    }, 50);

    // Add escape key listener
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleClose = useCallback(() => {
    const panel = document.querySelector('.anime-details-panel');
    if (panel) {
      panel.classList.remove('open');
      // Wait for animation to complete before unmounting
      setTimeout(onClose, 300);
    }
  }, [onClose]);

  const fetchEpisodeDetails = async (episodeNumber) => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/episodes/${episodeNumber}`);
      setSelectedEpisode(response.data.data);
    } catch (error) {
      console.error('Error fetching episode details:', error);
    }
  };

  if (loading) {
    return (
      <div className="anime-details-panel">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!anime) {
    return null;
  }

  return (
    <div className="anime-details-panel">
      <button 
        className="close-button" 
        onClick={handleClose}
        aria-label="Close details"
      >
        ×
      </button>
      <div className="details-content">
        <div className="details-header">
          <img 
            src={anime.images.jpg.large_image_url} 
            alt={anime.title}
            className="details-image"
          />
          <div className="details-info">
            <h2>{anime.title}</h2>
            {anime.title_japanese && (
              <p className="japanese-title">{anime.title_japanese}</p>
            )}
          </div>
        </div>

        <div className="info-grid">
          <p><strong>Type:</strong> {anime.type}</p>
          <p><strong>Episodes:</strong> {anime.episodes || 'N/A'}</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Score:</strong> {anime.score || 'N/A'}</p>
          <p><strong>Rating:</strong> {anime.rating || 'N/A'}</p>
          <p><strong>Duration:</strong> {anime.duration}</p>
        </div>

        {anime.genres && anime.genres.length > 0 && (
          <div className="details-section">
            <h3>Genres</h3>
            <div className="genres-list">
              {anime.genres.map(genre => (
                <span key={genre.mal_id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {anime.synopsis && (
          <div className="details-section">
            <h3>Synopsis</h3>
            <p>{anime.synopsis}</p>
          </div>
        )}

        {anime.background && (
          <div className="details-section">
            <h3>Background</h3>
            <p>{anime.background}</p>
          </div>
        )}

        {episodes.length > 0 && (
          <div className="details-section">
            <h3>Episodes</h3>
            <div className="episodes-list">
              {episodes.map(episode => (
                <div 
                  key={episode.mal_id} 
                  className="episode-item"
                  onClick={() => fetchEpisodeDetails(episode.mal_id)}
                >
                  <h4>{episode.title}</h4>
                  {selectedEpisode && selectedEpisode.mal_id === episode.mal_id && (
                    <p className="episode-synopsis">{selectedEpisode.synopsis}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeDetails;
