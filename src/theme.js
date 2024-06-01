// src/theme.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #ffffff;
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const darkTheme = {
  background: '#1e1e1e',
  color: '#e0e0e0',
  tableBackground: '#2e2e2e',
  headerBackground: '#3e3e3e',
  borderColor: '#444',
  chartColors: {
    srcIp: '#82ca9d',
    destIp: '#8884d8',
    category: '#ffc658',
    protocol: '#d0ed57',
  },
  color1: "#EDEDED",
  tableBackground1: "#2C2C2C",
  headerBackground1: "#1A1A1A",
  rowEven: "#333333",
  rowOdd: "#2C2C2C",
  expandedRow: "#1A1A1A",
  expandedRowBackground: "#333333",
  borderColor1: "#4A4A4A",
  
};


