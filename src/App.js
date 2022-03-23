import './App.css';
import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Resume from './Resume';
import Dashboard from './Dashboard/Dashboard'
import My_Picture from './assets/ThinkingBWCompressed.jpg'

const App = () => (
  <div className='app'>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav >
    <ul  >
      <li id="homepage" ><NavLink exact activeClassName="current" to='/'> <p style={{fontSize:'1.8vw'}}>home</p></NavLink></li>
      <li id="aboutpage"><NavLink exact activeClassName="current" to='/about'><p style={{fontSize:'1.8vw'}}>about</p></NavLink></li>
      <li id="contactpage"><NavLink exact activeClassName="current" to='/contact'><p style={{fontSize:'1.8vw'}}>contact</p></NavLink></li>
      <li id="contactpage"><NavLink exact activeClassName="current" to='/Project'><p style={{fontSize:'1.8vw'}}>twitter ideology</p></NavLink></li>
      <li id="resumepage"><NavLink exact activeClassName="current" to='/resume'><p style={{fontSize:'1.8vw'}}>resume</p></NavLink></li>
    </ul>
  </nav>
);

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      mailsent: false,
      error: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

 handleFormSubmit( event ) {
  event.preventDefault();
  console.log(this.state);
  // Also clear the fields after submission
}

  render() {
    return (
<>
    <div className='contact personal' style={{
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  placeContent: 'space-around',
  flexDirection: 'column',
  height: '90vh',
  textAlign: 'center',
}}>
    <p style={{fontWeight:550}}> LinkedIn: <a href="https://www.linkedin.com/in/rteresi">linkedin.com/in/rteresi</a></p>
    <p style={{fontWeight:550}}> GitHub: <a href="https://www.github.com/rteresiob">GitHub.com/RTeresiOB</a></p>
    <p style={{fontWeight:550}}> Work Email: <a href="mailto:robert.teresi@yale.edu">robert.teresi@yale.edu</a></p>
    <p style={{fontWeight:550}}> Personal Email: <a href="mailto:rkteresi@gmail.com">rkteresi@gmail.com</a></p>
  </div>
  <div className='about drawing' style={{alignItems:'center', display:'flex', height:'90vh',}}>
    <img style={{width:'80%',
  display: 'block',
  marginLeft:'auto',
  marginRight:'auto'}} src={My_Picture} alt="A Photo of Me, Robert Teresi"></img>
  </div>
  </>
  );
}
}



const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/contact' component={Contact}></Route>
    <Route exact path='/Project' render={(props) => <Dashboard {...props} />} /> 
    <Route exact path='/resume'  component={Resume}></Route>
  </Switch>
);


export default App;
