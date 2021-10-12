/** Rule.js */
import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
 
const Rule = ({
  type, scale, hoverCoord, height, transform, disableAnimation, ...props
}) => {
  const ref = React.useRef(null);
  const line = d3.line()
  .x((d) => d[0])
  .y((d) => d[1]);

  var svg = d3.select("svg#KernelSVG");
  try{
  var correctedX = hoverCoord - svg.node().getBoundingClientRect().x - 65;
  } catch{
      hoverCoord = -999;
  }
  var coords = [[correctedX,0],[correctedX,-parseFloat(height)]];

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
    var colCoord = (scale.domain()[1] - scale.invert(correctedX) ) /  (scale.domain()[1] - scale.domain()[0])
    setCol(d3.interpolateRdBu(colCoord))
    }
  }, [scale, hoverCoord, transform, col, disableAnimation]);

  return <path ref={ref} d={line(coords)} transform={transform} stroke={col} {...props} />;
};
 
export default Rule;