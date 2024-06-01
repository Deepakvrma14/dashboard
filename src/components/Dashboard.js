import React, { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
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
import { darkTheme } from "../theme";

const Dashboard = () => {
  const { data, loading } = useFetchData("/data/eve.json");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768);
    });
  }, []);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: darkTheme.background,
        color: darkTheme.color,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span role="img" aria-label="dashboard" style={{ fontSize: "50px" }}>
          📊
        </span>
        <h1
          style={{
            color: darkTheme.color,
            fontFamily: "Arial, sans-serif",
            fontSize: "2.5em",
          }}
        >
          Network Alert Dashboard
        </h1>
        <p style={{ color: darkTheme.color, fontFamily: "Arial, sans-serif" }}>
          This dashboard provides insights into network alerts generated from
          various source and destination IPs, categorized by alert types and
          protocols used.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: darkTheme.color }}>Top Source IPs</h2>
        <p style={{ color: darkTheme.color }}>
          The scatter plot displays the top source IP addresses that generated
          the most alerts. Hover over the points to see the exact number of
          alerts for each IP address.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid stroke="#444" />
            <XAxis type="category" dataKey="name" stroke="#fff" />
            <YAxis type="number" dataKey="value" stroke="#fff" />
            <Tooltip
              formatter={(value, name) => [
                `${value} `,
                ` ${name}`,
              ]}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Legend />
            <Scatter
              name="Source IPs"
              data={formatDataForChart(topSrcIpData)}
              fill={darkTheme.chartColors.srcIp}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: darkTheme.color }}>Top Destination IPs</h2>
        <p style={{ color: darkTheme.color }}>
          This line chart shows the number of alerts received by the top
          destination IP addresses. Hover over the lines to see the detailed
          alert counts.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatDataForChart(destIpData)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              formatter={(value, name) => [
                `${value} alerts`,
                `${name}`,
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={darkTheme.chartColors.destIp}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: darkTheme.color }}>Alerts by Category</h2>
        <p style={{ color: darkTheme.color }}>
          The radar chart visualizes the number of alerts for each category.
          Categories help in understanding the types of threats and their
          frequency.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={formatDataForChart(alertCategoryData)}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" stroke="#fff" />
            <PolarRadiusAxis stroke="#fff" />
            <Radar
              dataKey="value"
              stroke={darkTheme.chartColors.category}
              fill={darkTheme.chartColors.category}
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value, name) => [`${value} alerts`, `${name}`]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: darkTheme.color }}>Alerts by Protocol</h2>
        <p style={{ color: darkTheme.color }}>
          This bar chart displays the number of alerts for each network protocol
          used. Understanding the protocols involved can help in identifying the
          nature of the traffic.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formatDataForChart(protocolData)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#888" />
            <XAxis dataKey="name" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip
              formatter={(value, name) => [
                `${value} alerts`,
                ` ${name}`,
              ]}
            />
            <Legend />
            <Bar dataKey="value" fill={darkTheme.chartColors.protocol} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: darkTheme.color }}>Alert Details</h2>
        <p style={{ color: darkTheme.color }}>
          This table provides detailed information about each alert, including
          timestamp, source IP, destination IP, event type, and protocol used.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: darkTheme.tableBackground,
              color: darkTheme.color,
              boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: darkTheme.headerBackground }}>
                <th
                  style={{
                    padding: "15px",
                    borderBottom: `1px solid ${darkTheme.borderColor}`,
                    textAlign: "left",
                  }}
                >
                  Timestamp
                </th>
                {!isMobile && (
                  <th
                    style={{
                      padding: "15px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                      textAlign: "left",
                    }}
                  >
                    Source IP
                  </th>
                )}
                {!isMobile && (
                  <th
                    style={{
                      padding: "15px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                      textAlign: "left",
                    }}
                  >
                    Destination IP
                  </th>
                )}
                <th
                  style={{
                    padding: "15px",
                    borderBottom: `1px solid ${darkTheme.borderColor}`,
                    textAlign: "left",
                  }}
                >
                  Event Type
                </th>
                {!isMobile && (
                  <th
                    style={{
                      padding: "15px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                      textAlign: "left",
                    }}
                  >
                    Protocol
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                    }}
                  >
                    {item.timestamp}
                  </td>
                  {!isMobile && (
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {item.src_ip}
                    </td>
                  )}
                  {!isMobile && (
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {item.dest_ip}
                    </td>
                  )}
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                    }}
                  >
                    {item.event_type}
                  </td>
                  {!isMobile && (
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {item.proto}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              backgroundColor: currentPage === 1 ? "#888" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <div style={{ color: darkTheme.color, padding: "10px" }}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "10px 15px",
              backgroundColor: currentPage === totalPages ? "#888" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
