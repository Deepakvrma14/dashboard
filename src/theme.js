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
    severity: "#ff4757",
    protocol: "#1e90ff",
    srcIp: "#fffa65",
    destIp: "#2ed573",
    category: "#ffa502",
  },
};
