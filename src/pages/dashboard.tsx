import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { listUser } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import {User} from "../reducers/userSlice"


import Spinner from '../components/spinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.user.loading);
  const error = useSelector((state: any) => state.user.error);
  const users = useSelector((state: any) => state.user.user);

  useEffect(() => {
    async function getUsers() {
      dispatch({ type: 'fetchUser/request' });
    }
    getUsers();
  }, []);

  const logoutRequest = () => {
    dispatch({ type: 'logout/request' });
  };

  return loading ? (
    <div className="flex items-center h-dvh justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="flex flex-col border-2 items-center gap-10 h-dvh">
      <div>DashBoard</div>
      <div className="flex gap-8 justify-center flex-wrap">
        {users.map((item: User) => (
          <div className="flex flex-col items-center">
            <img src={item.avatar} />
            <div>
              {item.first_name} {item.last_name}
            </div>
          </div>
        ))}
      </div>
      <button onClick={logoutRequest}>Logout</button>
    </div>
  );
};

export default Dashboard;
