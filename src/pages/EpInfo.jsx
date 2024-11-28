import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/EpInfo.css';

const EpInfo = () => {
  const { id } = useParams();
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchAnimeData = async (retryCount = 0) => {
      setLoading(true);
      try {
        const [animeRes, charsRes, episodesRes, picturesRes] = await Promise.all([
          axios.get(`https://api.jikan.moe/v4/anime/${id}`),
          axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`),
          axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes`),
          axios.get(`https://api.jikan.moe/v4/anime/${id}/pictures`)
        ]);

        setAnime(animeRes.data.data);
        setCharacters(charsRes.data.data);
        setEpisodes(episodesRes.data.data);
        setPictures(picturesRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        if (retryCount < 2) {
          setTimeout(() => fetchAnimeData(retryCount + 1), 1000);
        } else {
          setError('Failed to fetch anime details after multiple attempts');
          setLoading(false);
        }
      }
    };

    fetchAnimeData();
  }, [id]);

  const handleWatchlistToggle = () => {
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
    return <div className="loading">Loading...</div>;
  }

  if (error || !anime) {
    return <div className="error">{error || 'Anime not found'}</div>;
  }

  return (
    <div className="epinfo-container">
      <div className="anime-header">
        <div className="anime-banner" style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}>
          <div className="banner-content">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-poster" />
            <div className="anime-header-info">
              <h1>{anime.title}</h1>
              <p className="japanese-title">{anime.title_japanese}</p>
              <div className="anime-stats">
                <span>Score: {anime.score}</span>
                <span>Rank: #{anime.rank}</span>
                <span>Episodes: {anime.episodes}</span>
                <span>Status: {anime.status}</span>
              </div>
              <button 
                className={`watchlist-btn ${isInWatchlist(anime.mal_id) ? 'in-watchlist' : ''}`}
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-tabs">
        <button 
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Information
        </button>
        <button 
          className={`tab-btn ${activeTab === 'characters' ? 'active' : ''}`}
          onClick={() => setActiveTab('characters')}
        >
          Characters
        </button>
        <button 
          className={`tab-btn ${activeTab === 'episodes' ? 'active' : ''}`}
          onClick={() => setActiveTab('episodes')}
        >
          Episodes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pictures' ? 'active' : ''}`}
          onClick={() => setActiveTab('pictures')}
        >
          Pictures
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'info' && (
          <div className="info-tab">
            <div className="synopsis">
              <h3>Synopsis</h3>
              <p>{anime.synopsis}</p>
            </div>
            <div className="additional-info">
              <div className="info-item">
                <h4>Information</h4>
                <p>Type: {anime.type}</p>
                <p>Episodes: {anime.episodes}</p>
                <p>Status: {anime.status}</p>
                <p>Aired: {anime.aired.string}</p>
                <p>Duration: {anime.duration}</p>
                <p>Rating: {anime.rating}</p>
              </div>
              <div className="info-item">
                <h4>Statistics</h4>
                <p>Score: {anime.score}</p>
                <p>Ranked: #{anime.rank}</p>
                <p>Popularity: #{anime.popularity}</p>
                <p>Members: {anime.members}</p>
                <p>Favorites: {anime.favorites}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="characters-grid">
            {characters.map((char) => (
              <div key={char.character.mal_id} className="character-card">
                <img src={char.character.images.jpg.image_url} alt={char.character.name} />
                <div className="character-info">
                  <h4>{char.character.name}</h4>
                  <p>{char.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'episodes' && (
          <div className="episodes-list">
            {episodes.map((episode) => (
              <div key={episode.mal_id} className="episode-item">
                <span className="episode-number">Episode {episode.mal_id}</span>
                <span className="episode-title">{episode.title}</span>
                <span className="episode-aired">{episode.aired}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pictures' && (
          <div className="pictures-grid">
            {pictures.map((pic, index) => (
              <img 
                key={index}
                src={pic.jpg.image_url}
                alt={`${anime.title} screenshot ${index + 1}`}
                className="anime-picture"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpInfo;
