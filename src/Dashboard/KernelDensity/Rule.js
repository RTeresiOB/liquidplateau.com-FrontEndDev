/** Rule.js */
import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
 
const Rule = ({
  type, scale, hoverCoord, fullData, height, transform, disableAnimation, ...props
}) => {
  const ref = React.useRef(null);
  const line = d3.line()
  .x((d) => d[0])
  .y((d) => d[1]);

  const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]
  const argMin = argFact((max, el) => (el[0] < max[0] ? el : max))
  var svg = d3.select("svg#KernelSVG");
  try{
  var correctedX = hoverCoord - svg.node().getBoundingClientRect().x - 65;
  } catch{
      hoverCoord = -999;
  }
  var selectedPolitician = argMin(fullData.map(datum => Math.abs(datum.Ideology - scale.invert(correctedX))));
  var coords = [[scale(fullData[selectedPolitician].Ideology),0],[scale(fullData[selectedPolitician].Ideology),-parseFloat(height)]];
  
  const [col, setCol] = React.useState("white")
  React.useEffect(() => {
    //const xCoord = scale(hoverCoord);
    const Group = d3.select(ref.current);
    if (disableAnimation) {
      ;
    } else {
      ;//Group.transition().duration(750).ease(d3.easeLinear).call(xCoord);
    }
    if(hoverCoord != -999){
    var colCoord = (scale.domain()[1] - fullData[selectedPolitician].Ideology ) /  (scale.domain()[1] - scale.domain()[0])
    setCol(d3.interpolateRdBu(colCoord))
    }
  }, [scale, hoverCoord, transform, col, disableAnimation]);

  return <path ref={ref} d={line(coords)} transform={transform} stroke={col} {...props} />;
};
 
export default Rule;