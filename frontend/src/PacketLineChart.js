import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PacketLineChart = ({ packets, clearGraph }) => {
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
      setGraphData({ labels: [], datasets: [] });
      setHiddenProtocols({});
      return;
    }
  
    // Assuming `packets` prop now only contains packets for the current second
    // Count the new packets for each protocol
    const newProtocolsCount = packets.reduce((count, packet) => {
      const protocol = identifyProtocol(packet);
      count[protocol] = (count[protocol] || 0) + 1;
      return count;
    }, {});
  
    // Create or update datasets for each protocol
    const newDatasets = Object.keys(protocolColors).map(protocol => {
      // Find existing dataset for the protocol or create a new one
      const existingDataset = graphData.datasets.find(ds => ds.label === protocol);
      const newData = existingDataset ? [...existingDataset.data, newProtocolsCount[protocol] || 0] : [newProtocolsCount[protocol] || 0];
      
      return {
        label: protocol,
        data: newData,
        borderColor: protocolColors[protocol],
        backgroundColor: `${protocolColors[protocol]}66`,
        hidden: hiddenProtocols[protocol],
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
  

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: { autoSkip: true, maxRotation: 0, minRotation: 0, padding: 10 }
      },
      y: { ticks: { padding: 10 } }
    },
    plugins: {
      legend: {
        position: 'right',
        },
      title: {
        display: true,
        text: 'Packet Traffic Over Time', // Title text
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
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
    <div className="line-chart-container">
      <Line data={graphData} options={options} />
    </div>
  );
};

export default PacketLineChart;