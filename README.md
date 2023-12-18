
<div align="center">
<h1 align="center">
<br>NETWORK-MONITORING-TOOL</h1>
<h3>◦ Real-time Network Packet Monitoring and Analysis</h3>
<h3>◦ Developed with the software and tools below:</h3>

<p align="center">
<img src="https://img.shields.io/badge/D3.js-F9A03C.svg?style=flat-square&logo=d3dotjs&logoColor=black" alt="D3.js" />
<img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=flat-square&logo=chartdotjs&logoColor=white" alt="Chart.js" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Flask-000000.svg?style=flat-square&logo=Flask&logoColor=white" alt="Flask" />
<img src="https://img.shields.io/badge/Socket.IO-010101.svg?style=flat-square&logo=Socket.io&logoColor=white" alt="Socket.IO" />
<img src="https://img.shields.io/badge/Scapy-3776AB.svg?style=flat-square&logo=Python&logoColor=white" alt="Scapy" />
</p>

## 📍Project Description
NETWORK-MONITORING-TOOL is a comprehensive tool designed for real-time network packet monitoring and analysis. Built using Flask and React, it integrates Socket.IO for real-time communication, Scapy for packet capturing, and D3.js and Chart.js for dynamic data visualization. This tool is perfect for network administrators and cybersecurity professionals who require an in-depth understanding of network traffic.

## 📦Features
- **Real-Time Packet Capture**: Utilizes Scapy to capture network packets in real-time.
- **Interactive Network Visualization**: Offers a network graph built with D3.js to visualize network topology and device connections.
- **Packet Data Analysis**: Analyzes packet data with various charts including pie, line, and bar charts using Chart.js.
- **Network Scanning**: Capable of scanning the local network to identify active devices.
- **Live Data Updates**: Uses Socket.IO for seamless and immediate updates of network data on the frontend.
- **User-Friendly Interface**: Easy-to-navigate React frontend for monitoring and analyzing network traffic.



## 🔧Installation and Setup
**Prerequisites**:

Install [Node.js](https://nodejs.org/)  
Install [Python](https://www.python.org/downloads/)  
Install [WinPcap](https://www.winpcap.org/install/default.htm) 



1. **Clone the Repository**:
   ```bash
   git clone https://github.com/arielya10/network-monitoring-tool
   cd network-monitoring-tool
   ```
2. **Set Up the Backend**:
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   # Start the Flask server
   python backend\app.py
   ```
3. **Set Up the Frontend**:
   ```bash
   # Navigate to the frontend directory
   cd frontend
   # Install JavaScript dependencies
   npm install
   # Start the React app
   npm start
   ```

## 🤖Usage
After setting up both the Flask server and the React frontend, access the web application through your browser at `http://localhost:3000`. Use the interface to start capturing packets, view real-time network traffic, and analyze packet data through various visualizations.

## 🤝Contributing
Contributions to NETWORK-MONITORING-TOOL are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## 📄License
This project is licensed under the MIT License - see the LICENSE.md file for details.
