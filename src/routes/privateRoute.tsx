import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children
}) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);

  return isLoggedIn ? children : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;
