'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { feature } from 'topojson-client';

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', '100%');

    const projection = d3
      .geoMercator()
      .scale(100)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Sample node data - replace with real data
    const nodes = [
      { long: -74, lat: 40.7 },
      { long: 2.3, lat: 48.9 },
      { long: 139, lat: 35.7 },
    ];

    // Draw map
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then((response) => response.json())
      .then((data) => {
        const countries = feature(data, data.objects.countries);

        svg
          .selectAll('path')
          .data(countries.geometry.coordinates)
          .join('path')
          .attr('d', path.toString())
          .attr('fill', '#2a2a2a')
          .attr('stroke', '#3a3a3a');

        // Add nodes
        svg
          .selectAll('circle')
          .data(nodes)
          .join('circle')
          .attr('cx', (d) => projection([d.long, d.lat])![0])
          .attr('cy', (d) => projection([d.long, d.lat])![1])
          .attr('r', 4)
          .attr('fill', '#0ea5e9')
          .attr('opacity', 0.6);
      });
  }, []);

  return (
    <div className="aspect-[2/1] w-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
