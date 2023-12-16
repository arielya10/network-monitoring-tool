from flask import Flask
from flask_socketio import SocketIO
import threading
import socket
import requests
import netifaces as ni
from flask_cors import CORS

from packet_capture import start_capture, stop_capture, clear_packets, captured_packets

# Initialize Flask application with CORS and static file configuration
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

# Global variables for packet capture control
stop_sniffing = threading.Event()
packet_capture_thread = None

@app.route('/')
def index():
    # Serve the main index.html of the React frontend
    return app.send_static_file('index.html')

@app.route('/network_info')
def network_info():
    # Endpoint to get network information like local IP, public IP, and default gateway
    return get_network_info()

@socketio.on('start_capture')
def handle_start_capture():
    # Start packet capture in a separate thread if not already running
    global packet_capture_thread
    clear_packets()
    if not packet_capture_thread or not packet_capture_thread.is_alive():
        packet_capture_thread = threading.Thread(target=start_capture, args=(stop_sniffing,))
        packet_capture_thread.start()

@socketio.on('stop_capture')
def handle_stop_capture():
    # Stop the packet capture and join the thread
    global packet_capture_thread
    stop_capture(stop_sniffing)
    if packet_capture_thread:
        packet_capture_thread.join()
        packet_capture_thread = None

@socketio.on('clear_packets')
def handle_clear_packets():
    # Clear the packets on the server side
    clear_packets()

def get_network_info():
    # Retrieve local IP, public IP, and default gateway
    local_ip = socket.gethostbyname(socket.gethostname())
    public_ip = requests.get('https://api.ipify.org').text
    default_gateway = ni.gateways()['default'][ni.AF_INET][0]
    return {'local_ip': local_ip, 'public_ip': public_ip, 'default_gateway': default_gateway}

def emit_packets():
    # Emit captured packets to the client in real-time
    while True:
        if captured_packets:
            socketio.emit('packet_data', {'data': captured_packets.copy()})
            captured_packets.clear()
        socketio.sleep(1)

if __name__ == '__main__':
    socketio.start_background_task(emit_packets)
    socketio.run(app, debug=True, use_reloader=False)
