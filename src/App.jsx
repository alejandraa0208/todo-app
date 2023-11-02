import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Todo from './Components/Todo';
import Settings from './Components/Settings';
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login';
import LoginContext from './Context/auth/Context';
import { SettingsProvider } from './Context/SettingsContext';
import { MantineProvider } from '@mantine/core';
import './App.css';

export default class App extends React.Component {
    render() {
      return (
        <MantineProvider>
        <SettingsProvider>
          <LoginContext>
            <Router>
                <nav>
                    <Login />
                    <Link to="/">To Do</Link>
                    <Link to="/settings">Settings</Link>
                </nav>
                <Routes>
                <Route 
                      path="/" 
                      element={
                        <Auth capability="read">
                          <Todo />
                        </Auth>
                      } 
                    />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Router>
          </LoginContext>
        </SettingsProvider>
      </MantineProvider>
      );
    }
  }

