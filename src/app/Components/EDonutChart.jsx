
// In a donut chart, we are comparing the distribution of electric vehicles based on their "Make" (car manufacturer). Each segment in the donut chart represents a unique "Make," and the size of each segment corresponds to the number of vehicles from that manufacturer in the dataset.
'use client';
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default function EDonutChart() {
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
      drawDonutChart();
    }
  }, [data]);

  const drawDonutChart = () => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3.select(svgRef.current);

    // Clear previous graph
    svg.selectAll('*').remove();

    // Nest the data by 'Make'
    const nestedData = d3.group(data, (d) => d['Make']);

    // Create color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create arc generator
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

    // Create pie chart layout
    const pie = d3.pie().value((d) => d.values.length);

    // Convert nestedData to pie chart data
    const pieData = pie(Array.from(nestedData.entries(), ([key, values]) => ({ key, values })));

    // Draw arcs
    svg
      .selectAll('.arc')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .style('fill', (d) => color(d.data.key));

    // Add legend
    const legend = svg
      .selectAll('.legend')
      .data(nestedData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(550,${i * 20})`);

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d) => color(d[0]));

    legend.append('text').attr('x', 24).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'start').text((d) => d[0]);
  };

  return (
    <div className='container mt-4'>
      <svg ref={svgRef} width={1200} height={1500}></svg>;
    </div>
  )
}
