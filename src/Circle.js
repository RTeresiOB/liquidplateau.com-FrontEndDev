import React, { Component, useState, useRef, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
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
            // Since translations defined from origin, we can just take a ratio
            microX = x/ratio;
            microY = y/ratio;
        } else{

            microX = (x1 - props.x0) + ((x - (x1 - props.x0))/ratio);
            microY = (y1 - props.y0) + ((y - (y1 - props.y0))/ratio);
            /*
            if(props.id==1){
                console.log("start");
                console.log(x1);
                console.log(y1);
                console.log(x);
                console.log(y);
                console.log(microX);
                console.log(microY);
            }
            */
        }
        return 'translate('+microX+'px,'+microY+'px)';
    }
    // Function to get coordinates from props.path
    function invertPath(){
        // Use regex to 
        const regex = /([\-0-9\.]+)/g;
        const coords = props.paths[props.id].match(regex);
        return [parseFloat(coords[0]),parseFloat(coords[1])];
    }
    function animationStyle(steps){
        return {transform:`${microPathCompute(x.current,y.current, x1.current,
                                              y1.current, steps=steps,
                                              transitionDuration)}`,
                transition: '.01s',
                opacity:'0'}
    }

    const [isIntersecting, setIntersecting] = useState(false)
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .99,
        trackVisibility: true,
        delay:100,
        initialInView: true
      });

         
    const transitionDuration = '10s';
    const steps = useRef(1);
    const stepsOffset = useRef(steps.current +Math.floor(Math.random()*100));
    const x = useRef(invertPath()[0]);
    const y = useRef(invertPath()[1]);
    const x1 = useRef(null); // When we change path it'll be between x and x1
    const y1 = useRef(null); // When we change path it'll be between y and y1

    function borderPathChange(x,y,x1,y1, steps){
        //console.log(x1);
        // Get direction of wall
        const {width, height} = getWindowDimensions(); // Window size
        let distances = [entry.boundingClientRect.y, entry.boundingClientRect.x,
            Math.abs(height - entry.boundingClientRect.y), Math.abs(width - entry.boundingClientRect.x)]
        let direction = distances.indexOf(Math.min(...distances));//*Math.PI / 2;
        // Have to get original theta, magnitude
        if(x1.current===null){
            //console.log("testing");
            let magnitude = Math.sqrt(Math.pow(x.current,2) + Math.pow(y.current,2));
            //let theta = Math.arcsin(y/magnitude)

            // Set x1 and y1 as the current location of the box
            x1.current = entry.boundingClientRect.x;
            y1.current = entry.boundingClientRect.y;

            // Depending on the wall bounced off of, reverse x or y direction
            if(direction % 2){
                x.current = -x.current;
            }  else{
                y.current = -y.current;
            }
            
            // Get the direction of wall hit to new
            let theta = Math.atan((y.current - y1.current)/
                                  (x.current - x1.current));
            x.current = x1.current - Math.cos(theta)*magnitude;
            y.current = y1.current - Math.sin(theta)*magnitude;
            steps.current = 1;
        }
        return [x.current, x1.current, y.current, y1.current, steps.current];
      }

    const [style, setStyle] = useState(animationStyle(steps.current));
    useEffect(() => setTimeout(()=> {steps.current += + 1;
                                    //stepsOffset.current += 1;
                                         setStyle(animationStyle(steps.current));},30), [style]);
    
        try{
            if(inView){
            //console.log(entry);
            ;
            } else{
                //console.log(x.current);
                [x.current, x1.current, y.current, y1.current, steps.current] = borderPathChange(x,y,x1,y1,steps);
                //console.log(x.current);
            }
        }
        catch{
            ;
        }
          // Function

    return(
        <>
            <path id = {props.id} ref={ref} /*{ref={callBackRef}}*/ stroke = 'black' stroke-width= {.5+(.5*Math.sin(stepsOffset.current))}  fill="white" d= {props.d} 
            style={style} />
        </>
)
}

export default Circle;

/*<animateMotion 
                id = {props.id}
                dur="50s"
                begin = "2s"
                fill="freeze"
                path={props.path()} /> */