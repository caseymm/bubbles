$(document).ready(function() {
  $('#typeInfo').hide();
  $('#mostToLeast').hide();
  $('#bar').hide();
  d3.select("#unSort").classed("selected", true)
  bubbles();
  });

function bubbles() {
var w = 880,
    h = 600;

var svg = d3.select("#bubbles").append("svg:svg")
    .attr("width", w)
    .attr("height", h);


var commasFormatter = d3.format(",.0f");
var radius_scale = d3.scale.pow().exponent(0.5).domain([0, 107848]).range([2, 110]);

d3.json("data/hopeChildren.json", function(json) {
  var force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return d.students*-.013; })
    .nodes(json.children)
    .size([w, h])
    .links([])
    .start();
    
      

var node = svg.selectAll(".node")
        .data(json.children)
        .enter().append("svg:g")
        .attr("class", "node")
        .on('mouseover', function(d){
            var thisNode = d3.select(this);
            thisNode.select("text").style({opacity:'1.0'});
                    })
        .on('mouseout', function(d){
            var thisNode = d3.select(this);
            thisNode.select("text").style({opacity:'0.0'});
                    });

node.append("image")
      .attr("xlink:href", (function(d) { return d.img; }))
      .attr("x", function(d) { return (radius_scale(parseInt(d.students))*-1); })
      .attr("y", function(d) { return (radius_scale(parseInt(d.students))*-1); })
      .attr("width", function(d) { return (radius_scale(parseInt(d.students))*2); })
      .attr("height", function(d) { return (radius_scale(parseInt(d.students))*2); });     
      
node.append("svg:circle")
        //.attr("cx", function(d) { return d.x; })
        //.attr("cy", function(d) { return d.y; })
        .attr("title", function(d) { return d.colleges; })
        .attr("r", function(d) { return radius_scale(parseFloat(d.students)); })
        .attr("fill", function(d) { return d.fill; })
        .attr("stroke", function(d) { return d.stroke; })
        //.attr("id", (function(d) { return d.id+"ball"; }))
        .call(d3.helper.tooltip()
            .text(function(d){ return 'School: '+ d.college + '<br />Type of School: '+ d.type +'<br />HOPE Students: ' +commasFormatter(d.students) +'<br />Amount Awarded: $'+ commasFormatter(d.amount); })
        )
        .call(force.drag);        

node.append("text")
      .attr("id", (function(d) { return d.id+"text"; }))
      .attr("dx", 0)
      //.attr("dy", function(d) { return (radius_scale(parseInt(d.students))*.7); })
      .attr("dy", function(d) { return (radius_scale(parseInt(d.students))*.2); })
      .attr("text-anchor", "middle")
      .style("font-size", function(d) { return (radius_scale(parseFloat(d.students))*.4)+"px"; })
      .text(function(d) { return commasFormatter(d.students); });

svg.style("opacity", 1e-6)
  .transition()
    .duration(1000)
    .style("opacity", 1);
    
      
force.on("tick", function(e) {
      svg.selectAll("circle").attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")";})
         .on('mouseover', function(d){
          d3.select(this).transition().duration(300).style({opacity:'0.8'});
                    })
         .on('mouseout', function(d){
          d3.select(this).transition().duration(200).style({opacity:'0.0',});
                    });
      svg.selectAll("image").attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
      svg.selectAll("text").attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });

