/* Dashboard.js*/

/* Controls orientation and data loading for all dashboard graphs */

import React, { useState, useEffect, useReducer, useCallback } from "react";
import readPolData from "./KernelDensity/readPolData";
import KernelDensityChart from "./KernelDensity/KernelDensityChart";
import MemoizedPolyTable from "./PolyTable/PolyTable"
import { isCompositeComponentWithType } from "react-dom/test-utils";
import API from '../api';
import useWindowDimensions from "./useWindowDimensions"

export const  SeletedPoliticianDispatch = React.createContext(null);
export default function Dashboard(props) {
    // Define dimensions for kernelDensity (this will have to be scaled by window dimensions)
    const { height, width } = useWindowDimensions();
    const kernelDimensions = {
        width: .35*width,
        height: .3*height,
        margin: {
          top: 30,
          right: 100,
          bottom: 20,
          left: 100
        }
      };

      const tableDimensions = {
        width: .8*width,
        height: .3*height,
        margin: {
          top: 30,
          right: 100,
          bottom: 20,
          left: 100
        }
      };
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [isDistLoaded, setIsDistLoaded] = useState(false);
    const [distData, setDistData] = useState(null);
    const [pcaResult, setPcaResult] = useState(null);
    const [formState, setFormState] = useState("");
    const selectPoliticanReducer = useCallback((currentState, arr) =>
    {
        const idx = arr[0];
        const clicked = arr[1];

        if(arr.length > 2 && arr[2] == 1){
            return({"selectedPoliticianIdx":idx,
                    "selectedPoliticanScreen": data[idx].ScreenName,
                    "selectedPoliticianIdeology": data[idx].Ideology,
                    "selectedPoliticianArray": [],
                    "selectedPoliticianIdxArray": []});
        }
          if( idx !== null ){
            if(clicked){
                if(currentState.selectedPoliticianArray.includes(data[idx].ScreenName)){
                    return({"selectedPoliticianIdx":idx,
                    "selectedPoliticanScreen": data[idx].ScreenName,
                    "selectedPoliticianIdeology": data[idx].Ideology,
                    "selectedPoliticianArray": currentState['selectedPoliticianArray'].filter(name => name != data[idx].ScreenName),
                    "selectedPoliticianIdxArray": currentState['selectedPoliticianIdxArray'].filter(id => id != idx)});
                } else{
                    return({"selectedPoliticianIdx":idx,
                        "selectedPoliticanScreen": data[idx].ScreenName,
                        "selectedPoliticianIdeology": data[idx].Ideology,
                        "selectedPoliticianArray": currentState.selectedPoliticianArray.concat([data[idx].ScreenName]),
                        "selectedPoliticianIdxArray": currentState.selectedPoliticianIdxArray.concat([idx])});
                }
            }
             else{
                 console.log(currentState);
                return({"selectedPoliticianIdx":idx,
                        "selectedPoliticanScreen": data[idx].ScreenName,
                        "selectedPoliticianIdeology": data[idx].Ideology,
                        "selectedPoliticianArray": currentState.selectedPoliticianArray,
                        "selectedPoliticianIdxArray": currentState.selectedPoliticianIdxArray});
            }
        }
        else {
            console.log(currentState);
            return {"selectedPoliticianIdx":null,
            "selectedPoliticanScreen": null,
            "selectedPoliticianIdeology": null,
            "selectedPoliticianArray": currentState.selectedPoliticianArray,
            "selectedPoliticianIdxArray": currentState.selectedPoliticianIdxArray};
        }
            
      
    },[data])
    const [selectedPolitician, setSelectedPolitician] = useReducer(selectPoliticanReducer,{"selectedPolitician":null,
                                                                                           "selectedPoliticanScreen": null,
                                                                                           "selectedPoliticianIdeology": null,
                                                                                            "selectedPoliticianArray": [],
                                                                                            "selectedPoliticianIdxArray": []})
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

    //{"width":"50%",
    //"position":"fixed",
    //"left": "0"}
    //{"width":"48%",
      //                                      "position":"fixed",
        //                                    "right": "1.5vw"}
    if(isLoaded & isDistLoaded){
        return(
        <div style={{display: 'flex', flex:1,width: '100%',justifyContent: 'center', 'margin':'auto', overflow:'hidden'}}>
            <div  style={{'margin':'auto'}}>
                <div>
                <h1 style={{"text-align": "center",
                'margin':'revert',
                            "font-size":"2vw"}}>Twitter Ideology Estimates of Politicians and Twitter Users</h1>
                            <p style={{"text-align": "left",
                'margin':'revert',
                            "font-size":"1vw"}}>The following dashboard utilized singular value decomposition (often abbreviated SVD) on a matrix of twitter user following data.
                                                By selecting a list over 600 primarily political accounts on twitter and identifying which users followed which accounts, the algorithm was able to identify that political ideology was one of the most important axes that explained why users followed some accounts and not others.</p>
                            <p style={{"text-align": "left",
                'margin':'revert',
                            "font-size":"1vw"}}>The histogram "Ideology Estimates of Political Accounts" shows the calculated ideology distribution of our selected politicians. The scores are normalized so that 0 is the mean calculated ideology and 1 is a standard deviation more conservative than the mean, and conversely, -1 is one standard deviation more liberal than the mean.</p>
                            <p style={{"text-align": "left",
                            'margin':'revert',
                                        "font-size":"1vw"}}>
                                            The associated table "Relative Political Ideology of Politicians" lists the Screen Names of the politicians and their associated ideology scores. 
                                        </p>
                            <p style={{"text-align": "left",
                            'margin':'revert',
                                        "font-size":"1vw"}}> 
                                        The histogram "Ideological Distribution of Twitter Users Engaged in BLM Discourse" shows the relative political distribution of twitter users who were engaged in Black Lives Matter discourse. Here a one unit difference also corresponds to a one standard deviation difference in political ideology.
                                        However, the mean of the distribution was shifted from 0, because the mean twitter user is much more liberal that our mean politician. For this histogram a value of 0 corresponds to a user who only follows George HW Bush (calculated as relatively non-partisan in our table).
                                         By shifting the data in this manner we can clearly see the ideological landscape of twitter, consisting mostly of liberal and moderate users with very few conservative users.
                                        </p>    
                                        <p style={{"text-align": "left",
                            'margin':'revert',
                                        "font-size":"1vw"}}> 
                                        To see how a hypothetical twitter user would be scored, select a group of politicians by clicking their names on the "Relative Polictical Ideology of Politicians" table and press the button "Calculate Your Score!".
                                        A line on the "Ideological Distribution of Twitter Users Engaged in BLM Discourse" will appear marking the score and position among users in our sample. To clear your selection, press "Clear Selected Politicians" and start again!
                                        </p>  
                                        <p style={{"text-align": "left",
                            'margin':'revert',
                                        "font-size":"1vw"}}>To look up the score of an active twitter user, enter in their naame into the searchbox and click "Lookup User". This will only work on public twitter users who are following at least 1 political account, and less than 50,000 political accounts. Note that my twitter API access is limited, so please do not abuse this feature. Non-responsiveness of this functionality likely means that my API access is capped for the moment. </p>
                                        <p style={{"text-align": "left",
                            'margin':'revert',
                                        "font-size":"1vw"}}>If you would like to use this model for a study of your own, PLEASE, do not use this dashboard. Instead, send me an email and I would be happy to share the trained model and/or the model-generating code.</p>
                                        </div>
                <div className='dashContainer' >
                    <div>      
                        <div>
                            <div className='polyAccountGraphLeft' >
                                <h3 style={{"text-align": "center",
                                             
                                            "font-size":"1.5vw"}}> Ideology Estimates of Political Accounts </h3>
                                <div style={{"display": "block",
                                            "margin-left": "auto",
                                            "margin-right": "auto"}}>
                                    <SeletedPoliticianDispatch.Provider value={{"setter":setSelectedPolitician,
                                                                "value": selectedPolitician}}>
                                        <KernelDensityChart id="politicians" data={data} 
                                                        dimensions={kernelDimensions}
                                                        ruleType={"vertical"} />
                                        <MemoizedPolyTable  data={data} />
                                    </SeletedPoliticianDispatch.Provider>
                                </div>
                            </div>
                        </div>
                        <div className='polyAccountGraph'>
                            <h3 style={{"text-align": "center",
                                            "font-size":"1.5vw"}}> Ideological Distribution of Twitter Users Engaged in BLM Discourse </h3>
                            <KernelDensityChart id="users" data={distData}
                                                    dimensions={kernelDimensions}
                                                    ruleType={pcaResult} />
                            <div style={{'padding':'10px',
                                                'display': 'block',
                                                'justify-content': 'center'}}>
                                <p style={{"justify-content": "center",
                                                "display": "flex"}}>
                                                    You are following {selectedPolitician.selectedPoliticianArray.length} politicians </p> 
                                <div style={{"justify-content": "center",
                                                "display": "flex"}}>
                                    <button style={{'font-size':'1vw',
                                                    'margin':'10px',
                                                    'padding':'10px'}} onClick={()=>{API.post('/TwitterIdeology',
                                                    {'following':selectedPolitician.selectedPoliticianArray}).then( result => setPcaResult(result.data.userScore))}} style={{'align-content':'center'}}>Calculate Your Score!</button>
                                    <button onClick={()=>{setSelectedPolitician([0,0,1]);setPcaResult(null)}}>Clear Selected Politicians</button>
                                </div>
                                <div style={{"display":"flex",
                                                justifyContent:"center",
                                                "padding":"1vw",
                                                "padding-left":"3vw",
                                                margin: '5vh'}}>
                                        <textarea style={{width:'55vw'}}
                                                    value={formState}
                                                    onChange={e => setFormState(e.target.value)}
                                        style={{"font-family": 'Avenir',
                                                            "width":"65%",
                                                       padding:'5px' }}
                                                            placeholder="Enter in a twitter handle here! (Ex. RepSwalwell)"> </textarea>
                                        <button onClick={()=>{API.post('/TwitterIdeology',
                                            {'username': formState}).then( result => setPcaResult(result.data.userScore))}} > Lookup User </button>
                                </div>
                                        
                                </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
                    );
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
