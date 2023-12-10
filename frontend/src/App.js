import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // Make sure this points to your App.css file

// Connect to the Flask server
const socket = io('http://localhost:5000');

function App() {
  const [packets, setPackets] = useState([]);
  const [connected, setConnected] = useState(socket.connected);
  const packetDisplayRef = useRef(null);

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

  return (
    <div>
      <div className={`status-label ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? 'You can capture traffic' : 'No connection'}
      </div>
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <button onClick={clearPackets}>Clear Traffic</button> {/* New clear button */}
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
    </div>
  );
}

export default App;
