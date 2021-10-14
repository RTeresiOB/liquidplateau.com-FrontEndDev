/* Dashboard.js*/

/* Controls orientation and data loading for all dashboard graphs */

import React, { useState, useEffect, useReducer } from "react";
import readPolData from "./KernelDensity/readPolData";
import KernelDensityChart from "./KernelDensity/KernelDensityChart";
import MemoizedPolyTable from "./PolyTable/PolyTable"


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

    const selectPoliticanReducer = (currentState, idx) =>
    {
          if( idx === null ){
            return {"selectedPoliticianIdx":null,
            "selectedPoliticanScreen": null,
            "selectedPoliticianIdeology": null};
        }
        else {
          return {"selectedPoliticianIdx":idx,
                  "selectedPoliticanScreen": data[idx].ScreenName,
                  "selectedPoliticianIdeology": data[idx].Ideology};
      }
    }

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [selectedPolitician, setSelectedPolitician] = useReducer(selectPoliticanReducer,{"selectedPolitician":null,
                                                                                           "selectedPoliticanScreen": null,
                                                                                           "selectedPoliticianIdeology": null})
    if(data ===null){
        readPolData("data/scores.csv", false).then((result) => {return(result);}).then((result) =>
         {setData(result);});
    }
    console.log("SelectedPoliticianIdx:",selectedPolitician.selectedPolitician);
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
                <SeletedPoliticianDispatch.Provider value={{"setter":setSelectedPolitician,
                                                            "value": selectedPolitician}}>
                    <KernelDensityChart data={data} dimensions={kernelDimensions} />
                    <MemoizedPolyTable  data={data}/>
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
