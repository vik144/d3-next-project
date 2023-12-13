// we can create a line graph based on the "Model Year" and "Electric Range" for each "Make."
'use client'
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default function ELineGraph() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.post('/api/csvdata'); // Replace with your actual API endpoint
            setData(res.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const svgRef = useRef();

    useEffect(() => {
        if (data.length > 0) {
            drawLineGraph();
        }
    }, [data]);

    const drawLineGraph = () => {
        const width = 1000;
        const height = 800;
        const margin = { top: 20, right: 30, bottom: 50, left: 40 };

        const svg = d3.select(svgRef.current);

        // Clear previous graph
        svg.selectAll('*').remove();

        // Convert string values to numbers
        data.forEach((d) => {
            d['Model Year'] = +d['Model Year'];
            d['Electric Range'] = +d['Electric Range'];
        });

        const color = d3.scaleOrdinal(d3.schemeCategory10).domain([...new Set(data.map((d) => d['Make']))]);

        // Nest the data by 'Make'
        const nestedData = d3.group(data, (d) => d['Make']);

        // Create line function
        const line = d3
            .line()
            .x((d) => x(d['Model Year']))
            .y((d) => y(d['Electric Range']));

        // Create x-axis scale
        const x = d3
            .scaleLinear()
            .domain([d3.min(data, (d) => d['Model Year']), d3.max(data, (d) => d['Model Year'])])
            .nice()
            .range([margin.left, width - margin.right]);

        // Create y-axis scale
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d['Electric Range'])])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Draw x-axis
        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Draw y-axis
        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        // Draw lines
        svg
            .selectAll('.line')
            .data(nestedData)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr('d', (d) => line(Array.from(d[1])))
            .style('stroke', (d) => color(d[0]))
            .style('fill', 'none');
        // Add legend
        const legend = svg
            .selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(1000,${i * 20})`);

        legend
            .append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', color);

        legend.append('text').attr('x', 24).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'start').text((d) => d);
    };

    return (
        <div className='container mt-4'>

            <svg ref={svgRef} width={1500} height={1300} />
        </div>
    )
}
