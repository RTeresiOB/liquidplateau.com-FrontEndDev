/** Bins.js */
import React from "react";
import * as d3 from "d3";

const Bins = ({
    binData, xScale, yScale, data, disableAnimation, ...props
  }) => {
    
    const handleOpacity = () =>
    {}
    
    // Need to make a child for each bin
    const Bins = binData.map((bin, d) =>
    <rect x={xScale(bin.x0)} y={yScale(bin.length / data.length)} 
    width={xScale(bin.x1) - xScale(bin.x0)}
    height={yScale(0) - yScale(bin.length / data.length)} 
    fill={d3.interpolateRdBu((xScale.domain()[1] - ((bin.x1 + bin.x0) / 2))/ (xScale.domain()[1] - xScale.domain()[0]))}
    opacity={.7}
    id={d}
    />
    
    )

    return(<g>
        {Bins}
    </g>)
  }

  export default Bins;