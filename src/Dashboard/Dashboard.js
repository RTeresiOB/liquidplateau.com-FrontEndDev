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
        width: 500,
        height: 300,
        margin: {
          top: 30,
          right: 100,
          bottom: 20,
          left: 100
        }
      };

    const selectPoliticanReducer = (currentState, idx) =>
    {
        console.log(idx);
          if( idx === null ){
              console.log("test1");
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
    const [isDistLoaded, setIsDistLoaded] = useState(false);
    const [distData, setDistData] = useState(null);

    const [selectedPolitician, setSelectedPolitician] = useReducer(selectPoliticanReducer,{"selectedPolitician":null,
                                                                                           "selectedPoliticanScreen": null,
                                                                                           "selectedPoliticianIdeology": null})
    if(data === null){
        readPolData("data/scores.csv", false, false).then((result) => {return(result);}).then((result) =>
         {setData(result);});
    }
    if(distData === null){
        readPolData("data/ideologyForDashboard.csv", true, false).then((result) => {return(result);}).then((result) =>
         {setDistData(result);});
    }
    useEffect(() => {
        if((data instanceof Promise) | (data === null)){
            ;//setIsLoaded(true);
        } else{
            setIsLoaded(true);
        }
        if((distData instanceof Promise) | (distData === null)){
            ;//setIsLoaded(true);
        } else{
            setIsDistLoaded(true);
        }
    },[data, distData]);

    if(isLoaded & isDistLoaded){
        return(
            <>
                <h1 style={{"text-align": "center",
                            "font-size":"2vw"}}>Twitter Ideology Estimates Using PCA of User Following Matrices</h1>
                <SeletedPoliticianDispatch.Provider value={{"setter":setSelectedPolitician,
                                                            "value": selectedPolitician}}>
                    <div>
                        <div style={{"width":"50%",
                                      "position":"fixed",
                                      "left": "0"}}>
                            <h3 style={{"text-align": "center"}}> Ideology Estimates of Political Accounts </h3>
                            <div style={{"display": "block",
                                        "margin-left": "auto",
                                        "margin-right": "auto"}}>
                                <KernelDensityChart id="politicians" data={data} 
                                                    dimensions={kernelDimensions}
                                                    ruleType={"vertical"} />
                                <MemoizedPolyTable  data={data}/>
                            </div>
                        </div>
                        <div style={{"width":"50%",
                                      "position":"fixed",
                                      "right": "0"}}>
                            <h3 style={{"text-align": "center"}}> Ideological Distribution of Twitter Users Engaged in BLM Discourse </h3>
                            <KernelDensityChart id="users" data={distData}
                                                dimensions={kernelDimensions}
                                                ruleType={null} />
                        </div>
                    </div>
                    
                </SeletedPoliticianDispatch.Provider>
            </>);
    } else if(isLoaded & !isDistLoaded){
        return(
            <>
                <SeletedPoliticianDispatch.Provider value={{"setter":setSelectedPolitician,
                                                            "value": selectedPolitician}}>
                    <div>
                    <KernelDensityChart id="politicians" data={data} dimensions={kernelDimensions} />
                    <p>Loading Distribution Data</p>
                    </div>
                    <MemoizedPolyTable  data={data}/>
                    
                </SeletedPoliticianDispatch.Provider>
            </>);
    } else if(!isLoaded & isDistLoaded){
        return(
            <>
                <SeletedPoliticianDispatch.Provider value={{"setter":setSelectedPolitician,
                                                            "value": selectedPolitician}}>
                    <div>
                    <p>Loading Politician Data...</p>
                    <KernelDensityChart id="users" data={distData} dimensions={kernelDimensions} />
                    </div>
                   <p>Setting up Table...</p>
                    
                </SeletedPoliticianDispatch.Provider>
            </>);
    }
    else{
        return(
            <>
                <p>Loading...</p>
            </>
            );
    }
}
