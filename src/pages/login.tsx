import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/toast';
import { toastType } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/spinner';
import { clearError } from '../reducers/authSlice';

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' } as Login);
  const authError = useSelector((state: any) => state.auth.error);

  const [formError, setFormError] = useState({ error: false, message: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);
  const loading = useSelector((state: any) => state.auth.loading);

  if (isLoggedIn) {
    navigate('/dashboard');
  }

  console.log('isLoggedIn', isLoggedIn);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  console.log('form', form);

  const validateForm = () => {
    if (!form.email || !form.password) {
      setFormError({ error: true, message: 'Please fill in all fields' });
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      setFormError({ error: true, message: 'Invalid email address' });
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    dispatch({
      type: 'login/request',
      payload: form
    });
    setForm({ email: '', password: '' });
  };

  const closeToast = () => {
    setFormError({ error: false, message: '' });
    dispatch(clearError());
  };

  return (
    <>
      {formError.error && (
        <Toast
          fn={closeToast}
          toastType={toastType.failure}
          message={formError.message}
        />
      )}

      {authError && (
        <Toast
          fn={closeToast}
          toastType={toastType.failure}
          message={authError}
        />
      )}
      {loading ? (
        <div className="flex items-center h-dvh justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center  flex-col items-center gap-10">
          <div>LOGIN</div>
          <div className="w-96 pt-16 px-10 flex flex-col gap-6  rounded border-grey-600 h-96">
            <div className="relative">
              <input
                type="email"
                name="email"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="password"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg
                  className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                  <circle cx="16.5" cy="7.5" r=".5"></circle>
                </svg>
              </div>
            </div>

            <button
              onClick={onSubmit}
              type="button"
              className="py-2 px-3 inline-flex  justify-center  items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Sign In
            </button>

            <div className="flex items-center gap-4">
              <div>Did't have Acoount ? </div>
              <button
                onClick={() => navigate('/signup')}
                type="button"
                className="py-2 px-3 inline-flex  justify-center  items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
