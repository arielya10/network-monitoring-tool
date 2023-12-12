import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // Import CSS styles for the application
import PacketGraph from './PacketGraph'; // Import the PacketGraph component

// Establish connection to the Flask server using Socket.IO
const socket = io('http://localhost:5000');

function App() {
  // React state hooks to manage component state
  const [packets, setPackets] = useState([]);
  const [connected, setConnected] = useState(socket.connected);
  const packetDisplayRef = useRef(null); // Ref for packet display div
  const [localIP, setLocalIP] = useState('');
  const [publicIP, setPublicIP] = useState('');
  const [defaultGateway, setDefaultGateway] = useState('');
  const [clearGraph, setClearGraph] = useState(false); // State to control graph clearing

  // Function to start packet capture
  const startCapture = () => {
    console.log('Start Capture button clicked');
    socket.emit('start_capture'); // Emit event to server to start capture
  };

  // Function to stop packet capture
  const stopCapture = () => {
    console.log('Stop Capture button clicked');
    socket.emit('stop_capture'); // Emit event to server to stop capture
  };

  // Function to clear captured packets
  const clearPackets = () => {
    console.log('Clear button clicked');
    setPackets([]); // Clears the packets from the React state
    setClearGraph(true); // Signal to clear the graph
    socket.emit('clear_packets'); // Inform the server to clear the packets
  };

  // useEffect hook to handle socket events
  useEffect(() => {
    // Handle socket connection event
    socket.on('connect', () => {
      setConnected(true);
    });

    // Handle socket disconnection event
    socket.on('disconnect', () => {
      setConnected(false);
    });

    // Handle packet data received from the server
    socket.on('packet_data', (data) => {
      setPackets(prevPackets => {
        const newPackets = [...prevPackets, ...data.data];
        console.log("New packets:", newPackets); // Debugging
        return newPackets;
      });
      if (packetDisplayRef.current) {
        packetDisplayRef.current.scrollTop = packetDisplayRef.current.scrollHeight; // Auto-scroll to latest packet
      }
    });

    // Cleanup function to remove event listeners
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('packet_data');
    };
  }, []);

  // useEffect hook to fetch network information
  useEffect(() => {
    // Function to fetch network information from the server
    const fetchNetworkInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/network_info');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLocalIP(data.local_ip);
            setPublicIP(data.public_ip);
            setDefaultGateway(data.default_gateway);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch network information on component mount
    fetchNetworkInfo();
}, []);

  // useEffect hook to reset the clearGraph state
  useEffect(() => {
    if (clearGraph) {
      setClearGraph(false);
    }
  }, [clearGraph]);

  // Render the main component
  return (
    <div>
      <div className={`status-label ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? 'You can capture traffic' : 'No connection'}
      </div>
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <button onClick={clearPackets}>Clear Traffic</button>
      <div className="chart-container">
        <PacketGraph packets={packets} clearGraph={clearGraph} />
      </div>
      <div className="packet-display" ref={packetDisplayRef}>
        {packets.map((packet, index) => (
          <div key={index} className="packet">
            <span className="packet-number">{index + 1}</span> {packet}
          </div>
        ))}
      </div>
      <div className="packet-count">
        Total Packets Captured: {packets.length}
      </div>
      <div className="network-info">
        <div>Local IP: {localIP}</div>
        <div>Public IP: {publicIP}</div>
        <div>Default Gateway: {defaultGateway}</div>
      </div>
    </div>
  );
}

export default App;
