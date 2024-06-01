import React from 'react';
import { darkTheme } from '../theme';

const Header = () => (
  <div style={styles.container}>
    <span role="img" aria-label="alert" style={styles.emoji}>🚨</span>
    <h1 style={styles.title}>Network Alert Dashboard</h1>
    <p style={styles.description}>
      Gain comprehensive insights into network alerts generated from various sources and destination IPs, categorized by alert types and protocols used.
    </p>
  </div>
);

const styles = {
  container: {
    textAlign: 'center',
    marginBottom: '40px',
    backgroundColor: darkTheme.background,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  emoji: {
    fontSize: '50px',
    display: 'block',
    marginBottom: '20px',
  },
  title: {
    color: darkTheme.primaryColor,
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '3em',
    margin: '0 0 10px',
  },
  description: {
    color: darkTheme.secondaryColor,
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '1.2em',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default Header;
