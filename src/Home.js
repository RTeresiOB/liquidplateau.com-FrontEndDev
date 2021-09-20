import './App.css';
import React, { Component } from 'react';
import SvgLines from 'react-mt-svg-lines';
import Generate from './Generate';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true,
        style: {
          opacity: 0,
          transition: 'all 2s ease'
        }
      }
      this.mountStyle = this.mountStyle.bind(this);
    }
  
  mountStyle() { // css for mount animation
      this.setState({
        style: {
          opacity: 1,
          transition: 'all 4s ease',
        }
      })
    }
  
    componentDidMount() {
      function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
      sleep(4000).then(this.mountStyle, 10);
    }
  
    render() {
      return (
        <div className='home'>
          <h1 className="welcomePrompt" style={this.state.style}> this is the personal website of Rob Teresi. </h1>
          <Generate style={{height:1000}}/>
      </div>
    );
  }
  }
  
  export default Home;