import React, { Component } from 'react';
import SvgLines from 'react-mt-svg-lines';
export default class About extends Component {
    constructor(props) {
        super(props);
      }
    
      render(){
        return (
      <>
      <div className='about personal'>
        <p> Hi. My name is Robert Teresi.
          
          Welcome to my personal website, where I will keep an updated accounting of what I've done,
           what I'm working on, and where I'm headed next.
        </p>
        <p>
        I am a research associate at the Yale School of Management.
        </p>
        
      </div> 
      <div className='about drawing'>
        Test
      <SvgLines animate={ true } duration={ 500 }>
      <svg 
          id="svgId" 
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
            x="0"
            y="0"
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            preserveAspectRatio="none">
      <path stroke="green" strokeWidth="10" fill="none" d="M20.8,51c0,0,20.8,18.2,21.5,18.2c0.6,0,33.3-38.5,33.3-38.5" />
        </svg>
        </SvgLines>
      </div>
      </>)
      }
    }
