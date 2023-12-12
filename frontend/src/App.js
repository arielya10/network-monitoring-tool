import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // Make sure this points to your App.css file
import PacketGraph from './PacketGraph';

// Connect to the Flask server
const socket = io('http://localhost:5000');

function App() {
  const [packets, setPackets] = useState([]);
  const [connected, setConnected] = useState(socket.connected);
  const packetDisplayRef = useRef(null);
  const [localIP, setLocalIP] = useState('');
  const [publicIP, setPublicIP] = useState('');
  const [defaultGateway, setDefaultGateway] = useState('');
  const [clearGraph, setClearGraph] = useState(false);


  const startCapture = () => {
    console.log('Start Capture button clicked');
    socket.emit('start_capture');
  };

  const stopCapture = () => {
    console.log('Stop Capture button clicked');
    socket.emit('stop_capture');
  };

  const clearPackets = () => {
    console.log('Clear button clicked');
    setPackets([]); // Clears the packets from the React state
    setClearGraph(true); // Signal to clear the graph
    socket.emit('clear_packets'); // Inform the server to clear the packets
  };

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('packet_data', (data) => {
      setPackets(prevPackets => {
        const newPackets = [...prevPackets, ...data.data];
        console.log("New packets:", newPackets); // Debugging
        return newPackets;
      });
      setPackets(prevPackets => [...prevPackets, ...data.data]);
      if (packetDisplayRef.current) {
        packetDisplayRef.current.scrollTop = packetDisplayRef.current.scrollHeight;
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('packet_data');
    };
  }, []);

  useEffect(() => {
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

    fetchNetworkInfo();
}, []);

useEffect(() => {
  if (clearGraph) {
    setClearGraph(false);
  }
}, [clearGraph]);

  return (
    <div>
      <div className={`status-label ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? 'You can capture traffic' : 'No connection'}
      </div>
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <button onClick={clearPackets}>Clear Traffic</button> {/* New clear button */}
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
        {/* Display the number of captured packets */}
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
