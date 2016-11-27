import $ from 'jquery'

var good            = d3.random.normal(600, 250)
  , best            = d3.random.normal(50, 20)
  , bad             = d3.random.normal(3000, 1500)
  , serverResponses = []
  , data            = []
  , n               = 243

for(var j = 0; j < n; j++) {
  for(var i = 0; i < 1000; i++)
    serverResponses.push( best() )

  for(var i = 0; i < 200; i++)
    serverResponses.push( good() )

  for(var i = 0; i < 100; i++)
    serverResponses.push( bad() )

  var avg = serverResponses.reduce((acc, d) => acc+d, 0) / serverResponses.length

  data.push({time: j, avg: avg})
}

var margin   = {top: 10, right: 20, bottom: 30, left: 40}
  , width    = 1240
  , height   = 700
  , duration = 750
  , now      = new Date(Date.now() - duration)
  , xScale   = d3.scale.linear()
  , yScale   = d3.scale.linear()
  , X        = (d, i) => xScale(d.time)
  , Y        = (d) => yScale(d.avg)
  , xAxis    = d3.svg.axis().scale(xScale).orient('bottom')
  , yAxis    = d3.svg.axis().scale(yScale).orient('left')
  , line     = d3.svg.line().interpolate('basis').x(X).y(Y)

// xScale.domain([now - (243 - 2) * duration, now - duration])
//   .range([0, width])
//   .ticks(d3.time.second, 5)

xScale.domain([20, n]).range([0, width])
yScale.domain([320, 400]).range([height, 0])

var svg = d3.select('#averages').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('defs').append('clipPath')
    .attr('id', 'clip')
  .append('rect')
    .attr('width', width)
    .attr('height', height)

var axis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)

var yAxisG = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)

yAxisG
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Avg. Response time (ms)')

var path = svg.append('g')
    .attr('clip-path', 'url(#clip)')
  .append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)

var transition = d3.select({}).transition()
  .duration(750)
  .ease('linear') ;

// function tick() {
//   transition = transition.each(function() {
//     now = new Date()
//     xScale.domain([now - (n - 2) * duration, now - duration])
//     yScale.domain([0, d3.max(data)])
//
//     var point =
//
//     if (serverResponses.length > 100) {
//       var avg = serverResponses.reduce((acc, d) => acc+d, 0) / serverResponses.length
//       serverResponses = []
//       data.push( avg )
//     }
//
//     svg.select('.line').attr('d', line).attr('transform', null)
//
//     axis.call(xAxis)
//     yAxisG.call(yAxis)
//
//     path.transition()
//       .attr('transform', `translate(${xScale(now - (n-1) * duration)},0)`)
//
//     data.shift()
//   }).transition().each('start', tick)
// }
//
// tick();

$(document).on('keydown', (e) => {
  if (e.which == 83)
    serverResponses.push( bad() )
})

$('.js-add-slow-response').on('click', (e) => {
  serverResponses.push( bad() )
})
