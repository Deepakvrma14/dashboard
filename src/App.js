// src/App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, darkTheme } from './theme';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
