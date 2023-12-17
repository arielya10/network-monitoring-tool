import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './NetworkChart.css'; // Optional: Add a CSS file for styling

const NetworkChart = ({ devices }) => {
    const svgRef = useRef();

    const drawChart = () => {
        d3.select(svgRef.current).selectAll("*").remove()
            
        const width = 200;
        const height = 300;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Define nodes with labels "My PC" and "Default Gateway"
        const nodes = [
            { id: 'My PC', group: 1 },
            { id: 'Default Gateway', group: 2 },
            ...devices.map((device, index) => ({
                id: device.hostname,
                group: 2,
                ip: device.ip,
                mac: device.mac,
                manufacturer: device.manufacturer,
                ...device
            }))
        ];
        const links = [{ source: 'My PC', target: 'Default Gateway' }, 
        ...devices.map(device => ({ source: 'Default Gateway', target: device.hostname }))];

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(50)) // Increased distance
            .force('charge', d3.forceManyBody().strength(-500)) // Adjust strength for repulsion
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .style('stroke', '#999')
            .style('stroke-opacity', 0.6);

        // Create group for each node
        const node = svg.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .call(drag(simulation));

        // Append circles to node groups
        node.append('circle')
            .attr('r', 8) // Increased node size
            .style('fill', colorByGroup);

        // Append text (hostname) to node groups
        node.append('text')
            .text(d => d.id)
            .attr('x', 0)
            .attr('y', 15) // Position below the node
            .style('fill', 'black')
            .style('font-size', '10px') // Adjust font size if necessary
            .style('text-anchor', 'middle');

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x}, ${d.y})`);
        });

        function colorByGroup(d) {
            if (d.id === 'My PC') return 'red';
            if (d.id === 'Default Gateway') return 'green';
            return 'blue'; // Color for other devices
        }

        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended);
        }
    };

    useEffect(() => {
        drawChart();
    }, [devices]);

    // Function to create rows for the mini table
    const renderTableRows = () => {
        return devices.map((device, index) => (
            <tr key={index}>
                <td>{device.hostname}</td>
                <td>{device.ip}</td>
                <td>{device.mac}</td>
                <td>{device.manufacturer}</td>
            </tr>
        ));
    };

    return (
        <div className="network-chart-container">
            <svg ref={svgRef}></svg>
            <div className="network-info-table">
                <table>
                    <thead>
                        <tr>
                            <th>Hostname</th>
                            <th>IP Address</th>
                            <th>MAC Address</th>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NetworkChart;
