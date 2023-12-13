// This code assumes that the field "Electric Vehicle Type" contains different types of electric vehicles. Each slice in the pie chart represents a different type, and the size of the slice corresponds to the count of vehicles for that type.
'use client'
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default function EPieChart() {
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
      drawPieChart();
    }
  }, [data]);

  const drawPieChart = () => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current).append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    // Group data by 'Electric Vehicle Type' and calculate the count for each type
    const groupedData = d3.rollup(
      data,
      (v) => v.length,
      (d) => d['Electric Vehicle Type']
    );

    // Convert the grouped data to an array of objects
    const pieData = Array.from(groupedData, ([key, value]) => ({ type: key, count: value }));

    // Create a pie chart layout
    const pie = d3.pie().value((d) => d.count);

    // Generate the arcs
    const arcs = pie(pieData);

    // Create an arc generator
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Draw arcs
    svg
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => d3.schemeCategory10[i]) // Color based on the index
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.8);

    // Add labels
    svg
      .selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d.data.type);

    // Add a legend
    const legend = svg
      .selectAll('.legend')
      .data(pieData.map((d) => d.type))
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(250,${i * 25})`);

    legend
      .append('rect')
      .attr('x', -18)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);

    legend.append('text').attr('x', 0).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'start').text((d) => d);
  };

  return (
    <div className='container mt-4'>
      <svg ref={svgRef} width={800} height={800}></svg>;
    </div>
  )
}

