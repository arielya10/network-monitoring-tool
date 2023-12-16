import React, { useState, useEffect } from 'react';
import { Pie  } from 'react-chartjs-2';
import 'chart.js/auto';

const PacketPie  = ({ packets, clearGraph }) => {
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [hiddenProtocols, setHiddenProtocols] = useState({}); // Track hidden protocols

  // Fixed colors for protocols
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

  // Identify protocol from a packet
  const identifyProtocol = (packet) => {
    if (packet.includes('ARP')) {
      return 'ARP';
    } else if (packet.includes('TCP') && packet.includes('https')) {
      return 'HTTPS';
    } else if (packet.includes('UDP') && packet.includes('DNS')) {
      return 'DNS';
    } else if (packet.includes('ICMP')) {
      return 'ICMP';
    } else if (packet.includes('HTTP ')) { // Look for HTTP specifically
      return 'HTTP';
    } else if (packet.includes('SSL') || packet.includes('TLS')) {
      return 'SSL/TLS';
    } else if (packet.includes('NTP')) {
      return 'NTP';
    } else {
      return 'Other';
    }
  };

  // Update graph data when packets change or graph is cleared
  useEffect(() => {
    if (clearGraph) {
      // Set graphData to a valid empty structure
      setGraphData({ 
        labels: [], 
        datasets: [{
          data: [],
          backgroundColor: []
        }] 
      });
      return;
  }

    const protocolsCount = {};

    packets.forEach(packet => {
        const protocol = identifyProtocol(packet);
        protocolsCount[protocol] = (protocolsCount[protocol] || 0) + 1;
    });

    const labels = Object.keys(protocolsCount).map(protocol => `${protocol} (${protocolsCount[protocol]})`);
    const data = Object.values(protocolsCount);
    const backgroundColors = Object.keys(protocolsCount).map(protocol => protocolColors[protocol] || '#000000');

    setGraphData({
        labels,
        datasets: [{
            data,
            backgroundColor: backgroundColors
        }]
    });
}, [packets, clearGraph]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 20,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Total Packet Distribution', // Title text
      }  

    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },

  };

  return (
    <div className="pie-container">
      <Pie data={graphData} options={options} />
    </div>
);
};

export default PacketPie ;
