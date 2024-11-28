import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchAnime = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
          params: {
            q: query,
            order_by: 'score',
            sort: 'desc',
            limit: 5
          }
        });
        setResults(response.data.data);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching anime:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchAnime, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (animeId) => {
    navigate(`/epinfo/${animeId}`);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search anime..."
          className="search-input"
        />
        {isLoading && <div className="search-spinner"></div>}
      </div>
      
      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((anime) => (
            <div
              key={anime.mal_id}
              className="search-result-item"
              onClick={() => handleResultClick(anime.mal_id)}
            >
              <img
                src={anime.images.jpg.small_image_url}
                alt={anime.title}
                className="result-image"
              />
              <div className="result-info">
                <div className="result-title">{anime.title}</div>
                <div className="result-details">
                  <span>{anime.type}</span>
                  <span>•</span>
                  <span>Episodes: {anime.episodes || 'N/A'}</span>
                  <span>•</span>
                  <span>Score: {anime.score || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
