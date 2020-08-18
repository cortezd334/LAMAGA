import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Vote from "./Components/Vote.js";
import User from "./Components/User.js";
import State from "./Components/State.js";
import Signup from "./Components/Signup.js";
import Login from "./Components/Login.js";
import Home from "./Components/Home.js";
import NotFound from "./Components/NotFound.js";
import RepresentativeContainer from "./Containers/RepresentativeContainer";
import SenatorContainer from "./Containers/SenatorContainer";
import { Route, Switch, Link, NavLink } from "react-router-dom";

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
    fetch(
      `https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${url}%27&electionId=2000&key=${key}`
      // you have to be very specific with the formatting that you input into the text bar
    )
      .then((res) => res.json())
      .then((sen) => {
        console.log(sen);
        sen.contests.map((con) => {
          if (
            con.office &&
            con.office.endsWith("Senator") &&
            con.level &&
            con.level[0] == "country"
          ) {
            this.setState({
              senators: {
                candidates: con.candidates,
                office: con.office,
              },
            });
          }
        });
      });
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

  render() {
    return (
      <div className="App">
        <header>
          <h2>Let's ACTUALLY Make America Great Again!</h2>
        </header>
        <form onSubmit={(e) => this.addressSubmit(e)}>
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
        <RepresentativeContainer repsObject={this.state.representatives} />
        <SenatorContainer senObject={this.state.senators} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={User} />
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
