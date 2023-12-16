import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PacketPie = ({ packets, clearGraph }) => {
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

  // Update graph data when packets change or when the graph is cleared
  useEffect(() => {
    if (clearGraph) {
      setGraphData({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
      return;
    }

    const protocolsCount = packets.reduce((count, packet) => {
      const protocol = identifyProtocol(packet);
      count[protocol] = (count[protocol] || 0) + 1;
      return count;
    }, {});

    const labels = Object.keys(protocolsCount).map(protocol => `${protocol} (${protocolsCount[protocol]})`);
    const data = Object.values(protocolsCount);
    const backgroundColors = Object.keys(protocolsCount).map(protocol => protocolColors[protocol] || '#000000');

    setGraphData({
      labels,
      datasets: [{ data, backgroundColor: backgroundColors }]
    });
  }, [packets, clearGraph]);

  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 20,
    plugins: {
      legend: { position: 'right' },
      title: {
        display: true,
        text: 'Total Packet Distribution'
      }
    },
    layout: {
      padding: { left: 0, right: 0, top: 0, bottom: 0 }
    }
  };

  // Render the Pie chart with the graph data
  return (
    <div className="pie-container">
      <Pie data={graphData} options={options} />
    </div>
  );
};

export default PacketPie;
