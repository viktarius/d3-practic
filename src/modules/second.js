import * as d3 from 'd3';
import {points} from "../data/points";

const margin = {top: 40, bottom: 40, left: 40, right: 40};
const width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

const data = [0, 5, 10, 15, 25, 50, 75, 100];

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

const x_axis = d3.axisBottom()
    .scale(scaleX);

const y_axis = d3.axisLeft()
    .scale(scaleY);

const draw = () => {
    svg.append('g')
        .call(x_axis)
        .attr('transform', 'translate(0, ' + height + ')');

    svg.append('g')
        .call(y_axis);

    points.forEach(point => svg.append('circle')
        .attr('cx', scaleX(point.x))
        .attr('cy', scaleY(point.y))
        .attr('r', point.r)
        .attr('fill', '#3383FF')
    )
};

export default draw;
