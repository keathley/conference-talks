import $ from 'jquery'
import d3 from 'd3'

var good            = d3.random.normal(600, 250)
  , best            = d3.random.normal(50, 20)
  , bad             = d3.random.normal(3000, 1500)
  , serverResponses = []

for(var i = 0; i < 400; i++)
  serverResponses.push( best() )

for(var i = 0; i < 400; i++)
  serverResponses.push( good() )

for(var i = 0; i < 100; i++)
  serverResponses.push( bad() )

// serverResponses = serverResponses.filter((d) => d > 2000)

var margin      = {top: 20, right: 20, bottom: 30, left: 40}
  , width       = 1240 - margin.left - margin.right
  , height      = 700 - margin.top - margin.bottom
  , x           = d3.scale.linear()
  , y           = d3.scale.linear()
  , xAxis       = d3.svg.axis().scale(x).orient('bottom')
  , yAxis       = d3.svg.axis().scale(y)
  , formatCount = d3.format(',.0f')

var _data = d3.layout.histogram()
  .bins(30)
  (serverResponses)

// x.domain([0, d3.max(_data, (d) => d.x)]).range([0, width])
x.domain([0, 1500]).range([0, width])
y.domain([0, d3.max(_data, (d) => d.y)]).range([height, 0])

var svg = d3.select('#averages-histogram').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)

function update(data) {
  x.domain([0, d3.max(data, (d) => d.x)])
  y.domain([0, d3.max(data, (d) => d.y)])

  var bar = svg.selectAll('.bar')
      .data(data)

  bar.enter().append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => `translate(${x(d.x)}, ${y(d.y)})`)

  bar.append('rect')
    .attr('x', 1)
    .attr('width', x(data[0].dx) -1)
    .attr('height', (d) => height - y(d.y))
    .attr('fill', '#4682b4')

  bar.append('text')
    .attr('dy', '.75em')
    .attr('y', 6)
    .attr('x', x(data[0].dx) / 2)
    .attr('text-anchor', 'middle')
    .text((d) => formatCount(d.y))

      // .attr('y', y(0))
      // .attr('height', height - y(0))

  // bar.transition()
  //   .duration(300)
  //     .attr('x', (d) => x(d.x))
  //     .attr('width', x(data[0].dx) - 1)
  //     .attr('y', (d) => y(d.y))
  //     .attr('height', (d) => height - y(d.y))
}

update(_data);

$(document).on('keydown', (e) => {
  if (e.which == 83)
    for (var i = 0; i < 500; i++)
      serverResponses.push( bad() )
})
