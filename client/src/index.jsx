//root render yadda yadda
import React from 'react';

// Import our custom CSS
import './css/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// React 18 + needs createRoot
import { createRoot } from 'react-dom/client';
//import App from app comp to render to root
import App from './components/App';
//set the container as the element with the id app
const container = document.getElementById('app');
//set the root to be the invocation of createRoot on that element
const root = createRoot(container);

//Use React .render method on the root to pass in the component we want to render (parent aka APP)
root.render(<App />);