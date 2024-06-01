import React from 'react';
import { ScatterChart, Scatter, Tooltip, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { darkTheme } from '../theme';

const ScatterChartSection = ({ data }) => (
  <div style={{ marginBottom: "40px", fontFamily: "Arial, sans-serif" }}>
  <h2 style={{ color: darkTheme.color, textAlign: "center" }}>Top Source IPs</h2>
  <p style={{...styles.description, textAlign: 'center'}} >

      The scatter plot displays the top source IP addresses that generated the most alerts. Hover over the points to see the exact number of alerts for each IP address.
    </p>
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid stroke="#444" />
        <XAxis type="category" dataKey="name" stroke="#fff" />
        <YAxis type="number" dataKey="value" stroke="#fff" />
        <Tooltip
          formatter={(value, name) => [`${value} `, ` ${name}`]}
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Legend />
        <Scatter name="Source IPs" data={data} fill={darkTheme.chartColors.srcIp} />
      </ScatterChart>
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

export default ScatterChartSection;
