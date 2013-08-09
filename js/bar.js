var data;

var margin = {top: 20, right: 0, bottom: 130, left: 60},
    width = 880 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var commasFormatter = d3.format(",.0f");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(commasFormatter);

var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../data/hopeNums.json", function(json) {
  data = json;
  x.domain(data.map(function(d) { return d.abbr; }));
  y.domain([0, d3.max(data, function(d) { return +d.students; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")  
            .style("text-anchor", "middle")
            .style("font-size", "11px");
            /*.attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });*/

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
      //.text("Students");

d3.select("#addBar").on("click", function(e){
  svg.selectAll(".bar")
      .data(json)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("id", function(d) { return (d.id)+'bar'; })
      .attr("x", function(d) { return x(d.abbr); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.students); })
      .attr("height", function(d) { return height - y(d.students); })
      .call(d3.helper.tooltip()
            .text(function(d){ return 'School: '+ d.college + '<br />Type of School: '+ d.type +'<br />HOPE Students: ' +commasFormatter(d.students) +'<br />Amount Awarded: $'+ commasFormatter(d.amount); })
        )
      .on('mouseover', function(d){
          d3.select(this).transition().duration(200).style({opacity:'0.8', fill: d.fill})
          $('#'+d.id+'ball').css( {"opacity": "0.8", "transition-duration": "300ms"} )
          $('#'+d.id+'text').css( {"opacity": "1", "transition-duration": "300ms"} );
                    })
      .on('mouseout', function(d){
          d3.select(this).transition().duration(200).style({opacity:'1', fill:"#C2C2C2"})
          $('#'+d.id+'ball').css( {"opacity": "0.0", "transition-duration": "200ms"})
          $('#'+d.id+'text').css( {"opacity": "0.0", "transition-duration": "200ms"});
                    });
   
   svg.selectAll("rect")
      .attr("transform", "translate(850,0)")
      .transition()
      .delay(function (d){ return d.lineup * 300;})
      .duration(2000)
      .attr("transform", "translate(0,0)")
      .each("end", function() { d3.select(this).attr("transform", "translate(0,0)"); });

});  
     
});

function type(d) {
  d.students = +d.students;
  return d;
}