import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vote from './Components/Vote.js'
import User from './Components/User.js'
import State from './Components/State.js'
import Signup from './Components/Signup.js'
import Login from './Components/Login.js'
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
      office: "",
    },
    senators: {
      candidates: [],
      office: "",
    },
  };

  fetchReps = () => {
    let key = "AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s";
    fetch(
      `https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%274526%20Mill%20Run%20Rd.%20Dallas%20TX%2075244%27&electionId=2000&key=${key}`
    )
      //returns candidates for '2000' election for a specific address
      .then((res) => res.json())
      .then((json) => this.getReps(json.contests[1]));
  };

  fetchSen = (url) => {
    let key = "AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s";
    fetch(
      `https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${url}%27&electionId=2000&key=${key}`
      // you have to be very specific with the formatting that you input into the text bar
    )
      .then((res) => res.json())
      .then((sen) => {
        console.log(sen);
        // sen.contests.find(con => {con.office.endsWith("Senator") && con.level[0] == "country"})
          // if (con.office.endsWith("Senator") && con.level[0] == "country") {
          // if (con.level[0] == "country") {
          //   this.setState({
          //     senators: {
          //       candidates: con.candidates,
          //       office: con.office,
          //     },
          //   });
          //   console.log(con.office);
          // } else {
          //   console.log("hello");
          // }
        // });
      });
  };

  //Apparently not all the data is formatted the same,for the TX address senators were json.contests[0] and reps. were json.contests[1]---but for my address senators are json.contests[5] and reps. are json.contests[0]
  //On 1st submit, we get a 400, on 2nd submit it does work (when we .then(console.log)) if we .then(json  => this.getSens(json.contests[0])), then it errors out (same error that fixed itself earlier today) <after messing w/ it for a while it would work on the 4th submit>
  //componentDidMount did not help w/ fixing this problem

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
    this.setState({ address: event.target.value });
  };

  addressSubmit = (e) => {
    e.preventDefault();
    let address = this.state.address;
    let before = address.split(" ");
    let after = before.join("%20");
    this.setState({
      addressURL: after
    })
    this.fetchSen(after)
  }
  //originally this was not working because the onSubmit was in the input tag instead of in the form tag

  render() {
    return (   
      <div className="App">
        <header>
          <h2>Let's ACTUALLY Make America Great Again!</h2>
          <ul>
            <li>
              <NavLink to='/home'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/signup'>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to='/login'>Log In</NavLink>
            </li>
            <li>
              <NavLink to='/profile'>My Profile</NavLink>
            </li>
          </ul>
        </header>
        <form onSubmit={(e) => this.addressSubmit(e)} >
            <label>
            Address:
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              placeholder="Ex: 123 Broadway St. Seattle WA 98101"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <RepresentativeContainer repsObject={this.state.representatives}/>   
        <SenatorContainer repsObject={this.state.senators}/>  
        <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        <Route path='/profile' component={User}/>
        <Route component={NotFound}/>
        </Switch>
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
