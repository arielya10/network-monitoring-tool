import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PacketLineChart = ({ packets, clearGraph }) => {
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });

  // Define colors for different protocols
  const protocolColors = {
    'ARP': '#FF6384',
    'HTTPS': '#36A2EB',
    'DNS': '#FFCE56',
    'ICMP': '#4BC0C0',
    'HTTP': '#23C48E',
    'SSL/TLS': '#845EC2',
    'NTP': '#D65DB1',
    'Other': '#9966FF'
  };

  // Function to identify the protocol of a packet
  const identifyProtocol = (packet) => {
    if (packet.includes('ARP')) return 'ARP';
    if (packet.includes('TCP') && packet.includes('https')) return 'HTTPS';
    if (packet.includes('UDP') && packet.includes('DNS')) return 'DNS';
    if (packet.includes('ICMP')) return 'ICMP';
    if (packet.includes('HTTP ')) return 'HTTP'; // Look for HTTP specifically
    if (packet.includes('SSL') || packet.includes('TLS')) return 'SSL/TLS';
    if (packet.includes('NTP')) return 'NTP';
    return 'Other';
  };

  // Update graph data when packets change or graph is cleared
  useEffect(() => {
    if (clearGraph) {
      setGraphData({ labels: [], datasets: [] });
      return;
    }

    // Count the new packets for each protocol
    const newProtocolsCount = packets.reduce((count, packet) => {
      const protocol = identifyProtocol(packet);
      count[protocol] = (count[protocol] || 0) + 1;
      return count;
    }, {});

    // Create or update datasets for each protocol
    const newDatasets = Object.keys(protocolColors).map(protocol => {
      const existingDataset = graphData.datasets.find(ds => ds.label === protocol);
      const newData = existingDataset ? [...existingDataset.data, newProtocolsCount[protocol] || 0] : [newProtocolsCount[protocol] || 0];
      
      return {
        label: protocol,
        data: newData,
        borderColor: protocolColors[protocol],
        backgroundColor: `${protocolColors[protocol]}66`,
        fill: true,
        pointRadius: 0
      };
    });

    // Update the chart data
    setGraphData(prevGraphData => ({
      labels: [...prevGraphData.labels, new Date().toLocaleTimeString()],
      datasets: newDatasets
    }));
  }, [packets, clearGraph]);

  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: { autoSkip: true, maxRotation: 0, minRotation: 0, padding: 1, maxTicksLimit: 5 }
      },
      y: { ticks: { padding: 1 } }
    },
    plugins: {
      legend: { position: 'right' },
      title: {
        display: true,
        text: 'Packet Traffic Over Time'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    layout: {
      padding: { left: 0, right: 0, top: 0, bottom: 0 }
    },
  };

  // Render the Line chart with the graph data
  return (
    <div className="line-chart-container">
      <Line data={graphData} options={options} />
    </div>
  );
};

export default PacketLineChart;
