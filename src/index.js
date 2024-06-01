import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import DefaultContext from './context/context_default';

import Home from './pages/home/home'
import DeckList from './pages/deckList';
import UparCardfa from './pages/uparCards';
import ErrorPage from './pages/error404';
import Login from './pages/login';
import CreatAcount from './pages/createAcount';
import ListaCards from './pages/listaCards/listaCards';
import CardDetail from './pages/cardDetail';
import DeckBuild from './pages/deckBuild';
import DeckCommunit from './pages/deckCommunit';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '20px',
  // you can also just use 'scale'
  transition: transitions.FADE,
  containerStyle: {
    zIndex: 100

  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    { path: "/", element: <ListaCards /> },
    { path: "/deck-list", element: <DeckList /> },
    { path: "/deck-communit", element: <DeckCommunit /> },
    { path: "/deck-build", element: <DeckBuild /> },
    { path: "/edita-deck", element: <DeckBuild editar={true} /> },
    { path: "/list", element: <ListaCards /> },
    { path: "/up-card", element: <UparCardfa /> },
    { path: "/detail/:id", element: <CardDetail /> },
  ]
},
{ path: '/login', element: <Login /> },
{ path: '/creat-acount', element: <CreatAcount />, }
])

root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <DefaultContext>

        <RouterProvider router={router} />

      </DefaultContext>
    </AlertProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
