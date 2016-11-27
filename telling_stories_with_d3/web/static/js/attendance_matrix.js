import d3 from 'd3'

var margin = {top: 60, right: 0, bottom: 0, left: 180}
  , width  = 1300 - margin.left - margin.right
  , height = 700 - margin.top - margin.bottom
  , x      = d3.scale.ordinal().rangeBands([0, width], 0.01)
  , y      = d3.scale.ordinal().rangeBands([height, 0])
  // , color  = d3.scale.category10()
  , color  = d3.scale.ordinal()

d3.json('/json/events.json', (error, events) => {
  d3.json('/json/members.json', (error, members) => {
    console.log(events);

    members = members.sort( (a,b) => a.member_id - b.member_id )
    events = events.sort( (a,b) => a.time - b.time )
    // events  = events.sort((a,b) => a.rsvps.length - b.rsvps.length)
    // events = events.sort((a,b) => a.)

    draw(events, members)
  })
})

function draw(events, members) {
  x.domain(members.map((d) => d.member_id))
  y.domain(events.map((d) => d.id))
  color
    .domain(['frontend', 'technique', 'technology', 'discussion', 'backend', 'theory', 'devops', 'lightning', 'security'])
    .range(['#D62728', '#1F77B4', '#E377C2', 'gray', '#FF7F0E', '#9467BD', '#2CA02C', '#BCBD22', '#17BECF'])

  var svg = d3.select('#attendance-matrix').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  var column = svg.selectAll('.column')
      .data(members)
    .enter().append('g')
      .attr('class', 'column')
      .attr('transform', (d) => `translate(${x(d.member_id)-x.rangeBand()/2}, 0)`)

  var box = column.selectAll('.box')
      .data((d) => d.talks)
    .enter().append('rect')
      .attr('class', 'box')
      .attr('y', (d) => y(d.id)-y.rangeBand()/2)
      // .attr('x', (d) => x(d.member_id)-x.rangeBand()/2)
      .attr('height', 4)
      .attr('width', 6)
      // .attr('fill', '#1F77B4')
      .attr('fill', (d) => color(d.topic))

      // .attr('width', x.rangeBand())
      // .attr('y', (d) => y(d.y1))
      // .attr('height', (d) => y(d.y0) - y(d.y1))

      // .attr('y', (d) => y(d.id))
      // .attr('height', y.rangeBand()-1)
      // .attr('width', )

  var columnLabels = svg.selectAll('.column-labels')
      .data(members)
    .enter().append('text')
      .attr('class', 'column-labels')
      .attr('x', y.rangeBand() / 2)
      .attr('y', (d) => x(d.member_id))
      .attr('dy', '.32em')
      .attr('text-anchor', 'start')
      .style('font-size', '6px')
      .attr('transform', `rotate(-90)`)
      .text((d) => d.name)

  var rowLabels = svg.selectAll('.row-labels')
      .data(events)
    .enter().append('text')
      .attr('class', 'row-labels')
      .attr('x', -5)
      .attr('y', (d) => y(d.id))
      .attr('dx', '.32em')
      .attr('text-anchor', 'end')
      .style('font-size', '6px')
      .text((d) => d.name)


  // svg.append('g')
  //   .attr('class', 'x axis')
  //   // .attr('transform', `translate(0, ${height})`)
  //   .call(xAxis)
  //
  // svg.append('g')
  //     .attr('class', 'y axis')
  //     .call(yAxis)
  //   .append('text')
  //     .attr('transform', 'rotate(-90)')
  //     .attr('y', 6)
  //     .attr('dy', '.71em')
  //     .style('text-anchor', 'end')
  //     .text('Attendance by topic')
}

function munge(json) {
  var data = json

  console.log(data);

  return data
}
