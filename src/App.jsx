import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Todo from './Components/Todo';
import Settings from './Components/Settings';
import { SettingsProvider } from './Context/SettingsContext';
import { MantineProvider } from '@mantine/core';
import './App.css';

export default class App extends React.Component {
    render() {
      return (
        <MantineProvider>  {/* <-- Wrap your application with MantineProvider */}
          <SettingsProvider>
            <Router>
                <nav>
                    <Link to="/">Todo</Link>
                    <Link to="/settings">Settings</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Todo />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Router>
          </SettingsProvider>
        </MantineProvider>
      );
    }
  }

