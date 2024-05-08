import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Connect4 from './pages/Connect4';
import HowToPlay from './pages/HowToPlay';
import Connect4PvP from './components/Connect4PvP';
import Connect4MinMax from './components/Connect4MinMax';
import Connect4AlphaBeta from './components/Connect4AlphaBeta';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/connect4",
    element: <Connect4 />
  },
  {
    path: "/howtoplay",
    element: <HowToPlay />
  },
  {
    path: "/connect4pvp",
    element: <Connect4PvP />
  },
  {
    path: "/connect4minmax",
    element: <Connect4MinMax />
  },
  {
    path: "/connect4alphabeta",
    element: <Connect4AlphaBeta />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
