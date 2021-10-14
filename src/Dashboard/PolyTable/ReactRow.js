import React, {useState, useEffect, useContext} from "react"
import * as d3 from "d3";
import {SeletedPoliticianDispatch} from "../Dashboard"
export default function ReactRow(props){

    const SeletedPoliticianDispatchContext = useContext(SeletedPoliticianDispatch);
    const rowIdx = props.cells[0].getCellProps().key.match(/\d+/)[0];
    const [bgColor, setBgColor] = useState("white");
    const [textColor, setTextColor] = useState("Black");

    useEffect(() =>{
    setBgColor(SeletedPoliticianDispatchContext.value.selectedPoliticianIdx == parseInt(rowIdx)
                         ? colInterpolate(SeletedPoliticianDispatchContext.value.selectedPoliticianIdeology)
                         : "white");
    setTextColor(SeletedPoliticianDispatchContext.value.selectedPoliticianIdx == parseInt(rowIdx)
                         ? "white"
                         : "black");
}, [SeletedPoliticianDispatchContext.value.selectedPoliticianIdx]);
    const colInterpolate = (val) => {
        return d3.interpolateRdBu(1 - ((2 + parseFloat(val))/4));
    };
    const onHover = () => {
        props.cells.map(cell =>{
            if(Number(cell.value) == cell.value){
                // For now so I don't have to bring in domain assume -2 to 2
                SeletedPoliticianDispatchContext.setter(parseInt(cell.getCellProps().key.match(/\d+/)[0]));
                //SelectedPoliticianDispatchContext (parseInt(cell.getCellProps().key.match(/\d+/)[0]));
            }
        });
    }
    const onLeave = () => {
        SeletedPoliticianDispatchContext.setter(null);
    }
    const rowStyles = {
      "text-align": "center",
      padding: "30px",
      backgroundColor: bgColor,
      color: textColor
    };
    return(
        <tr key={props.key}
            role={props.role}
            style={rowStyles}
            onMouseEnter={() => onHover()}
            onMouseLeave={() => onLeave()}   >
                {props.children}
        </tr> 
    )

}