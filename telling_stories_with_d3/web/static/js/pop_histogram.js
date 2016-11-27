import d3 from 'd3'

var data = [
  {age:'january', population: 2704659},
  {age:'febuary', population: 4499890},
  {age:'march',   population: 2159981},
  {age:'april',   population: 3853788},
  {age:'may',     population: 14106543},
  {age:'june',    population: 8819342},
  {age:'july',    population: 612463}
]

var margin = {top: 10, right: 20, bottom: 30, left: 40}
  , width  = 1240
  , height = 700
  , x      = d3.scale.ordinal()
  , y      = d3.scale.linear()
  , xAxis  = d3.svg.axis().scale(x).orient('bottom')
  , yAxis  = d3.svg.axis().scale(y).orient('left').tickFormat(d3.format("04e"))

x.domain(data.map( (item) => item.age) ).rangeBands([0, width], 0.01)
y.domain([0, d3.max(data, (item) => item.population)]).range([height, 0])


var svg = d3.select('#pop-histogram').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Attendance by topic')

var bar = svg.selectAll('.bar')
    .data(data)
  .enter().append('g')
    .attr('transform', (d) => `translate(${x(d.age)}, 0)`)

bar.append('rect')
  .attr('class', 'bar')
  .attr('width', x.rangeBand())
  .attr('height', (d) => height - y(d.population))
  .attr('y', (d) => y(d.population))
  .attr('fill', 'steelblue')

bar.append('text')
  .attr('x', x.rangeBand()/2)
  .attr('y', (d) => y(d.population))
  .attr('text-anchor', 'middle')
  .attr('dy', '2em')
  .attr('fill', '#fff')
  .text((d) => d.population)
