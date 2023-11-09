import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoutes = () => {
  const auth = { isAuthenticated: false };
  return (
    <div>
      {auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default PrivateRoutes;