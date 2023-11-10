import { Outlet, Navigate, useLoaderData } from 'react-router-dom';
import React from 'react';

const PrivateRoutes = () => {
  //create a loader const that uses the useLoaderData hook
  const loader = useLoaderData();
  // set auth to be a boolean that is the value of the loader, if the user is logged in, 
  // auth will be true
  const auth = { isAuthenticated: loader };
  return (
    <div>
      {auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default PrivateRoutes;