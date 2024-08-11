// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './login';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Mock the entire react-redux module
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

const mockStore = configureStore([]);
const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

describe('Login Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        error: null,
        isAuthenticated: false,
        loading: false
      }
    });

    // Reset mock dispatch before each test
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should render the login form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText("Did't have Acoount ?")).toBeInTheDocument();
  });

  it('should show validation error messages when form is submitted with empty fields', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Sign In'));

    expect(
      await screen.findByText('Please fill in all fields')
    ).toBeInTheDocument();
  });

  it('should show validation error messages for invalid email', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByText('Sign In'));

    expect(
      await screen.findByText('Invalid email address')
    ).toBeInTheDocument();
  });

  it('should dispatch login/request action on form submission with valid data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByText('Sign In'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'login/request',
      payload: { email: 'test@example.com', password: 'password123' }
    });
  });

  it('should navigate to dashboard if already authenticated', () => {
    store = mockStore({
      auth: {
        error: null,
        isAuthenticated: true,
        loading: false
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should show spinner when loading', () => {
    store = mockStore({
      auth: {
        error: null,
        isAuthenticated: false,
        loading: true
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument(); // Adjust if you have a specific role or test for spinner visibility
  });
});