d3.select("#sort").on("click", function(e){
	force.resume();
    d3.select(".selected").classed("selected", false)
            d3.select(this).classed("selected", true)
  $('#typeInfo').show()
  $('#mostToLeast').hide()
  $('#bar').hide()
  force.on("tick", function(e) {
    svg.selectAll("circle").attr("r", function(d) { return radius_scale(parseInt(d.students));})
       .attr("id", (function(d) { return d.id+""; }))
       .attr("transform", function(d) { return "translate(" + d.xValue + "," + d.yValue + ")";})
       .on('mouseover', function(d){
          d3.select(this).transition().duration(300).style({opacity:'0.8'});
                    })
       .on('mouseout', function(d){
          d3.select(this).transition().duration(200).style({opacity:'0.0',});
                    });
    svg.selectAll("image")
      .transition().duration(100)
      .attr("x", function(d) { return (radius_scale(parseInt(d.students))*-1); })
      .attr("y", function(d) { return (radius_scale(parseInt(d.students))*-1); })
      .attr("width", function(d) { return (radius_scale(parseInt(d.students))*2); })
      .attr("height", function(d) { return (radius_scale(parseInt(d.students))*2); })
      .attr("transform", function(d) { return "translate(" + d.xValue + "," + d.yValue + ")";});
    svg.selectAll("text")
      .style("font-size", function(d) { return (radius_scale(parseInt(d.students))*.4)+"px";})
      .attr("dy", function(d) { return (radius_scale(parseInt(d.students))*.2); })
      .attr("transform", function(d) { return "translate(" + d.xValue + "," + d.yValue + ")";});
  force.resume();
  });
});
d3.select("#sortSize").on("click", function(e){
	force.resume();
    d3.select(".selected").classed("selected", false)
            d3.select(this).classed("selected", true)
  $('#typeInfo').hide()
  $('#mostToLeast').show()
  $('#bar').show()
  force.on("tick", function(e) {
    svg.selectAll("circle").attr("r", function(d) { return radius_scale(parseInt(d.students)*.25); })
      .attr("transform", function(d) { return "translate(" + d.xValueB + "," + d.yValueB + ")";})
      .attr("id", (function(d) { return d.id+"ball"; }))
      .on('mouseover', function(d){
          d3.select(this).transition().duration(200).style({opacity:'0.8'})
          $('#'+d.id+'bar').css( {"fill": ''+d.fill+'', "transition-duration": "200ms"} );
                    })
      .on('mouseout', function(d){
          d3.select(this).transition().duration(200).style({opacity:'0.0',})
          $('#'+d.id+'bar').css( {"fill": "#C2C2C2", "transition-duration": "200ms"} );
                    });
    svg.selectAll("image")
      .transition().duration(100)
      .attr("x", function(d) { return (radius_scale(parseInt(d.students))*-.5); })
      .attr("y", function(d) { return (radius_scale(parseInt(d.students))*-.5); })
      .attr("width", function(d) { return (radius_scale(parseInt(d.students))); })
      .attr("height", function(d) { return (radius_scale(parseInt(d.students))); })
      .attr("transform", function(d) { return "translate(" + d.xValueB + "," + d.yValueB + ")";});
    svg.selectAll("text")
      .style("font-size", function(d) { return (radius_scale(parseFloat(d.students))*.2)+"px";})
      .attr("dy", function(d) { return (radius_scale(parseInt(d.students))*.1); })
      .attr("transform", function(d) { return "translate(" + d.xValueB + "," + d.yValueB + ")";});
  force.resume();
  });
});
  
d3.select("#unSort").on("click", function(e){
	force.resume();
    d3.select(".selected").classed("selected", false)
            d3.select(this).classed("selected", true)
  $('#typeInfo').hide()
  $('#mostToLeast').hide()
  $('#bar').hide()
  force.on("tick", function(e) {
    svg.selectAll("circle")
       .attr("id", (function(d) { return d.id+""; }))
       .attr("r", function(d) { return radius_scale(parseInt(d.students));})
       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";})
       .on('mouseover', function(d){
          d3.select(this).transition().duration(300).style({opacity:'0.8'});
                    })
       .on('mouseout', function(d){
          d3.select(this).transition().duration(200).style({opacity:'0.0',});
                    });
       
    svg.selectAll("image").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";})
      .transition().duration(150)
      .attr("x", function(d) { return (radius_scale(parseInt(d.students))*-1); })
      .attr("y", function(d) { return (radius_scale(parseInt(d.students))*-1); })
      .attr("width", function(d) { return (radius_scale(parseInt(d.students))*2); })
      .attr("height", function(d) { return (radius_scale(parseInt(d.students))*2); })
      
      .each("end", function() { d3.select(this).transition().duration(0); });
   svg.selectAll("text")
      .style("font-size", function(d) { return (radius_scale(parseInt(d.students))*.4)+"px";})
      .attr("dy", function(d) { return (radius_scale(parseInt(d.students))*.2); })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});
  force.resume();
  });
 });
});
bar ();
};
