from flask import Flask
from flask_socketio import SocketIO
import threading
from packet_capture import start_capture, stop_capture, clear_packets, captured_packets
import netifaces as ni
import socket
import requests
from flask_cors import CORS


app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

# Event object to control the sniffing thread
stop_sniffing = threading.Event()

# Initialize the packet capture thread variable
packet_capture_thread = None

def get_network_info():
    # Get local IP
    local_ip = socket.gethostbyname(socket.gethostname())
    
    # Get public IP
    public_ip = requests.get('https://api.ipify.org').text

    # Get default gateway
    gws = ni.gateways()
    default_gateway = gws['default'][ni.AF_INET][0]

    return {
        'local_ip': local_ip,
        'public_ip': public_ip,
        'default_gateway': default_gateway
    }

@app.route('/network_info')
def network_info():
    return get_network_info()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@socketio.on('start_capture')
def handle_start_capture():
    global packet_capture_thread
    clear_packets()  # Clear previous packets
    if packet_capture_thread is None or not packet_capture_thread.is_alive():
        packet_capture_thread = threading.Thread(target=start_capture, args=(stop_sniffing,))
        packet_capture_thread.start()

@socketio.on('stop_capture')
def handle_stop_capture():
    global packet_capture_thread
    stop_capture(stop_sniffing)
    if packet_capture_thread:
        packet_capture_thread.join()
        packet_capture_thread = None
        
@socketio.on('clear_packets')
def handle_clear_packets():
    clear_packets()  # Function to clear the packets on the server side


def emit_packets():
    while True:
        if captured_packets:
            socketio.emit('packet_data', {'data': captured_packets.copy()})
            captured_packets.clear()
        socketio.sleep(1)  # Adjust the sleep duration as needed



if __name__ == '__main__':
    socketio.start_background_task(emit_packets)
    socketio.run(app, debug=True, use_reloader=False)
