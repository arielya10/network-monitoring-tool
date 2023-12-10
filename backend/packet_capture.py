from scapy.all import sniff

# Global list to temporarily store captured packets
captured_packets = []

def packet_callback(packet):
    # Append packet summary to the global list
    packet_data = packet.summary()
    captured_packets.append(packet_data)

def start_capture(stop_sniffing):
    stop_sniffing.clear()  # Reset the stop event
    sniff(prn=packet_callback, store=False, stop_filter=lambda x: stop_sniffing.is_set())

def stop_capture(stop_sniffing):
    stop_sniffing.set()  # Set the stop event

def clear_packets():
    # Clear all packets from the global list
    captured_packets.clear()
