/* Dashboard.js*/

/* Controls orientation and data loading for all dashboard graphs */

import React, { useState, useEffect, useReducer } from "react";
import readPolData from "./KernelDensity/readPolData";
import KernelDensityChart from "./KernelDensity/KernelDensityChart";
import PolyTable from "./PolyTable/PolyTable"


export const  SeletedPoliticianDispatch = React.createContext(null);
export default function Dashboard(props) {
    // Define dimensions for kernelDensity (this will have to be scaled by window dimensions)
    const kernelDimensions = {
        width: 800,
        height: 500,
        margin: {
          top: 30,
          right: 30,
          bottom: 30,
          left: 50
        }
      };

    const selectPoliticanReducer = (idx) =>
      {
          return {selectedPolitician:idx};
      }

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [selectedPolitician, setSelectedPolitician] = useReducer(selectPoliticanReducer,{selectedPolitician:null});
    if(data ===null){
        readPolData("data/scores.csv", false).then((result) => {return(result);}).then((result) =>
         {setData(result);});
    }
    useEffect(() => {
        if((data instanceof Promise) | (data === null)){
            console.log("1");
            ;//setIsLoaded(true);
        } else{
            setIsLoaded(true);
        }
    },[data]);

    if(isLoaded){
        console.log(setSelectedPolitician)
        return(
            <>
                <SeletedPoliticianDispatch.Provider value={setSelectedPolitician}>
                    <KernelDensityChart data={data} dimensions={kernelDimensions} 
                                        politician={selectedPolitician} />
                    <PolyTable  data={data}
                                politician={selectedPolitician} />
                </SeletedPoliticianDispatch.Provider>
            </>);
    } else{
        return(
            <>
                <p>Loading...</p>
            </>
            );
    }
}
