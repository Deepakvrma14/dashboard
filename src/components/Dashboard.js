import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import { Table } from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,

  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,

} from "recharts";

const Dashboard = () => {
  const { data, loading } = useFetchData("/data/eve.json");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  data.sort((a, b) => {
    const severityA = a.alert ? a.alert.severity : 0;
    const severityB = b.alert ? b.alert.severity : 0;
    return severityA - severityB;
  });

  const protocolData = data.reduce((acc, item) => {
    const proto = item.proto;
    acc[proto] = (acc[proto] || 0) + 1;
    return acc;
  }, {});

  const srcIpData = data.reduce((acc, item) => {
    const src_ip = item.src_ip;
    acc[src_ip] = (acc[src_ip] || 0) + 1;
    return acc;
  }, {});

  const destIpData = data.reduce((acc, item) => {
    const dest_ip = item.dest_ip;
    acc[dest_ip] = (acc[dest_ip] || 0) + 1;
    return acc;
  }, {});

  const alertCategoryData = data.reduce((acc, item) => {
    if (item.alert) {
      const category = item.alert.category;
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  const formatDataForChart = (dataObj) => {
    const total = Object.values(dataObj).reduce((sum, value) => sum + value, 0);
    return Object.entries(dataObj).map(([key, value]) => ({
      name: key,
      value,
      percentage: ((value / total) * 100).toFixed(2),
    }));
  };

  const topSrcIpData = Object.entries(srcIpData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const columns = [
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
    { title: "Source IP", dataIndex: "src_ip", key: "src_ip" },
    { title: "Destination IP", dataIndex: "dest_ip", key: "dest_ip" },
    { title: "Event Type", dataIndex: "event_type", key: "event_type" },
    { title: "Protocol", dataIndex: "proto", key: "proto" },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#1e1e1e", color: "#fff" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Network Alert Dashboard</h1>
      </div>

      

      <div style={{ marginBottom: "40px" }}>
        <h2>Source IPs</h2>
        <p>
          The scatter plot shows the top source IP addresses that generated the
          most alerts.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid stroke="#444" />
            <XAxis type="category" dataKey="name" stroke="#fff" />
            <YAxis type="number" dataKey="value" stroke="#fff" />
            <Tooltip
              formatter={(value, name) => [
                `${value} alerts`,
                `Source IP: ${name}`,
              ]}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Legend />
            <Scatter
              name="Source IPs"
              data={formatDataForChart(topSrcIpData)}
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>Destination IPs</h2>
        <p>
          This line chart shows the number of alerts received by the top
          destination IP addresses.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatDataForChart(destIpData)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              formatter={(value, name) => [
                `${value} alerts`,
                `Destination IP: ${name}`,
              ]}
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>Alerts by Category</h2>
        <p>
          The radar chart visualizes the number of alerts for each alert
          category.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={formatDataForChart(alertCategoryData)}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" stroke="#fff" />
            <PolarRadiusAxis stroke="#fff" />
            <Radar
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value, name) => [`${value} alerts`, `${name}`]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>Alerts by Protocol</h2>
        <p>
          This bar chart displays the number of alerts for each network protocol
          used.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatDataForChart(protocolData)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              formatter={(value, name) => [
                `${value} alerts`,
                `Protocol: ${name}`,
              ]}
            />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px", color: "#fff" }}>
        <h2>Alert Details</h2>
        <p>This table shows the details of each alert.</p>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          style={{
            backgroundColor: "#fff",
            color: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #ddd",
            boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
