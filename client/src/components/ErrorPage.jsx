import { useRouteError } from 'react-router-dom';
import React from 'react';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sowwy, an unexpected error has ocurred</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;