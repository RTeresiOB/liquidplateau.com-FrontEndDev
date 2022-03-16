import React, { Component } from 'react';
import SvgLines from 'react-mt-svg-lines';
import Circle from './Circle.js'

class Generate extends Component {
    
    constructor(props) {
    function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            return [
              width,
              height
            ];
          }
    function createRefs(n){
        let refArray = [];
        for(let i = 0; i < n; i++){
            refArray.push(React.createRef());
        }
        return refArray;
    }
      super(props);
      this.n = 30;
      this.refArray = createRefs(this.n);
      [this.width, this.height] =  getWindowDimensions();
      this.radius = 50;
      this.nodeArray = [];
      this.generateArray(this.n);
      this.pathGenerate = this.pathGenerate.bind(this);
      this.nodemap = this.nodemap.bind(this);
      this.callback = this.callback.bind(this);
      this.createObservers = this.createObservers.bind(this);
      this.trajectoryPaths = [...Array(this.n).keys()];
      this.trajectoryPaths = this.trajectoryPaths.map((val) =>
                                                this.pathGenerate());
      this.state = {
          reRender : false,
          paths: this.trajectoryPaths,
          JSX : (<p>Loading...</p>),
      };
      this.nodes = this.nodemap(this.nodeArray);
      this.node_positions = [];
    }
callback(entries, observer){
        if(true) return;
}
createObservers(n){

        this.observers = [];
        let {pathToNode1, options,observer,observe} = [null, null, null, null];
        for(let i = 0; i < (n - 1); i++){
                options = {
                    root: document.querySelectorAll('svg')[i],
                    rootMargin: '0px',
                    threshold: .99
                  };
                observer = new IntersectionObserver(this.callback, options);
                try{
                    this.observers.push(observer.observe(document.querySelectorAll('path')[i]));
                } catch{
                    ;
                }
            //}
        }
    }
generateArray(n) {
    /* generate an array of n x,y coordinates to serve as cx, cy*/
    /* r will be constant */
    function circleDistance(circle1, circle2){
        return Math.pow(Math.pow(parseFloat(circle2.cx) - parseFloat(circle1.cx), 2) +
                    Math.pow(parseFloat(circle2.cy) - parseFloat(circle1.cy), 2), (1/2));
    }
    function radiusCompare(array, value, radius){
        for(var i=0;i < array.length; i++){
            if(circleDistance(array[i],value) < radius){
                return true;
            }
        }
        return false;
    }
    function genPath(width, height){
        for (var i=0; i<n; i++){
            var obj = {
                cx:(30 + (Math.random()*(width-60))).toString(),
                cy: (30 + (Math.random()*(height-60))).toString(),
                id: `${i}`
            };
    
            // Creates a string that can later be used in a <path> tag within an <svg element>
            obj['finalString'] = 'M ' + obj.cx + ', ' + obj.cy + ' a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0';
            return obj;
        }
    }
    
    if(this.nodeArray.length === 0){
        this.nodeArray.push(genPath(this.width, this.height));
    }
    while ( n > this.nodeArray.length){ 
        var new_node_position = {cx: this.nodeArray[0].cx,
                             cy: this.nodeArray[0].cy} ;
        
        while(radiusCompare(this.nodeArray, new_node_position, this.radius)) {
            new_node_position = genPath(this.width, this.height);
         }
    
        this.nodeArray.push(new_node_position);
    }
}

pathGenerateWrapper(id = null){
    id = id;
    function pathGenerate(){
        try{
            if(this.refArray[id].current.getBoundingClientRect().bottom === 0){
                var coords = {x: this.nodeArray[id].finalString.split('L').split(',')[0],
                            y: Math.sin(theta)*500};
                return "m"+coords.x+","+coords.y+'L0,0';;
            }
        } catch{
            ;
        }
        var theta = Math.random()*(2*Math.PI);
        var coords = {x: Math.cos(theta)*500,
                      y: Math.sin(theta)*500};
        var path = "m0,0L" + coords.x.toString() + "," + coords.y.toString();
        return path;
    }
    return pathGenerate;
}
pathGenerate(){
    var theta = Math.random()*(2*Math.PI);
    var coords = {x: Math.cos(theta)*500,
                  y: Math.sin(theta)*500};
    var path = 'translate('+coords.x.toString()+'px,'+coords.y.toString()+'px)';
    return path;
}
// Map each object within the array to a path element
nodemap (){

var noods = this.nodeArray.map((node, index) => (
        <Circle d={node.finalString} x0={node.cx} y0={node.cy} id={index} paths={this.trajectoryPaths}/>
));
     return noods;
}

componentDidMount(){
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    this.setState({ JSX: <SvgLines animate={ true } stagger={5000} duration={ 32000 }>
        <svg className="home"> {this.nodes} </svg> 
        </SvgLines> });

    sleep(3000).then( () => this.createObservers(this.n));
}

render(){
    return(
        this.state.JSX
    );
}
}

export default Generate;