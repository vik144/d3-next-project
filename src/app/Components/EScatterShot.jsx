// For a scatter plot, you typically choose two numeric variables to represent on the x-axis and y-axis. In this example, I'll use "Model Year" for the x-axis and "Electric Range" for the y-axis. Each point on the scatter plot will represent a vehicle.
'use client'
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default function EScatterShot() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.post('/api/csvdata'); 
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const svgRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      drawScatterChart();
    }
  }, [data]);

  const drawScatterChart = () => {
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const radius = 5; // Radius of the circle

    const svg = d3.select(svgRef.current);

    // Clear previous graph
    svg.selectAll('*').remove();

    // Convert string values to numbers
    data.forEach((d) => {
      d['Model Year'] = +d['Model Year'];
      d['Electric Range'] = +d['Electric Range'];
    });

    const x = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d['Model Year']), d3.max(data, (d) => d['Model Year'])])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d['Electric Range']), d3.max(data, (d) => d['Electric Range'])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeCategory10).domain([...new Set(data.map((d) => d['Make']))]);

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

    // Draw scatter plot points with colors based on 'Make'
    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d['Model Year']))
      .attr('cy', (d) => y(d['Electric Range']))
      .attr('r', radius)
      .attr('fill', (d) => color(d['Make']));

    // Add legend
    const legend = svg
      .selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(900,${i * 20})`);

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', color);

    legend.append('text').attr('x', 24).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'start').text((d) => d);
  };

  return (
    <div className='container mt-4'>
        <svg ref={svgRef} width={1000} height={1200}></svg>
    </div>
  )
}
