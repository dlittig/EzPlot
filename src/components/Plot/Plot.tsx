import React, { FC, useEffect } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../store/reducers";

const Plot: FC = () => {
  const plotReducer = useSelector<RootReducerType>(
    (state) => state.plotReducer
  );

  useEffect(() => {
    draw(plotReducer.sheet);
  }, [plotReducer]);

  const draw = (data) => {
    d3.select("#container").select("svg").remove();
    d3.select("#container").select(".tooltip").remove();

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#Plot-d3")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const tooltip = d3
      .select("#container")
      .append("div")
      .attr("class", "tooltip");

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);

    const line = d3
      .line()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15));
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f6c3d0")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15));
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    // Capture mouse events
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f6c3d0")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0)
      .on("mouseover", () => {
        focus.style("display", null);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(300).style("opacity", 0);
      })
      .on("mousemove", mousemove);

    const mousemove = (event) => {
      const bisect = d3.bisector((d) => d.label).left;
      const xPos = d3.mouse(this)[0];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];
      focus.attr(
        "transform",
        `translate(${xScale(d0.label)},${yScale(d0.value)})`
      );
      tooltip.transition().duration(300).style("opacity", 0.9);
      tooltip
        .html(d0.tooltipContent || d0.label)
        .style(
          "transform",
          `translate(${xScale(d0.label) + 30}px,${yScale(d0.value) - 30}px)`
        );
    };
  };

  return <div id="Plot-d3"></div>;
};

export default Plot;
