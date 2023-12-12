// PacketGraph.js
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PacketGraph = ({ packets, clearGraph }) => {
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const protocolColors = useRef({});

  const formatTime24Hour = (date) => {
    return date.toTimeString().substring(0, 5);
  };

  // Function to generate random colors for the graph lines
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const identifyProtocol = (packet) => {
    if (packet.includes('ARP')) {
      return 'ARP';
    } else if (packet.includes('TCP') && packet.includes('https')) {
      return 'HTTPS';
    } else if (packet.includes('UDP') && packet.includes('DNS')) {
      return 'DNS';
    } else if (packet.includes('ICMP')) {
      return 'ICMP';
    } 
    // Add more conditions as needed for other protocols
    else {
      return 'Other'; // Default category for unrecognized protocols
    }
  };

  useEffect(() => {
    if (clearGraph) {
      // Reset the graph data and protocol colors
      setGraphData({ labels: [], datasets: [] });
      protocolColors.current = {};
      return;
    }

    const timeNow = formatTime24Hour(new Date()); // Format time to 24-hour
    const protocolsCount = {};

    // Count packets by protocol
    packets.forEach(packet => {
        const protocol = identifyProtocol(packet);
        protocolsCount[protocol] = (protocolsCount[protocol] || 0) + 1;
      });

    // Prepare datasets for each protocol
    const newDatasets = Object.keys(protocolsCount).map(protocol => {
      if (!protocolColors.current[protocol]) {
        protocolColors.current[protocol] = getRandomColor();
      }
    
      const protocolCount = protocolsCount[protocol];
      const existingDataset = graphData.datasets.find(ds => ds.label.includes(protocol));

      return {
        label: `${protocol} (${protocolCount})`, // Include count in label
        data: [...(existingDataset?.data || []), protocolCount],
        borderColor: protocolColors.current[protocol],
        fill: true,
        backgroundColor: protocolColors.current[protocol] + '66',
        pointRadius: 0, // Remove dots from line
      };
    });

    setGraphData({
      labels: [...graphData.labels, timeNow],
      datasets: newDatasets,
    });
  }, [packets, clearGraph]);


  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          padding: 10  // Adjust this value as needed
        }
      },
      y: {
        ticks: {
          padding: 10  // Adjust this value as needed
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
