import React, { Component, useState, useRef, useEffect, useCallback } from 'react';
import { useInView, InView} from 'react-intersection-observer';
function Circle(props){

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
    // Define function that translates the global path into micro paths - translate wants to finish its animations
    // It receives the length of the animation and the desired length
    function microPathCompute(x,y, x1, y1, steps, transitionDuration, microPath = 10){
        let ratio = (parseFloat(transitionDuration.slice(0,2))*1000) / (microPath*steps);

        var microX = null;
        var microY = null;
        if(x1===null){
           //console.log("ID: ", props.id, "Step: ", steps," x1===null");
            // Since translations defined from origin, we can just take a ratio
            microX = x/ratio;
            microY = y/ratio;
        } else{
            microX = (x1 - props.x0) + (x/ratio);
            microY = (y1 - props.y0) + (y/ratio);
        }
        /*
        console.log("x: ", x, " y: ",y, " ratio: ", ratio);
        console.log("microX: ", microX, " microY: ", microY);
        console.log("ID: ", props.id, ", ", 'translate('+microX+'px,'+microY+'px)');
        */
        return 'translate('+microX+'px,'+microY+'px)';
    }
    // Function to get coordinates from props.path
    function invertPath(input=null){
        // Use regex to get the numbers
        const regex = /([\-0-9\.]+)/g;
        var coords = null;
        if(input===null){ coords= props.paths[props.id].match(regex);}
        else{ coords = input.match(regex);}
        
        return [parseFloat(coords[0]),parseFloat(coords[1])];
    }
    function animationStyle(steps){
        colorVal.current = colorVal.current + .1;//(50*Math.sin(steps.current*.05));
        return {transform:`${microPathCompute(x.current,y.current, x1.current,
                                              y1.current, steps=steps,
                                              transitionDuration)}`,
                transition: '.01s',
                easing:'true',
                opacity:'0',
                padding:'5px',
                stroke:`hsl(${colorVal.current.toString()},100%,70%)`}
    }

    const [isIntersecting, setIntersecting] = useState(false)
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 1.00,
        trackVisibility: true,
        delay:100,
        initialInView: true
      });

         
    const transitionDuration = '10s';
    const colorVal = useRef(190);//Math.floor(Math.random() * (305 - 55 +1)) + 55);
    const steps = useRef(1);
    const stepsOffset = useRef(steps.current +Math.floor(Math.random()*100));
    const x = useRef(invertPath()[0]);
    const y = useRef(invertPath()[1]);
    const x1 = useRef(null); // When we change path it'll be between x and x1
    const y1 = useRef(null); // When we change path it'll be between y and y1
    const lastBorder = useRef(null);
    function borderPathChange(x,y,x1,y1, steps){
        console.log("ID: ", props.id, " steps: ", steps.current, " PATH CHANGE");
        //console.log(x1);
        // Get direction of wall
        const {width, height} = getWindowDimensions(); // Window size
        let distances = [entry.boundingClientRect.y, entry.boundingClientRect.x,
            Math.abs(height - (entry.boundingClientRect.y + entry.boundingClientRect.height)), Math.abs(width - (entry.boundingClientRect.x + entry.boundingClientRect.width))]
        let direction = distances.indexOf(Math.min(...distances));
        // Have to get original theta, magnitude
        if(x1.current===null || (steps.current > 100 & (lastBorder.current != null & lastBorder.current !=direction))){
            //console.log("testing");
            let magnitude = Math.sqrt(Math.pow(x.current,2) + Math.pow(y.current,2));
            //let theta = Math.arcsin(y/magnitude)

            // Set x1 and y1 as the current loåcation of the box
            x1.current = entry.boundingClientRect.x + 5; // change this to radius later!!
            y1.current = entry.boundingClientRect.y + 30;

            // Depending on the wall bounced off of, reverse x or y direction
            //console.log(direction);
            //console.log(x.current,y.current);
            if(direction % 2){
                x.current = -x.current;
            }  else{
                y.current = -y.current;
            }
            
            colorVal.current = 190;
            lastBorder.current = direction;
            steps.current = 1;
            
        }
        return [x.current, x1.current, y.current, y1.current, steps.current];
      }

    const [style, setStyle] = useState(animationStyle(steps.current));
    
    useEffect(() => setTimeout(()=> {steps.current += + 1;
                                    //stepsOffset.current += 1;
                                         setStyle(animationStyle(steps.current));},30), [style]);

        const getCorner = (style) => {
            return({cx : (parseFloat(props.x0) + 25 + (invertPath(style['transform'])[0])).toString(),
                    cy : (parseFloat(props.y0) + (invertPath(style['transform'])[1])).toString()})
        }
        const checkForEdge = (x=null,y=null,x1=null,y1=null, steps=null, check=true) => {

            // First get top, left bottom right of circle.
            const coords = getCorner(style);
            const {width, height} = getWindowDimensions();
            const wallDistances =  [parseFloat(coords.cy) - 25, // Top
                                    parseFloat(coords.cx) - 25, // Left
                                    Math.abs(height - (parseFloat(coords.cy) + 25)), // bottom
                                    Math.abs(width - (parseFloat(coords.cx) + 25))]; // Right
            console.log("ID: ", props.id, "Dist: ", Math.min(...wallDistances));
            if(Math.min(...wallDistances) > 5){
                console.log("ID: ", props.id, "Dist: ", Math.min(...wallDistances));
                return 0;
            } 
            if(check == true){
                return 1;
            }
            
            const direction = wallDistances.indexOf(Math.min(...wallDistances));
            if(x1.current===null || (steps.current > 10 & (lastBorder.current != null & lastBorder.current !=direction))){
                // Set x1 and y1 as the current loåcation of the box
                x1.current = parseFloat(coords.cx) - 25; // change this to radius later!!
                y1.current = parseFloat(coords.cy);
    
                // Depending on the wall bounced off of, reverse x or y direction
                //console.log(direction);
                //console.log(x.current,y.current);
                if(direction % 2){
                    x.current = -x.current;
                }  else{
                    y.current = -y.current;
                }
                
                colorVal.current = 190;
                lastBorder.current = direction;
                steps.current = 1;
                
            }
            return [x.current, x1.current, y.current, y1.current, steps.current];
          }
          //try{
            if(!checkForEdge()){ // inView
            debugger;
            } else{
                //console.log(entry.boundingClientRect.y);
                console.log("Steps: ", steps.current);
                //debugger;
                //console.log(x.current);
                [x.current, x1.current, y.current, y1.current, steps.current] =  checkForEdge(x,y,x1,y1,steps, false);//borderPathChange(x,y,x1,y1,steps);
                //console.log(x.current);
            }
       // }
        //catch{
         //   ;
        //}
/*
        console.log("ID: ", props.id," , ", style['transform'],
                    'X: ', x.current, " Y: ", y.current);
                    */
          // Function
          if(steps.current > 1 & props.id == "2"){
              //console.log("ID: ", props.id, "X: ", entry.boundingClientRect.x,
              //" Y: ", entry.boundingClientRect.y);
              //console.log(style['transform']);
              //console.log(invertPath(style['transform'])[0]/1000);
              //console.log(cx.toString(), cy.toString());
              //debugger;
              //console.log((getCorner(style)).cx);
              if(steps.current > 100){
              //debugger;
              }
            //debugger;
          }


    

    
    return(
        <>
            <g >
            <path id = {props.id} ref={ref} /*stroke='black'*/ stroke-width= {2.2+(.8*Math.sin(stepsOffset.current))}  fill="white" d= {props.d} 
            style={style} />
            <circle cx={(getCorner(style)).cx} cy={getCorner(style).cy} r="5"/>
            </g>
        </>
)
}

export default Circle;