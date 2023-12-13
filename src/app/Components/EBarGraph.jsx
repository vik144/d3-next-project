// This code uses D3.js to generate a bar graph based on the 'Make' and 'Electric Range' fields from your data.
'use client';
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default function EBarGraph() {
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
      drawBarGraph();
    }
  }, [data]);

  const drawBarGraph = () => {
    const margin = { top: 20, right: 20, bottom: 70, left: 40 }; // Increased bottom margin for x-axis labels
    const width = 1000 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);

    // Clear previous graph
    svg.selectAll('*').remove();

    // Group data by 'Make' and calculate average 'Electric Range'
    const groupedData = d3.rollup(
      data,
      (v) => d3.mean(v, (d) => +d['Electric Range']),
      (d) => d['Make']
    );

    const x = d3
      .scaleBand()
      .domain(Array.from(groupedData.keys()))
      .range([margin.left, width - margin.right])
      .padding(0.2); // Adjust the padding to increase space between bars

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(Array.from(groupedData.values()))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text') // Rotate x-axis labels
      .attr('transform', `rotate(-45)`)
      .attr('dy', '0.5em')
      .attr('dx', '-1em')
      .style('text-anchor', 'end');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Draw bars
    svg
      .selectAll('rect')
      .data(groupedData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d[1]))
      .attr('fill', 'steelblue');

    // Draw legend
    const legend = svg
      .selectAll('.legend')
      .data(['Average Electric Range'])
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend
      .append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', 'steelblue');

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text((d) => d);
  };
  

  return (
    <div className='container mt-4'>
    <svg ref={svgRef} width="1500" height="1200"></svg>
  </div>

  )
}

