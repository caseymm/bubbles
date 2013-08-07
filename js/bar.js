var data;

var margin = {top: 20, right: 20, bottom: 30, left: 80},
    width = 830 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(",.0f");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../data/hopeNums.json", function(json) {
  data = json;
  x.domain(data.map(function(d) { return d.college; }));
  y.domain([0, d3.max(data, function(d) { return d.students; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Students");

  svg.selectAll(".bar")
      .data(json)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("id", function(d) { return (d.id); })
      .attr("x", function(d) { return x(d.college); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.students); })
      .attr("height", function(d) { return height - y(d.students); });
      
  svg.selectAll("rect")
      .on("click", function(d) { d3.select(this).style({fill: '#FAAE0A', stroke: '#F08C00', opacity:'0.5', 'stroke-width':'3px'})});

});

function type(d) {
  d.students = +d.students;
  return d;
}