import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import GamesPage from './components/games/GamesPage.tsx';
import './index.css';

// front-page.php gives #root; page-games.php gives #forthexp-games-root. Other pages give neither.
const appRoot = document.getElementById('root');
if (appRoot) {
  createRoot(appRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const gamesRoot = document.getElementById('forthexp-games-root');
if (gamesRoot) {
  createRoot(gamesRoot).render(
    <StrictMode>
      <GamesPage />
    </StrictMode>,
  );
}
