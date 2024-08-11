// middleware/apiMiddleware.js
import { Middleware } from '@reduxjs/toolkit';
import { login, signup, listUser } from '../api';
import {
  loginSuccess,
  loginFailure,
  loginRequest,
  registerRequest,
  registerFailure,
  registerSuccess,
  logout
} from '../reducers/authSlice';

import {
  fetchUserRequest,
  fetchUser,
  fetchUserFailture
} from '../reducers/userSlice';

interface LoginRequestAction {
  type: 'login/request';
  payload: {
    email: string;
    password: string;
  };
}

interface LoginSuccessAction {
  type: 'login-success';
  payload: {
    token: string;
    user: {
      id: number;
      name: string;
    };
  };
}

interface LoginFailureAction {
  type: 'login-failure';
  payload: Error;
}

interface LogoutRequestAction {
  type: 'logout/request';
}

interface LogoutSuccessAction {
  type: 'logout-success';
}

interface LogoutFailureAction {
  type: 'logout-failure';
  payload: Error;
}

const apiMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type === 'login/request') {
    store.dispatch(loginRequest());
    const { email, password } = (action as LoginRequestAction).payload;
    console.log('email', email, password);
    return login({ email, password })
      .then((data) => {
        console.log('Data', data);
        store.dispatch(loginSuccess(data));
      })
      .catch((error) => {
        store.dispatch(loginFailure(error.message));
      });
  }

  if (action.type === 'logout/request') {
    return store.dispatch(logout());
  }
  if (action.type === 'register/request') {
    store.dispatch(registerRequest()); // Set loading state to true
    const { email, password } = (action as LoginRequestAction).payload;

    return signup({ email, password })
      .then((data) => {
        store.dispatch(registerSuccess(data));
      })
      .catch((error) => {
        store.dispatch(registerFailure(error.message));
      });
  }

  if (action.type === 'fetchUser/request') {
    store.dispatch(fetchUserRequest());

    return listUser()
      .then((data) => {
        console.log("list user",data)
        store.dispatch(fetchUser(data.data));
      })
      .catch((error) => {
        store.dispatch(fetchUserFailture(error.message));
      });
  }

  return next(action);
};

export default apiMiddleware;
