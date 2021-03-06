/** MultilineChart.js */
import React, { useEffect } from "react";
import Axis from "./Axis";
import Rule from "./Rule";
import Bins from "./Bins"
import readPolData from "./readPolData";
import useController from "./KernelDensityController";
 
const KernelDensityChart = ({ data=null, nthresholds=55, dimensions = {}, ruleType=null }) => {
  //const [isLoaded, setIsLoaded] = React.useState(false);
  //const [data, setData] = React.useState(false);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const fullData = data;
  data = data.map(d=> parseFloat(d.Ideology)).filter(data => Math.abs(data) < 4);
  const controller = useController({ data, nthresholds, width, height });
  const { yTickFormat, xScale, yScale, yScaleForAxis, binData } = controller; // need to get controller working for scales
  const [mousePosition, setMousePosition] = React.useState({ x: null, y: null });
  const hasMovedCursor = typeof x === "number" && typeof y === "number";
  return (
    <>
    <svg id="KernelSVG" style={{"display": "block",
                                "margin": "auto"}} 
        width={svgWidth} height={svgHeight} onMouseMove = {((ev) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })})}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Axis
          type="left"
          scale={yScale}
          transform="translate(-5, 0)"
          ticks={9}
          tickFormat={yTickFormat}
        />
        <Axis
          type="bottom"
          className="axisX"
          scale={xScale}
          transform={`translate(0, ${height})`} // Need to figure out what the deal is here and why chart hangs so low
          ticks={10}
        />
        <Rule 
          type={ruleType}
          className="vertRule"
          scale={xScale}
          fullData={fullData}
          transform={`translate(10, ${height})`}
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