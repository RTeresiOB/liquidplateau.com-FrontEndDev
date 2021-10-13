/** MultilineChart.js */
import React, { useEffect } from "react";
import Axis from "./Axis";
import Rule from "./Rule";
import Bins from "./Bins"
import readPolData from "./readPolData";
import useController from "./KernelDensityController";
 
const KernelDensityChart = ({ data=null, nthresholds=55, dimensions = {} }) => {
  //const [isLoaded, setIsLoaded] = React.useState(false);
  //const [data, setData] = React.useState(false);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const fullData = data;
  data = data.map(d=> parseFloat(d.Ideology));
  const controller = useController({ data, nthresholds, width, height });
  const { yTickFormat, xScale, yScale, yScaleForAxis, binData } = controller; // need to get controller working for scales
  const [mousePosition, setMousePosition] = React.useState({ x: null, y: null });
  const hasMovedCursor = typeof x === "number" && typeof y === "number";
  return (
    <>
    <svg id="KernelSVG" width={svgWidth} height={svgHeight} onMouseMove = {((ev) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })})}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Axis
          type="left"
          scale={yScaleForAxis}
          transform="translate(0, 0)"
          ticks={5}
          tickFormat={yTickFormat}
        />
        <Axis
          type="bottom"
          className="axisX"
          scale={xScale}
          transform={`translate(5, ${height - height/4.2})`} // Need to figure out what the deal is here and why chart hangs so low
          ticks={5}
        />
        <Rule 
          type="vertical"
          className="vertRule"
          scale={xScale}
          fullData={fullData}
          transform={`translate(10, ${height - height/4.2})`}
          hoverCoord={mousePosition.x ? (mousePosition.x) : -999}
          height={height}
          disableAnimation={false}
        />
        
        <Bins
          binData={binData}
          xScale={xScale}
          yScale={yScale}
          data={data}
          disableAnimation={false}
          />
          
      </g>
    </svg>
    </>
  );
}
 
export default KernelDensityChart;