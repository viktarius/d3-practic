const dataset = [];
const svgWidth = screen.width - 10, svgHeight = 550, barPadding = 5;

for (let i = 0; i < 20; i++) {
    dataset.push(Math.round(Math.random() * (svgHeight - svgHeight * 0.5)))
}

const barWidth = svgWidth / dataset.length;

const svg = d3.select('body')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight]);

const bar = svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .style('fill', () => "hsl(" + Math.random() * 360 + ",100%,50%)")
    .attr('y', d => svgHeight - yScale(d))
    .attr('height', d => yScale(d))
    .attr('width', barWidth - barPadding)
    .attr('transform', (d, i) => {
        const translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
    });

const text = svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(d => d)
    .attr('y', (d, i) => d > 100 ? svgHeight - yScale(d) + 15 : svgHeight - yScale(d) - 2)
    .attr('x', (d, i) => (barWidth * i) + ((barWidth - barPadding) / 2) - (("" + d).length * 4));

console.log(dataset);
