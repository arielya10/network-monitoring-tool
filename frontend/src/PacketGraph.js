import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart component from Chart.js
import 'chart.js/auto'; // Auto import of Chart.js components

// The PacketGraph functional component
const PacketGraph = ({ packets, clearGraph }) => {
  // State for graph data
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });

  // Ref to store colors for different protocols
  const protocolColors = useRef({});

  // Function to format time for graph labels
  const formatTime24Hour = (date) => {
    return date.toTimeString().substring(0, 5);
  };

  // Function to generate random colors for different protocols
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to identify protocol from a packet
  const identifyProtocol = (packet) => {
    // Example conditions to categorize packets by protocol
    if (packet.includes('ARP')) {
      return 'ARP';
    } else if (packet.includes('TCP') && packet.includes('https')) {
      return 'HTTPS';
    } else if (packet.includes('UDP') && packet.includes('DNS')) {
      return 'DNS';
    } else if (packet.includes('ICMP')) {
      return 'ICMP';
    } else {
      return 'Other'; // Default category for unrecognized protocols
    }
  };

  // useEffect hook to update the graph whenever packets change
  useEffect(() => {
    if (clearGraph) {
      // Reset the graph data and protocol colors on clear
      setGraphData({ labels: [], datasets: [] });
      protocolColors.current = {};
      return;
    }

    // Get current time for label
    const timeNow = formatTime24Hour(new Date());
    const protocolsCount = {};

    // Count packets by protocol
    packets.forEach(packet => {
      const protocol = identifyProtocol(packet);
      protocolsCount[protocol] = (protocolsCount[protocol] || 0) + 1;
    });

    // Prepare datasets for each protocol
    const newDatasets = Object.keys(protocolsCount).map(protocol => {
      if (!protocolColors.current[protocol]) {
        protocolColors.current[protocol] = getRandomColor(); // Assign random color if not already assigned
      }
    
      const protocolCount = protocolsCount[protocol];
      const existingDataset = graphData.datasets.find(ds => ds.label.includes(protocol));

      return {
        label: `${protocol} (${protocolCount})`, // Label with protocol and count
        data: [...(existingDataset?.data || []), protocolCount], // Append data to existing dataset
        borderColor: protocolColors.current[protocol],
        fill: true,
        backgroundColor: protocolColors.current[protocol] + '66', // Semi-transparent background color
        pointRadius: 0, // No point radius for smoother line
      };
    });

    // Update the state with new graph data
    setGraphData({
      labels: [...graphData.labels, timeNow],
      datasets: newDatasets,
    });
  }, [packets, clearGraph]);

  // Chart.js options for the graph
  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: true, // Auto-skip labels to prevent overlap
          maxRotation: 0,
          minRotation: 0,
          padding: 10  // Padding for x-axis ticks
        }
      },
      y: {
        ticks: {
          padding: 10  // Padding for y-axis ticks
        }
      }
    }
  };

  // Render the Line chart with graphData and options
  return (
    <div>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default PacketGraph;
