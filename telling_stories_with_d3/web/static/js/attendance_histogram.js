import d3 from 'd3'

var margin = {top: 20, right: 20, bottom: 30, left: 40}
  , width  = 1240 - margin.left - margin.right
  , height = 600 - margin.top - margin.bottom
  , x      = d3.scale.ordinal().rangeBands([0, width])
  , x1     = d3.scale.ordinal()
  , y      = d3.scale.linear().range([height, 0])
  , color  = d3.scale.category10()
  , xAxis  = d3.svg.axis().scale(x).orient('bottom')
  , yAxis  = d3.svg.axis().scale(y).orient('left')

d3.json('/json/events.json', (error, json) => {
  var data = _munge(json)

  x.domain(data.map((d) => d.id))
  x1.domain(TOPICS).rangeRoundBands([0, x.rangeBand()])
  y.domain([0, d3.max(data, (d) => d.max)])

  var svg = d3.select('#attendance-histogram').append('svg')
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

  var bin = svg.selectAll('.bin')
      .data(data)
    .enter().append('g')
      .attr('class', 'bin')
      .attr('transform', (d) => `translate(${x(d.id)}, 0)`)

  bin.selectAll('rect')
      .data((d) => d.topics)
    .enter().append('rect')
      .attr('x', (d, i) => x1(d.name))
      .attr('width', x1.rangeBand())
      .attr('y', (d) => y(d.total))
      .attr('height', (d) => height - y(d.total))
      .style('fill', (d) => color(d.name))
})

function _munge(json) {
  var talks = json
    .map((d) => {
      return {name: d.name, topic: d.topic, total: d.rsvps.length}
    })

  var bins = {}

  talks.forEach((talk) => {
    bins[talk.total] = bins[talk.total] || {id: talk.total, max: 0, topics: []}
    if (!bins[talk.total][talk.topic])
      bins[talk.total][talk.topic] = []

    bins[talk.total][talk.topic].push(talk)
    var total = bins[talk.total][talk.topic].length
    if (total > bins[talk.total].max)
      bins[talk.total].max = total
  })

  var bins = Object.keys(bins).map((id) => {
    var bin = bins[id]
    TOPICS.forEach((topic) => {
      bin.topics.push({name: topic, total: (bin[topic]||[]).length})
    })

    return bin
  })

  window.talks = talks
  window.bins = bins

  return bins
}

const TOPICS = [
  "frontend",
  "technique",
  "technology",
  "discussion",
  "backend",
  "theory",
  "devops",
  "lightning",
  "security"
]
