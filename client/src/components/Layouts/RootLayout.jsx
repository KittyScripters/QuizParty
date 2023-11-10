import { Route, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import React from 'react';
import NavBar from '../NavBar';

const RootLayout = () => {
  return (
    <div>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};
export default RootLayout;