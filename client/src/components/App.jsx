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
import QuestionAddForm from './questionBuilderComponents/questionAddForm';
import EditExistingQuiz from './questionBuilderComponents/editExistingQuiz';
import AchievementsTab from './profileTabs/AchievementsTab';
import FollowersTab from './profileTabs/FollowersTab';
import QuestionsTab from './profileTabs/QuestionsTab';
import UpdateTab from './profileTabs/UpdateTab';
import StatsTab from './profileTabs/StatsTab';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}> 
          <Route path="/protected" index element={<LeaderBoard />} />
          <Route path="/protected/leaderboard" element={<LeaderBoard />} />
          <Route path="/protected/profile" element={<Profile />}>
            <Route path="statstab" element={<StatsTab />} />
            <Route path="achievementstab" element={<AchievementsTab />} />
            <Route path="followerstab" element={<FollowersTab />} />
            <Route path="questionstab" element={<QuestionsTab />} />
            <Route path="updatetab" element={<UpdateTab />} />
          </Route>
          <Route path="/protected/play" element={<Play />} />
          <Route path="/protected/question-builder" element={<QuestionBuilder />}>
            <Route path="addQuestion" element={<QuestionAddForm />} />
            <Route path="existingQuizzes" element={<EditExistingQuiz />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;