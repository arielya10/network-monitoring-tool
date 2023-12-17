from scapy.all import sniff, ARP, Ether, srp
import socket
import requests



# Store captured packets temporarily
captured_packets = []
client_data = {}

def packet_callback(packet):
    # Called for each captured packet to add its summary to the list
    try:
        packet_data = packet.summary()
        captured_packets.append(packet_data)
    except Exception as e:
        print(f"Error processing packet: {e}")

def start_capture(stop_sniffing):
    # Starts packet capture; runs until stop_sniffing event is set
    try:
        stop_sniffing.clear()
        sniff(prn=packet_callback, store=False, stop_filter=lambda x: stop_sniffing.is_set())
    except Exception as e:
        print(f"Error during packet capture: {e}")

def stop_capture(stop_sniffing):
    stop_sniffing.set()

def clear_packets():
    captured_packets.clear()
    

def get_oui_info(mac):
    # Example using an online API; replace with your preferred method
    try:
        response = requests.get(f'http://api.macvendors.com/{mac}')
        if response.status_code == 200:
            return response.text  # Manufacturer's name
        else:
            return "Unknown"
    except requests.RequestException:
        return "Unknown"

def scan_network(subnet, socketio):
    # Create ARP request packet
    arp = ARP(pdst=subnet)
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether / arp

    # Send the packet and get the result
    result = srp(packet, timeout=3, verbose=0)[0]

    for sent, received in result:
        ip_address = received.psrc
        mac_address = received.hwsrc

        # Try to get hostname, fall back to IP if not available
        try:
            hostname = socket.gethostbyaddr(ip_address)[0]
        except (socket.herror, socket.gaierror):
            hostname = ip_address

        # Get manufacturer information
        manufacturer = get_oui_info(mac_address)

        # Create a dictionary for the live host
        live_host = {
            'ip': ip_address,
            'mac': mac_address,
            'hostname': hostname,
            'manufacturer': manufacturer
        }

        # Emit the live host data to the client using SocketIO
        socketio.emit('new_device', live_host)

# Other functions (like get_oui_info) remain unchanged
