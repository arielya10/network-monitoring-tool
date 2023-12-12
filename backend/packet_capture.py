from scapy.all import sniff

# Global list to temporarily store captured packets
captured_packets = []

def packet_callback(packet):
    """
    Callback function for packet sniffing.
    This function is called every time a new packet is captured.

    Args:
    packet: The captured packet.

    Adds the summary of the captured packet to the global list.
    """
    packet_data = packet.summary()
    captured_packets.append(packet_data)

def start_capture(stop_sniffing):
    """
    Starts the packet capture process.

    Args:
    stop_sniffing: A threading.Event() object used to control the stopping of packet sniffing.

    Uses Scapy's sniff() function with specified parameters.
    The sniffing process runs until the stop_sniffing event is set.
    """
    stop_sniffing.clear()  # Reset the stop event
    sniff(prn=packet_callback, store=False, stop_filter=lambda x: stop_sniffing.is_set())

def stop_capture(stop_sniffing):
    """
    Stops the packet capture process.

    Args:
    stop_sniffing: A threading.Event() object used to control the stopping of packet sniffing.

    Sets the stop_sniffing event to stop the sniffing process.
    """
    stop_sniffing.set()  # Set the stop event

def clear_packets():
    """
    Clears the captured packets from the global list.
    This function is used to reset the packet capture and remove all previously captured packets.
    """
    # Clear all packets from the global list
    captured_packets.clear()
