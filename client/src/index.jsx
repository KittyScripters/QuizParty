/* eslint-disable import/no-extraneous-dependencies */
//root render yadda yadda
import React from 'react';

// Import our custom CSS
import './css/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// React 18 + needs createRoot
import { createRoot } from 'react-dom/client';
//import App from app comp to render to root
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import LeaderBoard from './components/LeaderBoard';
import ErrorPage from './components/ErrorPage';
import Play from './components/Play';
import QuestionBuilder from './components/QuestionBuilder';
import { QuestionAddForm, EditExistingQuiz } from './components/questionBuilderComponents';
import Profile from './components/Profile';
import StatsTab from './components/profileTabs/StatsTab';
import AchievementsTab from './components/profileTabs/AchievementsTab';
import QuestionsTab from './components/profileTabs/QuestionsTab';
import FollowersTab from './components/profileTabs/FollowersTab';
import UpdateTab from './components/profileTabs/UpdateTab';

import Login from './components/Login';

//set the container as the element with the id app
const container = document.getElementById('app');
//set the root to be the invocation of createRoot on that element(div id=app)
const root = createRoot(container);

//Use React .render method on the root to pass in the component we want to render (parent aka APP)
root.render(
  <App />,
);