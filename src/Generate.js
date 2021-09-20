import React, { Component } from 'react';
import SvgLines from 'react-mt-svg-lines';
import useWindowDimensions from './WindowDimensions.js'
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
      [this.width, this.height] =  getWindowDimensions();//useWindowDimensions();
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
        
        entries.forEach((entry) => {//console.log(parseInt(entry.target.id));
            let id = parseInt(entry.target.id);
            this.trajectoryPaths[id] = 'translate(0px,0px)';//'M0,0L100,100';
            //console.log(this.trajectoryPaths[parseInt(entry.target.children[0].id)])
            console.log("State Set");
            this.setState({paths:this.trajectoryPaths});
            });
        /*
        entries.forEach((entry) => {console.log(parseInt(entry.target.children[0].id));
                                    let id = parseInt(entry.target.children[0].id);
                                    this.trajectoryPaths[id] = 'translate(0px,0px)';//'M0,0L100,100';
                                    //console.log(this.trajectoryPaths[parseInt(entry.target.children[0].id)])
                                    this.setState({paths:this.trajectoryPaths});
                                    console.log(this.state.paths[id]);});
                                    */
                                    
      //entry.target.children[0].props.id{'path':'M0,0L2,2'});});
}
createObservers(n){

        this.observers = [];
        let {pathToNode1, options,observer,observe} = [null, null, null, null];
        var pathToNode2 = null;
        for(let i = 0; i < (n - 1); i++){
            //for(let j = i+1; j < n; j++){
                options = {
                    root: document.querySelectorAll('svg')[i],
                    rootMargin: '0px',
                    threshold: .99
                  };
                /*
                console.log(i);
                console.log(document.querySelectorAll('path')[i]);
                console.log(j);
                console.log(document.querySelectorAll('path')[j]);//.getBoundingClientRect().bottom);
                */
                observer = new IntersectionObserver(this.callback, options);
                //console.log(observer.root);
                this.observers.push(observer.observe(document.querySelectorAll('path')[i]));
            //}
        }
        //console.log(this.observers.length);
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
                cx:(Math.random()*width).toString(),
                cy: (Math.random()*height).toString(),
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
            console.log('a');
            //console.log(this.refArray[id].current.getBoundingClientRect().bottom);
            if(this.refArray[id].current.getBoundingClientRect().bottom === 0){
                console.log('b');
                var coords = {x: this.nodeArray[id].finalString.split('L').split(',')[0],
                            y: Math.sin(theta)*500};
                //this.nodes[id].finalString = "m"+coords.x+","+coords.y+'L0,0';
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
    /*try{
        if((this.nodeArray[id].finalString) && (this.refArray[id].current.getBoundingClientRect().bottom === 0)){
            var coords = {x: this.nodeArray[id].finalString.split('L').split(',')[0],
                        y: Math.sin(theta)*500};
            this.nodes[id].finalString = "m"+coords.x+","+coords.y+'L0,0';
            return false;
        }
    } catch{
        ;
    }
    */
    var theta = Math.random()*(2*Math.PI);
    var coords = {x: Math.cos(theta)*500,
                  y: Math.sin(theta)*500};
    var path = 'translate('+coords.x.toString()+'px,'+coords.y.toString()+'px)';//"m0,0L" + coords.x.toString() + "," + coords.y.toString();
    return path;
}
// Map each object within the array to a path element
nodemap (){
    
    function changeDirection(node){
       /* if(this.refArray[node.id].current.getBoundingClientRect().bottom===0){
            this.nodeArray[node.id].pathGenerate;
        }*/
    }
var noods = this.nodeArray.map((node, index) => (
        <Circle d={node.finalString} x0={node.cx} y0={node.cy} id={index} paths={this.trajectoryPaths} ref={this.refArray[index]}/>
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

    //sleep(1000).then( () => console.log(document.querySelectorAll('path')[3].toString()));
    sleep(3000).then( () => this.createObservers(this.n));
}
/*
componentDidUpdate(previousProps,previousState){
    //console.log("TestA");
    //console.log(previousState.paths);
    //console.log(this.state.paths);
        if (JSON.stringify(previousState.paths) != JSON.stringify(this.state.paths)) {
            console.log("test");
            this.nodes = this.nodemap(this.nodeArray);
            this.setState({ JSX: <SvgLines animate={ true } stagger={2000} duration={ 20000 }>
        <svg> {this.nodes} </svg> 
        </SvgLines> });
        }
}
*/
/*
componentDidUpdate(){
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
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
    var touching = false;
    while(touching == false){
        for( var i = 0; i < this.n; i++){
            if(this.refArray[i].current.getBoundingClientRect().bottom==0){
                console.log(this.nodes[i].finalString);
            }
        }
    }
}
*/
render(){
    return(
        this.state.JSX
    );
}
}

export default Generate;