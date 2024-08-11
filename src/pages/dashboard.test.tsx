//@ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Dashboard from '../pages/dashboard';
import { store as RootState } from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

describe('Dashboard Component', () => {
  let store: MockStoreEnhanced<typeof RootState>;

  beforeEach(() => {
    store = mockStore({
      user: {
        loading: false,
        error: null,
        user: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            avatar: 'https://example.com/avatar1.png'
          },
          {
            id: 2,
            first_name: 'Jane',
            last_name: 'Doe',
            avatar: 'https://example.com/avatar2.png'
          }
        ]
      }
    });

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render the user list when loading is false', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('DashBoard')).not.toBeNull();
    expect(screen.getByText('John Doe')).not.toBeNull();
    expect(screen.getByText('Jane Doe')).not.toBeNull();
  });

  it('should dispatch fetchUser/request on component mount', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchUser/request' });
  });

  it('should dispatch logout/request when logout button is clicked', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    fireEvent.click(screen.getByText('Logout'));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'logout/request' });
  });
});
