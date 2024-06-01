import React, { useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import Header from './Header';
import ScatterChartSection from './ScatterChartSection';
import LineChartSection from './LineChartSection';
import RadarChartSection from './RadarChartSection';
import BarChartSection from './BarChartSection';
import AlertDetailsTable from './AlertDetailsTable';
import Pagination from './Pagination';
import { darkTheme } from '../theme';

const Dashboard = () => {
  const { data, loading } = useFetchData('/data/eve.json');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const sortedData = [...data].sort((a, b) => {
    const severityA = a && a.alert ? a.alert.severity : 0;
    const severityB = b && b.alert ? b.alert.severity : 0;
    return severityB - severityA;
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
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={styles.container}>
      <Header />
      <ScatterChartSection data={formatDataForChart(topSrcIpData)} />
      <LineChartSection data={formatDataForChart(destIpData)} />
      <RadarChartSection data={formatDataForChart(alertCategoryData)} />
      <BarChartSection data={formatDataForChart(protocolData)} />
      <AlertDetailsTable data={currentData} isMobile={isMobile} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: darkTheme.background,
    color: darkTheme.color,
  },
};

export default Dashboard;
