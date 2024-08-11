import axios from 'axios';
import { constant } from '../constants';

const baseUrl = constant.BASE_URL;

export const login = async (data: {}) => {
  try {
    const request = await axios.post(`${baseUrl}/api/login`, data);
    return request.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const signup = async (data: {}) => { 
  try {
    const request = await axios.post(`${baseUrl}/api/register`, data);
    return request.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export const listUser = async () => {
  try {
    const request = await axios.get(`${baseUrl}/api/users`);
    return request.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};


