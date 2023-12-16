from scapy.all import sniff

# Store captured packets temporarily
captured_packets = []

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
    # Stops the packet capture process
    stop_sniffing.set()

def clear_packets():
    # Clears the list of captured packets
    captured_packets.clear()
