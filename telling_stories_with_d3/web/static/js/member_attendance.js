import d3 from 'd3'

var margin = {top: 20, right: 20, bottom: 30, left: 40}
  , width  = 1240 - margin.left - margin.right
  , height = 700 - margin.top - margin.bottom
  , x      = d3.scale.ordinal().rangeBands([0, width], 0.01)
  , y      = d3.scale.linear().range([height, 0])
  , topic  = d3.scale.linear()
  , color  = d3.scale.category10()
  , xAxis  = d3.svg.axis().scale(x).orient('bottom')
  , yAxis  = d3.svg.axis().scale(y).orient('left')

d3.json('/json/members.json', (error, json) => {
  var data = _munge(json)

  window.members = json

  d3.json('/json/topics.json', (error, _json) => {
    window.topics = _json
  })

  x.domain(data.map((d) => d.member_id))
  y.domain([0, d3.max(data, (d) => d.total)])
  topic.domain([0, d3.max(TOPICS, (d) => d.total)]).range([20, 50])

  var svg = d3.select('#members-attendance').append('svg')
    .attr('width', width + margin.left + margin.right)
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

  var member = svg.selectAll('.member')
      .data(data)
    .enter().append('g')
      .attr('class', 'g')
      .attr('transform', (d) => `translate(${x(d.member_id)}, 0)`)

  member.selectAll('rect')
      .data((d) => d.topics)
    .enter().append('rect')
      .attr('width', x.rangeBand())
      .attr('y', (d) => y(d.y1))
      .attr('height', (d) => y(d.y0) - y(d.y1))
      .style('fill', (d) => color(d.name))

  var legend = svg.selectAll('.legend')
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
})

function _munge(json) {
  var members = json.filter((d) => d.total >= 3).sort(byRatio)

  members.forEach((member) => {
    var y0 = 0
    member.topics = member.topics
      .filter((d) => d.name != 'security')
      .map((topic) => {
        return {name: topic.name, y0: y0, y1: y0 += topic.ratio}
      })
    member.total = member.topics[member.topics.length-1].y1
  })

  return members

  function byRatio(a, b) {
    return a.total - b.total
  }
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
