import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import PrivateRoute from './routes/privateRoute';
import Login from './pages/login';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
