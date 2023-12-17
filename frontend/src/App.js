import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // CSS styles for the application
import PacketPie from './PacketPie'; // PacketPie component for pie chart visualization
import PacketLineChart from './PacketLineChart'; // PacketLineChart component for line chart visualization
import NetworkChart from './NetworkChart'; // Import the component
import TrafficBarChart from './TrafficBarChart'; // Import the component


const socket = io('http://localhost:5000');

function App() {
  const [packets, setPackets] = useState([]); // State to store packet data
  const [connected, setConnected] = useState(socket.connected); // State to track socket connection
  const packetDisplayRef = useRef(null); // Ref for packet display div
  const [localIP, setLocalIP] = useState(''); // State to store local IP address
  const [publicIP, setPublicIP] = useState(''); // State to store public IP address
  const [defaultGateway, setDefaultGateway] = useState(''); // State to store default gateway
  const [clearGraph, setClearGraph] = useState(false); // State to control graph clearing
  const [lineChartPackets, setLineChartPackets] = useState([]); // State to store packets for line chart
  const [networkDevices, setNetworkDevices] = useState([]); // State to store network devices

  const startNetworkScan = async () => {
    try {
      const response = await fetch('http://localhost:5000/scan_network');
      if (!response.ok) throw new Error('Network response was not ok');
      console.log("Network scanning started");
    } catch (error) {
      console.error('Error starting network scan:', error);
    }
  };
  // Start packet capture
  const startCapture = () => {socket.emit('start_capture');
  setNetworkDevices([]);  
  startNetworkScan(); // Start network scanning when capture starts
  };
  // Stop packet capture
  const stopCapture = () => socket.emit('stop_capture');

  // Clear captured packets
  const clearPackets = () => {
    setPackets([]);
    setLineChartPackets([]);
    setClearGraph(true);
    setNetworkDevices([]);
    socket.emit('clear_packets');
  };


  // Handle socket events
  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('packet_data', (data) => {
      setPackets(prevPackets => [...prevPackets, ...data.data]);
      setLineChartPackets(data.data);
      if (packetDisplayRef.current) {
        packetDisplayRef.current.scrollTop = packetDisplayRef.current.scrollHeight;
      }
    });
    socket.on('new_device', (device) => {
      setNetworkDevices(prevDevices => [...prevDevices, device]);
    });
  
    // Cleanup event listeners
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('packet_data');
      socket.off('new_device');
    };
  }, []);

  // Fetch network information
  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/network_info');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLocalIP(data.local_ip);
        setPublicIP(data.public_ip);
        setDefaultGateway(data.default_gateway);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchNetworkInfo();
  }, []);

  // Reset clearGraph state
  useEffect(() => {
    if (clearGraph) setClearGraph(false);
  }, [clearGraph]);

  // Render main component UI
  return (
    <div>
      <div className={`status-label ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? 'You can capture traffic' : 'No connection'}
      </div>
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <button onClick={clearPackets}>Clear Traffic</button>
      <div className="row-container">
        <PacketPie packets={packets} clearGraph={clearGraph} />
        <PacketLineChart packets={lineChartPackets} clearGraph={clearGraph} />
        <div className="packet-display" ref={packetDisplayRef}>
          {packets.map((packet, index) => (
            <div key={index} className="packet">
              <span className="packet-number">{index + 1}</span> {packet}
            </div>
          ))}
        </div>
      </div>
      <div className='network-row-container'>
        <div className="network-chart-container">
          <NetworkChart devices={networkDevices} />
        </div>
        <div className="traffic-bar-chart-container">
          <TrafficBarChart packets={packets} />
        </div>
        <div className="info-table">
          <div className="packet-count">
            Total Packets Captured: {packets.length}
          </div>
          <div className="network-info">
            <div>Local IP: {localIP}</div>
            <div>Public IP: {publicIP}</div>
            <div>Default Gateway: {defaultGateway}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
