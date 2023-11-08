//root render yadda yadda
import React from 'react';
// React 18 + needs createRoot
import { createRoot } from 'react-dom/client';
//import App from app comp to render to root
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import LeaderBoard from './components/LeaderBoard';
import ErrorPage from './components/ErrorPage';
import Play from './components/Play';
import QuestionBuilder from './components/QuestionBuilder';
import Profile from './components/Profile';
import StatsTab from './components/profileTabs/StatsTab';
import Login from './components/Login';
import Logout from './components/Logout';
//set the container as the element with the id app
const container = document.getElementById('app');
//set the root to be the invocation of createRoot on that element(div id=app)
const root = createRoot(container);
//define routes
const routes = [
  {
    path: '/protected/leaderboard',
    element: <LeaderBoard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/protected/play',
    element: <Play />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/protected/question-builder',
    element: <QuestionBuilder />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/protected/profile',
    element: <Profile />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'profile/stats-tab',
        element: <StatsTab />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/protected',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/logout',
    element: <Logout />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];
const router = createBrowserRouter(routes);

//Use React .render method on the root to pass in the component we want to render (parent aka APP)
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);