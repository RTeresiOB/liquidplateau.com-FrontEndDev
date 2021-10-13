/** MultilineChart.controller.js */
import { useMemo } from "react";
import * as d3 from "d3";
 
const useController = ({ data, nthresholds, width, height }) => {
    /*
  const xMin = useMemo(
    () => d3.min(data, ({ items }) => d3.min(items, ({ date }) => date)),
    [data]
  )
  */

  function kde(kernel, thresholds, data) {
    return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
  }

  function epanechnikov(bandwidth) {
    return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
  }
  const xMin = useMemo(
    () => { return d3.min(data);});
  const xMax = useMemo(
    () => d3.max(data));
    /*, ({ items }) => d3.max(items, ({ date }) => date)),
    [data]
  )*/;

  const xScale = useMemo(
    () => d3.scaleLinear().domain([xMin, xMax]).nice().range([0, width]),
    [xMin, xMax, width]
  );
  var thresholds = xScale.ticks(nthresholds);
  var binData = d3.histogram()
        .domain(xScale.domain())
        .thresholds(thresholds)(data);
  const yMin = useMemo(
    () => 0,
    [data]
  );
  const y = d3.scaleLinear()
    .domain([0, d3.max(binData, d => d.length) / data.length])
    .range([height, 0])
  const yMax = useMemo(
    () => d3.max(binData, (d => d.length / data.length)),
    [data]
  );
  const yScale = useMemo(() => {
    const indention = (yMax - yMin) * 0.5;
    return d3.scaleLinear()
      .domain([yMin - indention, yMax + indention])
      .range([height, 0]);
  }, [height, yMin, yMax]);
  const yScaleForAxis = useMemo(
    () => d3.scaleBand().domain([yMin, yMax]).range([height, 0]),
    [height, yMin, yMax]
  );
  const yTickFormat = (d) =>
    `${parseFloat(d) > 0 ? "+" : ""}${d3.format(".2%")(d )}`;
 
  return {
    yTickFormat,
    xScale,
    yScale,
    yScaleForAxis,
    binData
  };
};
 
export default useController;