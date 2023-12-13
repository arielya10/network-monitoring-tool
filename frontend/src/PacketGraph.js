import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PacketGraph = ({ packets, clearGraph }) => {
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

    const timeNow = new Date().toLocaleTimeString();
    const protocolsCount = {};

    packets.forEach(packet => {
      const protocol = identifyProtocol(packet);
      protocolsCount[protocol] = (protocolsCount[protocol] || 0) + 1;
    });

    const newDatasets = Object.keys(protocolsCount).map(protocol => {
      const protocolCount = protocolsCount[protocol];
      const existingDataset = graphData.datasets.find(ds => ds.label.includes(protocol));

      return {
        label: `${protocol} (${protocolCount})`,
        data: [...(existingDataset?.data || []), protocolCount],
        borderColor: protocolColors[protocol] || '#000000',
        backgroundColor: `${protocolColors[protocol]}66` || '#00000066',
        hidden: hiddenProtocols[protocol], // Use the hidden state
        fill: true,
        pointRadius: 0
      };
    });

    setGraphData({ labels: [...graphData.labels, timeNow], datasets: newDatasets });
  }, [packets, clearGraph, hiddenProtocols]);

  const options = {
    scales: {
      x: {
        ticks: { autoSkip: true, maxRotation: 0, minRotation: 0, padding: 10 }
      },
      y: { ticks: { padding: 10 } }
    },
    plugins: {
      legend: {
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          if (ci.isDatasetVisible(index)) {
            ci.hide(index);
            setHiddenProtocols({ ...hiddenProtocols, [legendItem.text.split(' ')[0]]: true });
          } else {
            ci.show(index);
            setHiddenProtocols({ ...hiddenProtocols, [legendItem.text.split(' ')[0]]: false });
          }
        }
      }
    }
  };

  return (
    <div>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default PacketGraph;
