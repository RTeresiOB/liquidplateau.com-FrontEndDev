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
        <p> Hi there!
        </p>
          <p> Welcome to my personal website, where I will keep an updated accounting of what I've done,
           what I'm working on, and where I'm headed next. The website is still under construction,
            so make sure to check back in for new content, projects, and features.
        </p>
        <p>
        My name is Robert Teresi and 
        I am a data-intensive research associate at the Yale School of Management, working in the Organizational Behavior group. 
          In my role, I have had the privilege of utilizing advanced algorithms and state-of-the-art data to 
          answer new questions about human relationships and organizations on micro- and macro scales.
        </p>
        <p>
        I'm fascinated by the newly emerging research and technologies in empirical methods and machine learning. In my work and in my data projects,
         I aim to seek out original ways to employ these trends to discover new objects of inquiry, along with the corresponding instruments with which we can measure them.
        </p>
      </div> 
      <div className='about drawing'>
      <SvgLines animate={ true } stagger={100} duration={ 30000 }>
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
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 100 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 200 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 300 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 400 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 0 500 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 0 L 600 500 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 0 500 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 600 L 600 500 " />

     // From center out 
     <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 100 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 100 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 200 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 200 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 300 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 300 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 400 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 400 " />
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 0 500 " /> // X, Y, length
      <path stroke="black" strokeWidth="1" fill="none" d="M 300 300 L 600 500 " />

        </svg>
        </SvgLines>
      </div>
      </>)
      }
    }
