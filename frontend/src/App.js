import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // Make sure this points to your App.css file

// Connect to the Flask server
const socket = io('http://localhost:5000');

function App() {
  const [packets, setPackets] = useState([]);
  const packetDisplayRef = useRef(null);

  const startCapture = () => {
    console.log('Start Capture button clicked');
    socket.emit('start_capture');
  };

  const stopCapture = () => {
    console.log('Stop Capture button clicked');
    socket.emit('stop_capture');
  };

  useEffect(() => {
    socket.on('packet_data', (data) => {
      setPackets(prevPackets => [...prevPackets, ...data.data]);
      // Scroll to the bottom of the packet display area
      if (packetDisplayRef.current) {
        packetDisplayRef.current.scrollTop = packetDisplayRef.current.scrollHeight;
      }
    });

    return () => {
      socket.off('packet_data');
    };
  }, []);

  return (
    <div>
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <div className="packet-display" ref={packetDisplayRef}>
        {packets.map((packet, index) => (
          <div key={index} className="packet">
            <span className="packet-number">{index + 1}</span> {packet}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
