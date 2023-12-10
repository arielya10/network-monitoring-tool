# Network Monitoring Tool

## Overview
This network monitoring tool, designed for real-time network traffic analysis, is built with Python and React. It's an ideal tool for network administrators and IT professionals for monitoring and analyzing network traffic.

## Features
- Real-time packet capture and display.
- Retrieval of network information (local and public IP, default gateway).
- Interactive web interface for easy control and visualization.

## Installation
```bash
git clone https://github.com/arielya10/network-monitoring-tool.git
cd network-monitoring-tool
# Install backend dependencies
pip install -r backend/requirements.txt
# Install frontend dependencies
cd frontend && npm install
# Run the backend
python backend/app.py
# Run the frontend
npm start
```
## Usage  
Access the web interface at localhost:3000. Use it to start/stop packet capture and view real-time traffic data.  
## Contributing
Contributions are welcome. Please read our contributing guidelines before submitting pull requests.
## License
This project is licensed under the MIT License.

