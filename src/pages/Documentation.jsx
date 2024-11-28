import React from 'react';
import '../styles/Documentation.css';

const Documentation = () => {
  return (
    <div className="documentation-container">
      <h1>Technical Documentation</h1>
      
      <section className="doc-section">
        <h2>User Guide</h2>
        <div className="user-guide">
          <div className="guide-section">
            <h3>Getting Started</h3>
            <ol>
              <li>
                <strong>Create an Account</strong>
                <p>Click the "Login" button in the navigation bar to create your account or sign in.</p>
              </li>
              <li>
                <strong>Explore the Gallery</strong>
                <p>Browse through our extensive collection of anime in the Gallery section.</p>
              </li>
              <li>
                <strong>Customize Your Experience</strong>
                <p>Toggle between light and dark theme using the theme switch in the navigation bar.</p>
              </li>
            </ol>
          </div>

          <div className="guide-section">
            <h3>Key Features</h3>
            <div className="feature-cards">
              <div className="feature-card">
                <h4>Search Functionality</h4>
                <ul>
                  <li>Use the search bar to find specific anime titles</li>
                  <li>Results update in real-time as you type</li>
                  <li>Click on any result to view detailed information</li>
                </ul>
              </div>

              <div className="feature-card">
                <h4>Anime Details</h4>
                <ul>
                  <li>View comprehensive information about each anime</li>
                  <li>Browse through character lists and episode guides</li>
                  <li>Check out additional images in the pictures tab</li>
                  <li>Add/remove titles from your watchlist</li>
                </ul>
              </div>

              <div className="feature-card">
                <h4>Watchlist Management</h4>
                <ul>
                  <li>Add anime to your personal watchlist</li>
                  <li>Access your watchlist from any device</li>
                  <li>Remove titles when you're done watching</li>
                  <li>Track your watching progress</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="guide-section">
            <h3>Navigation Tips</h3>
            <div className="tips-grid">
              <div className="tip">
                <h4>Home Page</h4>
                <p>Start here to learn about the project and access quick links to main features.</p>
              </div>
              
              <div className="tip">
                <h4>Gallery</h4>
                <p>Browse and search through our extensive anime collection with infinite scrolling.</p>
              </div>
              
              <div className="tip">
                <h4>Anime Details</h4>
                <p>Click on any anime to view detailed information, characters, episodes, and more.</p>
              </div>
              
              <div className="tip">
                <h4>Watchlist</h4>
                <p>Keep track of anime you want to watch or are currently watching.</p>
              </div>
            </div>
          </div>

          <div className="guide-section">
            <h3>Keyboard Shortcuts</h3>
            <div className="shortcuts">
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><kbd>/</kbd></td>
                    <td>Focus search bar</td>
                  </tr>
                  <tr>
                    <td><kbd>Esc</kbd></td>
                    <td>Clear search/Close modals</td>
                  </tr>
                  <tr>
                    <td><kbd>T</kbd></td>
                    <td>Toggle theme</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>Tech Stack Overview</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <h3>Frontend Framework</h3>
            <p><strong>React 18</strong></p>
            <ul>
              <li>Functional Components with Hooks</li>
              <li>Context API for state management</li>
              <li>React Router v6 for navigation</li>
              <li>Custom hooks for data fetching</li>
            </ul>
          </div>

          <div className="tech-item">
            <h3>Styling</h3>
            <p><strong>CSS3 with Modern Features</strong></p>
            <ul>
              <li>CSS Variables for theming</li>
              <li>Flexbox & Grid layouts</li>
              <li>Media queries for responsiveness</li>
              <li>CSS Animations and transitions</li>
            </ul>
          </div>

          <div className="tech-item">
            <h3>State Management</h3>
            <p><strong>React Context API</strong></p>
            <ul>
              <li>Authentication context</li>
              <li>Theme context</li>
              <li>Watchlist management</li>
              <li>Local storage integration</li>
            </ul>
          </div>

          <div className="tech-item">
            <h3>Development Tools</h3>
            <p><strong>Modern Development Environment</strong></p>
            <ul>
              <li>Create React App</li>
              <li>npm for package management</li>
              <li>ESLint for code quality</li>
              <li>Git for version control</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>Jikan API Integration</h2>
        <div className="api-docs">
          <h3>About Jikan API</h3>
          <p>
            Jikan is an unofficial MyAnimeList API that provides access to the MyAnimeList database.
            It's a REST API that parses the website to satisfy the need for an API.
          </p>

          <h3>API Endpoints Used</h3>
          <div className="endpoint-list">
            <div className="endpoint">
              <h4>Anime Search</h4>
              <code>GET /v4/anime</code>
              <p>Used in the Gallery page for searching and browsing anime titles</p>
            </div>

            <div className="endpoint">
              <h4>Anime Details</h4>
              <code>GET /v4/anime/{'{id}'}</code>
              <p>Fetches detailed information about a specific anime</p>
            </div>

            <div className="endpoint">
              <h4>Character List</h4>
              <code>GET /v4/anime/{'{id}'}/characters</code>
              <p>Retrieves character information for an anime</p>
            </div>

            <div className="endpoint">
              <h4>Episodes</h4>
              <code>GET /v4/anime/{'{id}'}/episodes</code>
              <p>Gets episode list and details</p>
            </div>

            <div className="endpoint">
              <h4>Pictures</h4>
              <code>GET /v4/anime/{'{id}'}/pictures</code>
              <p>Fetches additional images related to the anime</p>
            </div>
          </div>

          <h3>Implementation Details</h3>
          <ul>
            <li>Axios for HTTP requests</li>
            <li>Custom hooks for data fetching and caching</li>
            <li>Error handling and loading states</li>
            <li>Rate limiting compliance</li>
            <li>Response data transformation</li>
          </ul>

          <div className="api-example">
            <h3>Example API Usage</h3>
            <pre>
{`const fetchAnimeDetails = async (id) => {
  try {
    const response = await axios.get(
      \`https://api.jikan.moe/v4/anime/\${id}\`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};`}
            </pre>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>Project Structure</h2>
        <div className="structure">
          <pre>
{`src/
├── components/     # Reusable UI components
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── pages/         # Main route components
├── styles/        # CSS stylesheets
├── utils/         # Helper functions
└── App.jsx        # Root component`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
