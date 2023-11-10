import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoutes = () => {
  // hook up with auth later
  const auth = { isAuthenticated: true };
  return (
    <div>
      {auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default PrivateRoutes;