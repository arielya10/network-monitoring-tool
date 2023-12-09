from flask import Flask
from threading import Thread
from packet_capture import start_capture

app = Flask(__name__)

@app.route('/')
def index():
    return 'Network Monitoring Tool API'

if __name__ == '__main__':
    # Start packet capture in a separate thread
    packet_capture_thread = Thread(target=start_capture)
    packet_capture_thread.start()
    app.run(debug=True)
