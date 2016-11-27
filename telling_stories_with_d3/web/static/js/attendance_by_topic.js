import d3 from 'd3'
import d3Tip from 'd3-tip'
import $ from 'jquery'

var margin = {top: 100, right: 20, bottom: 30, left: 40}
  , width  = 1240 - margin.left - margin.right
  , height = 700 - margin.top - margin.bottom
  , x      = d3.scale.ordinal()
  , y      = d3.scale.linear()
  , color  = d3.scale.category10()
  , topic  = d3.scale.linear()
  , xAxis  = d3.svg.axis().scale(x).orient('bottom').ticks(0)
  , yAxis  = d3.svg.axis().scale(y).orient('left')
  , X      = (d) => x(d.id)
  , Y      = (d) => y(d.attended)
  , line   = d3.svg.line().interpolate('basis').x(X).y(Y)
  , data   = null

var tip = d3Tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html((d) => {
    return `
    <strong>${d.name}</strong><br />
    <span style='color: red;'>${d.topic}</span><br>
    <span>${d.attended}</span>
    `
  })

d3.json('/json/events.json', (error, json) => {
  data = munge(json)

  x.domain(data.map((d) => d.id)).rangeBands([0, width], 0.1)
  y.domain([0, d3.max(data, (d) => d.attended)]).range([height, 0])
  topic.domain([0, d3.max(TOPICS, (d) => d.total)]).range([20, 50])

  var svg = d3.select('#attendance-by-topic').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  svg.call(tip)

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
      .text('Attendance')

  var bar = svg.selectAll('.bar')
      .data(data)

  bar.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.id))
      .attr('y', (d) => y(d.attended))
      .attr('width', x.rangeBand())
      .attr('height', x.rangeBand())
      .attr('fill', (d) => color(d.topic))
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

  // var l = svg.append('path')
  //   .datum(data)
  //   .attr('class', 'line')
  //   .attr('d', line)
  //   .attr('fill', '#000')
  //   .attr('stroke', '#000')

  var legend = svg.selectAll('.leged')
      .data(TOPICS)
    .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0, ${i*10})`)

  legend.append('rect')
    .attr('x', 20)
    .attr('width', (d) => topic(d.total))
    .attr('height', 9)
    .style('fill', (d) => color(d.name))

  legend.append('text')
    .attr('x', (d) => topic(d.total) + 24)
    .attr('text-anchor', 'start')
    .attr('dy', 8)
    .text((d) => d.name)

  $('.js-sort-topics').on('click', (e) => {
    var sorted = data.sort((a, b) => a.attended - b.attended).map((d) => d.id)
      , x0 = x.domain(sorted).copy()
      , transition = svg.transition().duration(500)
      , delay = (d, i) => i * 5

    svg.selectAll('.bar').sort((a, b) => x0(a.id) - x0(b.id))

    transition.selectAll('.bar')
      .delay(delay)
      .attr('x', (d) => x0(d.id))

    // svg.select('.line')
    //   .datum(data)
    //   .attr('class', 'line')
    //   .attr('d', line)
  })
});

function munge(json) {
  json.forEach((d) => { d.attended = d.rsvps.length })
  json.forEach((d, i) => { d.x = i })
  json = json.sort((a,b) => a.time - b.time)

  return json
}

const TOPICS = [
  {
    "name": "frontend",
    "total": 17
  },
  {
    "name": "technique",
    "total": 16
  },
  {
    "name": "technology",
    "total": 14
  },
  {
    "name": "discussion",
    "total": 14
  },
  {
    "name": "backend",
    "total": 11
  },
  {
    "name": "theory",
    "total": 8
  },
  {
    "name": "devops",
    "total": 7
  },
  {
    "name": "lightning",
    "total": 3
  },
  {
    "name": "security",
    "total": 1
  }
]
