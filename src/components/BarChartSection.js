import React from 'react';
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { darkTheme } from '../theme';

const BarChartSection = ({ data }) => (
  <div style={{ marginBottom: "40px", fontFamily: "Arial, sans-serif" }}>
  <h2 style={{ color: darkTheme.color, textAlign: "center" }}>
    Alerts by Protocol</h2>
    <p style={{...styles.description, textAlign: 'center'}} >
      This bar chart displays the number of alerts for each network protocol used. Understanding the protocols involved can help in identifying the nature of the traffic.
    </p>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#888" />
        <XAxis dataKey="name" stroke="#ddd" />
        <YAxis stroke="#ddd" />
        <Tooltip formatter={(value, name) => [`${value} alerts`, ` ${name}`]} />
        <Legend />
        <Bar dataKey="value" fill={darkTheme.chartColors.protocol} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const styles = {
  section: {
    marginBottom: '40px',
  },
  title: {
    color: darkTheme.color,
  },
  description: {
    color: darkTheme.color,
  },
};

export default BarChartSection;
