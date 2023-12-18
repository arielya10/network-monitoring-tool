
# Network Traffic Analyzer

## Introduction
This project is a Network Traffic Analyzer tool designed to capture and analyze network traffic in real-time. It leverages a React-based frontend with a Flask backend to display network data through interactive charts and graphs. The application offers functionalities like packet capturing, network device scanning, and traffic data visualization.

## Key Features
- Real-time packet capture analysis.
- Network device scanning and detection.
- Interactive data visualizations using D3.js and Chart.js.
- Display of network information such as local IP, public IP, and default gateway.
- Support for different network protocols within the visualization charts.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Flask, Flask-SocketIO
- **Data Visualization**: D3.js, Chart.js
- **Packet Capture**: WinPcap (Windows), Scapy (Python)
- **Other Libraries**: netifaces, requests

## Installation

### Prerequisites
- Install [Node.js](https://nodejs.org/).
- Install [Python](https://www.python.org/downloads/).
- Install [WinPcap](https://www.winpcap.org/install/default.htm) for Windows or ensure libpcap is installed for Linux/Mac.

### Backend Setup
1. Clone the repository.
2. Navigate to the backend directory.
3. (Optional) Set up a Python virtual environment and activate it.
4. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup
1. Navigate to the frontend directory from the root of the repository.
2. Install the necessary Node.js packages:
   ```bash
   npm install
   ```

## Running the Application

### Starting the Backend Server
From the backend directory, run:
```bash
python app.py
```

### Running the Frontend
In a separate terminal, navigate to the frontend directory and start the React app:
```bash
npm start
```

## Usage
- **Start Capture**: Click the 'Start Capture' button to begin capturing network packets.
- **Stop Capture**: Click the 'Stop Capture' button to stop the packet capture process.
- **Clear Traffic**: Click the 'Clear Traffic' button to clear the current packet capture data from the display.
- **View Charts**: Observe various charts representing network traffic, including Pie Charts, Line Charts, and Bar Charts.
- **Network Chart**: Shows a graphical representation of network devices detected during scanning.

## Contributing
Contributions to the project are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Submit a pull request.

## License
[MIT License](LICENSE)

## Acknowledgements
- Thanks to all the libraries and frameworks that made this project possible.
- Special thanks to contributors and supporters of this project.
