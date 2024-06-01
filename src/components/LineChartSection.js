import React from 'react';
import { LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { darkTheme } from '../theme';

const LineChartSection = ({ data }) => (
  <div style={{ marginBottom: "40px", fontFamily: "Arial, sans-serif" }}>
    <h2 style={{ color: darkTheme.color, textAlign: "center" }}>Top Destination IPs</h2>
    <p style={{...styles.description, textAlign: 'center'}} >
      This line chart shows the number of alerts received by the top destination IP addresses. Hover over the lines to see the detailed alert counts.
    </p>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip formatter={(value, name) => [`${value} alerts`, `${name}`]} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={darkTheme.chartColors.destIp} />
      </LineChart>
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

export default LineChartSection;
