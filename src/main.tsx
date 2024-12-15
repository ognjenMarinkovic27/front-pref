import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router';
import Browser from './pages/browser/Browser.tsx';
import Game from './pages/game/Game.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Browser />} />
            <Route path="game" element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ThemePanel />
    </Theme>
  </StrictMode>,
)
