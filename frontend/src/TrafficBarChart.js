import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TrafficBarChart = ({ packets }) => {
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });

  // Function to count UDP and TCP packets
  const countTraffic = () => {
    let udpCount = 0;
    let tcpCount = 0;

    packets.forEach(packet => {
      if (packet.includes('UDP')) udpCount++;
      if (packet.includes('TCP')) tcpCount++;
    });

    return { udpCount, tcpCount };
  };

  // Update graph data when packets change
  useEffect(() => {
    const { udpCount, tcpCount } = countTraffic();

    setGraphData({
      labels: ['UDP', 'TCP'],
      datasets: [
        {
            label: 'Number of Packets',
            data: [udpCount, tcpCount],
            backgroundColor: ['#36A2EB', '#FFCE56'],
            borderRadius: 20, // Add rounded corners to the bars
          }
      ]
    });
  }, [packets]);

  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'UDP vs TCP Traffic'
      }
    }
  };

  // Render the Bar chart with the graph data
  return (
    <div className="bar-container">
      <Bar data={graphData} options={options} />
    </div>
  );
};

export default TrafficBarChart;
