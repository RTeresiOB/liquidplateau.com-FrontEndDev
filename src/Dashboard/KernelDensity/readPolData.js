/* readPolData.js */

import * as d3 from "d3";

const readPolData = (path, density=true) => {

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
    
}

export default readPolData;