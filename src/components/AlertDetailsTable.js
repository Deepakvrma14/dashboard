import React, { useState, useEffect } from "react";
import { darkTheme } from "../theme";



const AlertDetailsTable = ({ data, isMobile }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Reset expandedRow whenever data changes
  useEffect(() => {
    setExpandedRow(null);
  }, [data]);

  return (
    <div style={{ marginBottom: "40px", fontFamily: "Arial, sans-serif" }}>
    <h2 style={{ color: darkTheme.color, textAlign: "center" }}>
      Alert Details (Click to Expand/Collapse)
    </h2>
    <p style={{ color: darkTheme.color, textAlign: "center", fontSize: isMobile ? '14px' : '16px' }}>
      {isMobile ? 
        'This table provides information about the severity and time of each alert.' :
        'This table provides detailed information about each alert, including timestamp, source IP, destination IP, event type, and protocol used.'
      }
    </p>
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: darkTheme.tableBackground,
          color: darkTheme.color,
          boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
          margin: "auto",
        }}
      >
          <thead>
            <tr style={{ backgroundColor: darkTheme.headerBackground }}>
              <th
                style={{
                  padding: "25px",
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
                  Flow ID
                </th>
              )}
              {!isMobile && (
                <th
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
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
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "15px",
                    borderBottom: `1px solid ${darkTheme.borderColor}`,
                    textAlign: "left",
                  }}
                >
                  Destination IP
                </th>
              )}
              {!isMobile && (
                <th
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "15px",
                    borderBottom: `1px solid ${darkTheme.borderColor}`,
                    textAlign: "left",
                  }}
                >
                  Protocol
                </th>
              )}
              <th
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                  padding: "15px",
                  borderBottom: `1px solid ${darkTheme.borderColor}`,
                  textAlign: "left",
                }}
              >
                Severity
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((alert, index) => (
              <React.Fragment key={index}>
                <tr
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      index % 2 === 0 ? darkTheme.rowEven : darkTheme.rowOdd,
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(index)}
                >
                  <td
                    style={{
                    alignItems: "center",
                    justifyContent: "center",
                      padding: "10px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                    }}
                  >
                    {alert.timestamp}
                  </td>
                  {!isMobile && (
                    <td
                      style={{
                    alignItems: "center",
                    justifyContent: "center",
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {alert.flow_id}
                    </td>
                  )}
                  {!isMobile && (
                    <td
                      style={{
                    alignItems: "center",
                    justifyContent: "center",
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {alert.src_ip}
                    </td>
                  )}
                  {!isMobile && (
                    <td
                      style={{
                    alignItems: "center",
                    justifyContent: "center",
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {alert.dest_ip}
                    </td>
                  )}
                  {!isMobile && (
                    <td
                      style={{
                    alignItems: "center",
                    justifyContent: "center",
                    
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      {alert.proto}
                    </td>
                  )}
                  <td
                    style={{
                    alignItems: "center",
                    justifyContent: "center",
                      padding: "10px",
                      borderBottom: `1px solid ${darkTheme.borderColor}`,
                    }}
                  >
                    {alert.alert ? alert.alert.severity : "N/A"}
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr style={{
                    alignItems: "center",
                    justifyContent: "center", backgroundColor: darkTheme.expandedRow }}>
                    <td
                      colSpan={isMobile ? 5 : 6}
                      style={{
                    alignItems: "center",
                    justifyContent: "center",
                        padding: "10px",
                        borderBottom: `1px solid ${darkTheme.borderColor}`,
                      }}
                    >
                      <div
                        style={{
                    alignItems: "center",
                    justifyContent: "center",
                          padding: "20px",
                          backgroundColor: darkTheme.expandedRowBackground,
                          borderRadius: "10px",
                          margin: "10px auto",
                          maxWidth: "80%",
                        }}
                      >
                        <p>
                          <strong>Action:</strong>{" "}
                          {alert.alert?.action || "N/A"}
                        </p>
                        <p>
                          <strong>GID:</strong> {alert.alert?.gid || "N/A"}
                        </p>
                        <p>
                          <strong>Signature ID:</strong>{" "}
                          {alert.alert?.signature_id || "N/A"}
                        </p>
                        <p>
                          <strong>Signature:</strong>{" "}
                          {alert.alert?.signature || "N/A"}
                        </p>
                        <p>
                          <strong>Category:</strong>{" "}
                          {alert.alert?.category || "N/A"}
                        </p>
                        <p>
                          <strong>Payload:</strong>{" "}
                          {alert.payload_printable || "N/A"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  rowEven: {
    backgroundColor: darkTheme.rowEven,
  },
  rowOdd: {
    backgroundColor: darkTheme.rowOdd,
  },
  expandedRow: {
    backgroundColor: darkTheme.expandedRow,
  },
  expandedRowBackground: {
    backgroundColor: darkTheme.expandedRowBackground,
  },
};

export default AlertDetailsTable;
