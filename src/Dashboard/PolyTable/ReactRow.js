import React, {useState, useEffect, useContext} from "react"
import * as d3 from "d3";
import {SeletedPoliticianDispatch} from "../Dashboard"
export default function ReactRow(props){

    const SeletedPoliticianDispatchContext = useContext(SeletedPoliticianDispatch);
    const rowIdx = props.cells[0].getCellProps().key.match(/\d+/)[0];
    const [bgColor, setBgColor] = useState("white");
    const [textColor, setTextColor] = useState("Black");
    const [rowSelectedCol, setRowSelectedCol] = useState('rgba(0,0,0,0)');

    useEffect(() =>{

    setBgColor(SeletedPoliticianDispatchContext.value.selectedPoliticianIdx == parseInt(rowIdx)
                         ? colInterpolate(SeletedPoliticianDispatchContext.value.selectedPoliticianIdeology)
                         : rowSelectedCol);
    setTextColor(SeletedPoliticianDispatchContext.value.selectedPoliticianIdx == parseInt(rowIdx)
                         ? "white"
                         : "black");
}, [SeletedPoliticianDispatchContext.value.selectedPoliticianIdx]);

useEffect(() =>{
    (SeletedPoliticianDispatchContext.value.selectedPoliticianIdxArray.includes(parseInt(rowIdx))
    ? setRowSelectedCol('rgba('+ colInterpolate(SeletedPoliticianDispatchContext.value.selectedPoliticianIdeology).substring(4,colInterpolate(SeletedPoliticianDispatchContext.value.selectedPoliticianIdeology).length - 1)  + ',.35)')
     : setRowSelectedCol("white"))
},[SeletedPoliticianDispatchContext.value.selectedPoliticianArray])
    const colInterpolate = (val) => {
        return d3.interpolateRdBu(1 - ((2 + parseFloat(val))/4));
    };
    const onHover = () => {
        props.cells.map(cell =>{
            if(Number(cell.value) == cell.value){
                // For now so I don't have to bring in domain assume -2 to 2
                SeletedPoliticianDispatchContext.setter([parseInt(cell.getCellProps().key.match(/\d+/)[0]),false]);
                //SelectedPoliticianDispatchContext (parseInt(cell.getCellProps().key.match(/\d+/)[0]));
            }
        });
    }
    const onLeave = () => {
        SeletedPoliticianDispatchContext.setter([null,false]);
    }
    const onClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var cell2 = null;
        props.cells.map(cell =>{
            if(Number(cell.value) == cell.value){
                cell2= cell;
            }
        });
        SeletedPoliticianDispatchContext.setter([parseInt(cell2.getCellProps().key.match(/\d+/)[0]),true]);
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
            onMouseEnter={() => {console.log("hover");onHover()}}
            onMouseLeave={() => {console.log("leave");onLeave()}}
            onClick={(e) =>{onClick(e)}}   >
                {props.children}
        </tr> 
    )

}