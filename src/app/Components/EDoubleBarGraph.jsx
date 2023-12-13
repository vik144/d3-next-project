// let's compare the "Electric Range" for each "Make" and distinguish the bars based on the "Model Year."
'use client'
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default function EDoubleBarGraph() {
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
      drawDoubleBarGraph();
    }
  }, [data]);

  const drawDoubleBarGraph = () => {
    const width = 1200;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 }; // Increased bottom margin for x-axis labels

    const svg = d3.select(svgRef.current);

    // Clear previous graph
    svg.selectAll('*').remove();

    // Group data by 'Make' and 'Model Year' and calculate the average 'Electric Range' for each group
    const groupedData = d3.rollup(
      data,
      (v) => d3.mean(v, (d) => +d['Electric Range']),
      (d) => [d['Make'], d['Model Year']]
    );

    // Convert the grouped data to an array of objects
    const barData = Array.from(groupedData, ([key, value]) => ({ key, value }));

    const x = d3
      .scaleBand()
      .domain(barData.map((d) => d.key[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Use a color scale based on the number of unique 'Model Year' values
    const color = d3.scaleOrdinal().range(d3.schemeCategory10.slice(0, d3.extent(data, (d) => d['Model Year'])[1] + 1));

    // Draw bars for each 'Model Year'
    svg
      .selectAll('.bar-group')
      .data(barData)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d) => `translate(${x(d.key[0])}, 0)`)
      .selectAll('rect')
      .data((d) => [d])
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.value))
      .attr('fill', (d) => color(d.key[1]));

    // Draw x-axis with rotated labels
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) => d)
          .tickSizeOuter(0)
      )
      .selectAll('text')
      .attr('transform', `rotate(-45)`) // Rotate x-axis labels
      .attr('dy', '0.5em')
      .attr('dx', '-1em')
      .style('text-anchor', 'end');

    // Draw y-axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Draw legend
    const legend = svg
      .selectAll('.legend')
      .data([...new Set(barData.map((d) => d.key[1]))]) // Unique Model Year values
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${width - 120},${i * 20})`);

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d) => color(d));

    legend.append('text').attr('x', 24).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'start').text((d) => d);
  };

  return (
    <div className='container mt-4'>
      <svg ref={svgRef} width={1500} height={1000}></svg>
    </div>
  );
}
