from flask import Flask
from flask_socketio import SocketIO
import threading
from packet_capture import start_capture, stop_capture, clear_packets, captured_packets

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
socketio = SocketIO(app, cors_allowed_origins='*')

# Event object to control the sniffing thread
stop_sniffing = threading.Event()

# Initialize the packet capture thread variable
packet_capture_thread = None

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

def emit_packets():
    while True:
        if captured_packets:
            socketio.emit('packet_data', {'data': captured_packets.copy()})
            captured_packets.clear()
        socketio.sleep(1)  # Adjust the sleep duration as needed

if __name__ == '__main__':
    socketio.start_background_task(emit_packets)
    socketio.run(app, debug=True, use_reloader=False)
