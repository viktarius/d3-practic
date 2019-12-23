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
        .attr('height', height + margin.top + margin.bottom);

    const gRoot = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    const x = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([height, 0]);

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y);

    const scatter = gRoot.append('g')
        .attr('transform', 'translate(-3, -1)');

    const gX = gRoot.append('g')
        .call(xAxis)
        .attr('transform', 'translate(0, ' + height + ')');

    const gY = gRoot.append('g')
        .call(yAxis);

    scatter.selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', d => d.r)
        .attr('fill', '#3383FF');

    const zoomed = function () {
        const transform = d3.event.transform;
        console.log(transform);
        // rect.attr('transform', 'translate('+transform.toString()+')');
        gX.call(xAxis.scale(transform.rescaleX(x)));
        gY.call(yAxis.scale(transform.rescaleY(y)));
        const zoomX = transform.rescaleX(x);
        const zoomY = transform.rescaleY(y);
        scatter.selectAll('circle')
            .attr('cx', d => zoomX(d.x))
            .attr('cy', d => zoomY(d.y))
    };

    const zoom = d3.zoom()
        .on('zoom', zoomed);

    svg.call(zoom);

};

export default draw;
