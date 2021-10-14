import React, {useState, useContext} from "react"
import * as d3 from "d3";
import {SeletedPoliticianDispatch} from "../Dashboard"
export default function ReactRow(props){

    const SeletedPoliticianDispatchContext = useContext(SeletedPoliticianDispatch);
    console.log("Context:", SeletedPoliticianDispatchContext);
    const [color, setColor] = React.useState("");
    const [textColor, setTextColor] = React.useState("");
    const onHover = () => {
        props.cells.map(cell =>{
            if(Number(cell.value) == cell.value){
                // For now so I don't have to bring in domain assume -2 to 2
                var colVal = 1 - ((2 + parseFloat(cell.value))/4)
                setColor(d3.interpolateRdBu(colVal));
                setTextColor("white");
                SeletedPoliticianDispatchContext(parseInt(cell.getCellProps().key.match(/\d+/)[0]));
                //SelectedPoliticianDispatchContext (parseInt(cell.getCellProps().key.match(/\d+/)[0]));
            }
        });
    }
    const onLeave = () => {
        setColor("");
        setTextColor("");
    }
    const rowStyles = {
      "text-align": "center",
      padding: "30px",
      backgroundColor: color,
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