import { Outlet, Navigate, useLoaderData } from 'react-router-dom';
import React from 'react';
import NavBar from './NavBar';

const PrivateRoutes = () => {
  //create a loader const that uses the useLoaderData hook
  const loader = useLoaderData();
  // set auth to be a boolean that is the value of the loader, if the user is logged in, 
  // auth will be true
  const auth = { isAuthenticated: loader };
  return (
    <div>
      {auth.isAuthenticated ? (
        <div>
          {/* render navbar here so it renders in the same place for all comps */}
          
          {/* render outlet here so that the comps render in the same place */}
          <Outlet />
        </div>
      )
      // if the user is not logged in, redirect to the login page
        : <Navigate to="/" />}
    </div>
  );
};

export default PrivateRoutes;