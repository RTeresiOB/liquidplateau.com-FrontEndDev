/* readPolData.js */

import * as d3 from "d3";

const readPolData = (path, distribution=false, density=true) => {

    if(distribution==false){
     return d3.csv(path,  function(data) {
        //console.log(data);
        return {
            ScreenName:data.screennames,
             Ideology : data.secondcomponent
        };
    } ).then( (data) => {
        if(density){
            return(data.map(d=> parseFloat(d.Ideology)));
        } else {
             return(data)}
        }
    ).then((data)=>{return data})
    } else{
        return d3.csv(path,  function(data) {
            
            return {
                Ideology:data.adjustedIdeology,
            };
        } ).then( (data) => {
            if(density){
                return(data.map(d=> parseFloat(d.Ideology)));
            } else {
                 return(data)}
            }
        ).then((data)=>{return data})
    }
    
}

export default readPolData;