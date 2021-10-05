import './App.css';
import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Resume from './Resume';
import Project from './TwitterDash';
const App = () => (
  <div className='app'>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav>
    <ul>
      <li id="homepage"><NavLink exact activeClassName="current" to='/'>home</NavLink></li>
      <li id="aboutpage"><NavLink exact activeClassName="current" to='/about'>about</NavLink></li>
      <li id="contactpage"><NavLink exact activeClassName="current" to='/contact'>contact</NavLink></li>
      <li id="contactpage"><NavLink exact activeClassName="current" to='/Project'>Project</NavLink></li>
      <li id="resumepage"><NavLink exact activeClassName="current" to='/resume'>resume</NavLink></li>
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

    <div className='contact personal'>
    <p> shoot me an email: robert.teresi@yale.edu</p>
    <p> or write me a note: </p>
    
    <form action="#" >

    <label>Name</label>
  <input type=" text" id="name" name="name" placeholder="name..."
    value={this.state.name}
    onChange={e => this.setState({ name: e.target.value })}
  />


  <label>Email</label>
  <input type="email" id="email" name="email" placeholder="email..."
    value={this.state.email}
    onChange={e => this.setState({ email: e.target.value })}
  />


  <label>Message</label>
  <textarea id="message" name="message" placeholder="write something.."
    onChange={e => this.setState({ message: e.target.value })}
    value={this.state.message}
  ></textarea>

    <input id = "butt" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
  </form >
  
  </div>
  );
}
}


const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/contact' component={Contact}></Route>
    <Route exact path='/Project' component={Project}></Route>
    <Route exact path='/resume' component={Resume}></Route>
  </Switch>
);


export default App;
