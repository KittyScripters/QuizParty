/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-style */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Link,
  BrowserRouter,
  Routes,
} from 'react-router-dom';

import NavBar from './NavBar';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import Logout from './Logout';
import RootLayout from './Layouts/RootLayout';
import Login from './Login';
import PrivateRoutes from './PrivateRoutes';

const App = () => {
  const [view, setView] = useState('Login');
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}> 
          <Route path="/protected/leaderboard" index element={<LeaderBoard />} />
          <Route path="/protected/profile" element={<Profile />} />
          <Route path="/protected/play" element={<Play />} />
          <Route path="/protected/question-builder" element={<QuestionBuilder />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;