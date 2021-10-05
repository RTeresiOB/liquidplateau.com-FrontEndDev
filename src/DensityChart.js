import * as d3 from 'd3'

var height = 500;
var width = 800;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});
var bins = 5;
var bandwidth = 7.0;

var data = [79,54, 74, 62, 85, 55, 88, 85, 51, 85, 54, 84, 78, 47, 83, 52, 62, 84, 52, 79,30,1,2,3,4,5,6,7,8,9,3,4,6,4,5,3,4,7,7,5,233,4,6,5];

console.log(Math.max(...[1,2,3,4]));
  function kde(kernel, thresholds, data) {
    return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
  }

  function epanechnikov(bandwidth) {
    return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
  }

  var line = d3.line()
    .curve(d3.curveBasis)
    .x(d => x(d[0]))
    .y(d => y(d[1]))

    var x = d3.scaleLinear()
    .domain([0,250]).nice()
    .range([margin.left, width - margin.right])
    var thresholds = x.ticks(40);
    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(thresholds)(data);

    const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) / data.length])
    .range([height - margin.bottom, margin.top])

    const xAxis = (g) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -6)
        .attr("fill", "#576")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text("TESTSTST"))

    const yAxis = (g) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "%"))
    .call(g => g.select(".domain").remove())

    var density = kde(epanechnikov(bandwidth), thresholds, data);




    d3.transition()
    .ease(d3.easeCubicOut)
    .duration(1500);

    var node = document.createElement('div');
    const svg = d3.select(node).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .style("-webkit-tap-highlight-color", "transparent")
        .on("mousemove touchmove", function(event, d){moved(event, d)});

    svg.append("g")
        .append("line")
          .attr("y1", height)
          .attr("y2", 0)
          .attr("stroke", "black");

        function update(point) {
            console.log(point);
            svg.append("g")
        .append("line")
          .attr("y1", height)
          .attr("y2", 0)
          .attr("stroke", "black")
          .attr("transform", `translate(${x(point) + 0.5},0)`);
            //svg.property("value", point).dispatch("input");
          }
        function moved(event) {
            update(x.invert(d3.pointer(event, this)[0])); // Pointer works, translate not added
           // d3.event.preventDefault();
          }
    

    svg.append("g")
        .attr("fill", "#bbb")
      .selectAll("rect")
      .data(bins)
      .join("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("y", d => y(d.length / data.length))
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("height", d => y(0) - y(d.length / data.length));
  
    svg.append("path")
        .datum(density)
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("d", line);
  
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);


  //var node = chart();

  export default node;