/** Rule.js */
import React, {useContext} from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import {SeletedPoliticianDispatch} from "../Dashboard"
 
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
  var correctedX = hoverCoord - svg.node().getBoundingClientRect().x - 103;
  } catch{
      hoverCoord = -999;
  }
  const SeletedPoliticianDispatchContext = useContext(SeletedPoliticianDispatch);
  try{
    if(SeletedPoliticianDispatchContext.value.selectedPoliticianIdx){
      var selectedPolitician = SeletedPoliticianDispatchContext.value.selectedPoliticianIdx;
      hoverCoord=0;
    } else{
      if(SeletedPoliticianDispatchContext.value.selectedPoliticianIdx != 0){ // Terribly hacky but works (ugh)
      var selectedPolitician = argMin(fullData.map(datum => Math.abs(datum.Ideology - scale.invert(correctedX))));
      } else{
        var selectedPolitician = SeletedPoliticianDispatchContext.value.selectedPoliticianIdx;
        hoverCoord=0;
      }
    }
  } catch {
    var selectedPolitician = argMin(fullData.map(datum => Math.abs(datum.Ideology - scale.invert(correctedX))));
  }
  /*SeletedPoliticianDispatchContext.value.selectedPoliticianIdx ===null ?
  argMin(fullData.map(datum => Math.abs(datum.Ideology - scale.invert(correctedX)))) :
  SeletedPoliticianDispatch.value.selectedPoliticianIdx;
  */

  var coords = type===parseFloat(type) 
    ? [[scale(type)-9,0],[scale(type)-9,-parseFloat(height)]]
    : [[scale(fullData[selectedPolitician].Ideology)-9,0],[scale(fullData[selectedPolitician].Ideology)-9,-parseFloat(height)]];
  
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
  }, [scale, hoverCoord, transform, col, selectedPolitician, disableAnimation]);

  if(type===null){
    return(<>
    </>)
  } else if(type===parseFloat(type)){
    return(
    <>
  <path d={line(coords)} transform={transform} stroke={"black"} {...props} />;
  <g style={{zIndex:999}}>
  <text x={coords[0][0]+15} y="29"
            font-family="'Lucida Grande', sans-serif"
            font-size="12"
            style={{zIndex:999}}>
              {hoverCoord != -999 ? "Your score is:"+ type.toFixed(2) : "" }

      </text>
    </g>
    </>
    )
  } else{
  return( 
    <>
  <path ref={ref} d={line(coords)} transform={transform} stroke={col} {...props} />;
    <text x={coords[0][0]+15} y="29"
            font-family="'Lucida Grande', sans-serif"
            font-size="12">
              {hoverCoord != -999 ? fullData[selectedPolitician].ScreenName : "" }

      </text>
    </>
  )
}
};
 
export default Rule;