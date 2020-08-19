import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vote from './Components/Vote.js'
import User from './Components/User.js'
import State from './Components/State.js'
import Signup from './Components/Signup.js'
import Login from './Components/Login.js'
import Register from './Components/Register.js'
import Home from './Components/Home.js'
import NotFound from './Components/NotFound.js'
import RepresentativeContainer from './Containers/RepresentativeContainer';
import SenatorContainer from './Containers/SenatorContainer';
import {Route, Switch, Link, NavLink, Router} from 'react-router-dom'

//we tried putting the fetches in their respective containers but it the values weren't being passed up to the parent, so we put them back in App

class App extends React.Component {
  state = {
    address: "",
    addressURL: "",
    representatives: {
      candidates: [],
      office: ""
    },
    senators: {
      candidates: [],
      office: ""
    },
    user: {
      id: 0,
      username: ""
    }
  };

  fetchReps = (url) => {
    let key = "AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s";
    fetch(
      `https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${url}%27&electionId=2000&key=${key}`
    )
      //returns candidates for '2000' election for a specific address
      .then((res) => res.json())
      .then((json) => {
        json.contests.map((con) => {
          if (
            con.office &&
            con.office.includes("Representative") &&
            con.level &&
            con.level[0] == "country"
          ) {
            this.setState({
              representatives: {
                candidates: con.candidates,
                office: con.office,
              },
            });
          }
        });
      });
  };

  fetchSen = (url) => {
    let key = "AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s";
    fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${url}%27&electionId=2000&key=${key}`)
    .then(res => res.json())
    .then(sen => sen.contests.map(con => {
        if (con.office && con.office.endsWith("Senator") && con.level && con.level[0] == "country") {
          this.setState({
            senators: {
              candidates: con.candidates,
              office: con.office
            }
          });
        };
      })
    );
  };

  getReps = (reps) => {
    console.log("representatives", reps);
    let can = reps.candidates;
    this.setState({
      representatives: {
        candidates: can,
        office: reps.office,
      },
    });
  };

  getSens = (sen) => {
    console.log("senators", sen);
    let can = sen.candidates;
    this.setState({
      representatives: {
        candidates: can,
        office: sen.office,
      },
    });
  };

  handleChange = (event) => {
    console.log('oops')
    this.setState({ address: event.target.value });
  };

  addressSubmit = (e) => {
    e.preventDefault();
    let address = this.state.address;
    let before = address.split(" ");
    let after = before.join("%20");
    this.setState({
      addressURL: after,
    });
    this.fetchSen(after);
    this.fetchReps(after);
  };

  handleSignup = (e, userInfo) => {
    e.preventDefault()
    console.log(userInfo)
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleLogin = (e, userInfo) => {
    e.preventDefault();
    console.log('login')
  }


  renderHome = () => <Home sub={this.addressSubmit} change={this.handleChange}/>
  
  renderSignup = () => <Signup signup={this.handleSignup}/>

  renderLogin = () => <Login login={this.handleLogin}/>
  renderRegister = () => <Register register={this.handleRegister}/>

  renderCandidates = () => {
    return <RepresentativeContainer repsObject={this.state.representatives}/> && <SenatorContainer repsObject={this.state.senators}/>   
  }
  //this would be activated when the route path to candidates is activated

  render() {
    return (
      <div className="App">
        <header>
          <h2>Let's ACTUALLY Make America Great Again!</h2>
          <ul>
            <li>
              <NavLink to='/' exact >Home</NavLink>
            </li>
            <li>
              <NavLink to='/signup'>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to='/login'>Log In</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Register To Vote</NavLink>
            </li>
            <li>
              <NavLink to='/profile'>My Profile</NavLink>
            </li>
          </ul>
        </header>

        <Switch>
        <Route exact path='/' render={this.renderHome}/>
        <Route path='/signup' render={this.renderSignup}/>
        <Route path='/login' render={this.renderLogin}/>
        <Route path='/register' render={this.renderRegister}/>
        <Route path='/profile' component={User}/>
        <Route path='/candidates' render={this.renderCandidates}/>
        {/* <Route path='senators' render={this}/> */}
        {/* didn't finish working on these (that have a corresponding function cuz I need to figure out redirects) */}
        <Route component={NotFound}/>
        </Switch>

        {/* <RepresentativeContainer repsObject={this.state.representatives}/>    */}
        {/* <SenatorContainer repsObject={this.state.senators}/>   */}
        {/* these are still here until I figure out redirects */}
      </div> 
    );
  }
}

export default App;

// fetch(`https://www.googleapis.com/civicinfo/v2/elections?key=${key}`)
//returns 5 elections
// fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${key}&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000
// this one returns polling locations and candidates for a specific address and election id
// fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/representatives?address=%27523%20Pine%20St.%20Seattle%20WA%2098101%27&$key=${key}`)
//this one returns current elected officials for a specific address
