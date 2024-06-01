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
  background: "#121212",
  color: "#ffffff",
  chartColors: {
    srcIp: "#8884d8",
    destIp: "#82ca9d",
    category: "#ffc658",
    protocol: "#ff7300",
  },
  tableBackground: "#1e1e1e",
};
