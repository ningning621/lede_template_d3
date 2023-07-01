function drawBarChart(svgClass) {
  // This gives you access to the correct svg through the className
  let svg = d3.select(svgClass);

  let width = 900;
  let height = 300;
  let margin = 25;
  let marginBottom = margin * 2;

  let data = [
    { "day": "Sunday", "value": 5 },
    { "day": "Monday", "value": 25 },
    { "day": "Tuesday", "value": 23 },
    { "day": "Wednesday", "value": 9 },
    { "day": "Thursday", "value": 18 },
    { "day": "Friday", "value": 30 },
    { "day": "Saturday", "value": 25 },
  ]


  // Set x and y scale
  let xScale = d3.scaleBand()
    .range([margin * 4, width - margin * 4])
    .domain(data.map(d => d["day"]))
    .padding(0.2);

  let yScale = d3.scaleLinear()
    .range([height - marginBottom, marginBottom])
    .domain([0, d3.max(data.map(d => d["value"]))]);


  // Draw Bars
  svg.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return xScale(d["day"]); })
    .attr("y", function (d) { return yScale(d["value"]); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) { return (height - marginBottom) - yScale(d["value"]); })
    .attr("fill", "#FFD1C2");

  // Add x-scale labels
  svg.append("g")
    .attr("transform", "translate(0," + (height - marginBottom) + ")")
    .call(d3.axisBottom(xScale))
    .call(g => g.select(".domain").remove())
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")

  // Add y-scale labels
  svg.append("g")
    .attr("transform", "translate(" + (margin * 4) + ",0)")
    .call(d3.axisLeft(yScale).ticks(5))
    .call(g => g.select(".domain").remove());

}