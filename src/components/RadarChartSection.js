import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { darkTheme } from '../theme';

const RadarChartSection = ({ data }) => (
  <div style={{ marginBottom: "40px", fontFamily: "Arial, sans-serif" }}>
  <h2 style={{ color: darkTheme.color, textAlign: "center" }}>Alerts by Category</h2>
  <p style={{...styles.description, textAlign: 'center'}} >
      The radar chart visualizes the number of alerts for each category. Categories help in understanding the types of threats and their frequency.
    </p>
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" stroke="#fff" />
        <PolarRadiusAxis stroke="#fff" />
        <Radar dataKey="value" stroke={darkTheme.chartColors.category} fill={darkTheme.chartColors.category} fillOpacity={0.6} />
        <Tooltip formatter={(value, name) => [`${value} alerts`, `${name}`]} />
      </RadarChart>
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

export default RadarChartSection;
