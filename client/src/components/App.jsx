/* eslint-disable import/no-extraneous-dependencies */
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
  Routes,
  useLoaderData,
} from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import RootLayout from './Layouts/RootLayout';
import Login from './Login';
import PrivateRoutes from './PrivateRoutes';
import QuestionAddForm from './questionBuilderComponents/questionAddForm';
import YourQuizzes from './questionBuilderComponents/yourQuizzes';
import AchievementsTab from './profileTabs/AchievementsTab';
import FollowersTab from './profileTabs/FollowersTab';
import QuestionsTab from './profileTabs/QuestionsTab';
import UpdateTab from './profileTabs/UpdateTab';
import StatsTab from './profileTabs/StatsTab';

const App = () => {
  const getUserLoader = async () => {
    try {
      const response = await axios.get('/api/current-user');
      return response.data;
    } catch (err) {
      console.error(err);
      throw (err);
    }
  };
  // need loader to pass to private routes to check if user is logged in
  const isLoggedInLoader = async () => {
    try {
      // send a get req to the isLoggedIn endpoint
      const response = await axios.get('/api/isLoggedIn');
      // console.log('logged in loader', response.data);
      // return the response data which is a boolean
      return response.data;
      // catch error handling
    } catch (err) {
      console.error(err);
      throw (err);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PrivateRoutes />} loader={isLoggedInLoader}>
          <Route path="/protected" index element={<LeaderBoard />} loader={getUserLoader} />
          <Route path="/protected/leaderboard" element={<LeaderBoard />} loader={getUserLoader} />

          <Route path="/protected/profile" element={<Profile />} loader={getUserLoader}>
            <Route path="statstab" element={<StatsTab />} />
            <Route path="achievementstab" element={<AchievementsTab />} />
            <Route path="followerstab" element={<FollowersTab />} />
            <Route path="questionstab" element={<QuestionsTab />} />
            <Route path="updatetab" element={<UpdateTab />} />
          </Route>
          <Route path="/protected/play" element={<Play />} loader={getUserLoader} />
          <Route path="/protected/question-builder" element={<QuestionBuilder />}>
            <Route path="addQuestion" element={<QuestionAddForm />} />
            <Route path="yourQuizzes" element={<YourQuizzes />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Route>,
    ),
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;