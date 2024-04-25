import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
// import Home from './pages/Home';
import About from './pages/About';
import Connect4 from './pages/Connect4';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/connect4",
    element: <Connect4 />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
