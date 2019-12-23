import * as d3 from 'd3';
import {points} from "../data/points";

const margin = {top: 40, bottom: 40, left: 40, right: 40};
const width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

const data = [0, 5, 10, 15, 25, 50, 75, 100];

const draw = () => {
    const svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    const scaleX = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([0, width]);

    const scaleY = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([height, 0]);

    const x_axis = d3.axisBottom(scaleX)
        // .tick(10)
        // .scale(scaleX);

    const y_axis = d3.axisLeft(scaleY)
        // .tick(10)
        // .scale(scaleY);

    // const xAxis = d3.axisLeft(scaleX)
    //     .ticks(10)
    //     .tickSize(width);
    //
    // const yAxis = d3.axisLeft(scaleY)
    //     .ticks(10)
    //     .tickSize(width);

// const clip = svg.append("defs").append("SVG:clipPath")
//     .attr("id", "clip")
//     .append("SVG:rect")
//     .attr("width", width )
//     .attr("height", height )
//     .attr("x", 0)
//     .attr("y", 0);

    const scatter = svg.append('g')
        .attr("clip-path", "url(#clip)");

    const updateSize = () => {
        const newX = d3.event.transform.rescaleX(scaleX);
        const newY = d3.event.transform.rescaleY(scaleY);
        // console.log(newX(100));
        gX.call(x_axis.scale(newX));
        gY.call(y_axis.scale(newY));
        // console.log(x_axis.scale(76));
        scatter.selectAll('circle')
            .attr('cx', (d) => newX(d.x))
            .attr('cy', (d) => newY(d.y))
    };


    const zoom = d3.zoom()
        .scaleExtent([5, 10])
        .extent([0, 0], [width, height])
        .on('zoom', updateSize);

    const rect = svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style("pointer-events", "all")
        .call(zoom);

    const gX = svg.append('g')
        .call(x_axis)
        .attr('transform', 'translate(0, ' + height + ')');

    const gY = svg.append('g')
        .call(y_axis);

    scatter.selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('cx', d => scaleX(d.x))
        .attr('cy', d => scaleY(d.y))
        .attr('r', d => d.r)
        .attr('fill', '#3383FF');

    // scatter.call(zoom);

    // points.forEach(point => svg.append('circle')
    //     .attr('cx', scaleX(point.x))
    //     .attr('cy', scaleY(point.y))
    //     .attr('r', point.r)
    //     .attr('fill', '#3383FF')
    // )
};

export default draw;
