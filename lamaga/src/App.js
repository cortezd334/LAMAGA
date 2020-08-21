import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vote from './Components/Vote.js'
import User from './Components/User.js'
import Ballot from './Components/Ballot.js'
import Signup from './Components/Signup.js'
import Login from './Components/Login.js'
import Register from './Components/Register.js'
import Home from './Components/Home.js'
import NotFound from './Components/NotFound.js'
import RepresentativeContainer from './Containers/RepresentativeContainer';
import SenatorContainer from './Containers/SenatorContainer';
import {Route, Switch, Link, NavLink, withRouter} from 'react-router-dom'
import PollingLocations from './Components/PollingLocations';

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
    "AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s";
    fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${url}%27&electionId=2000&key=${process.env.REACT_APP_KEY}`)
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
              office: con.office
            }}, () => {this.props.history.push('/candidates')
          });
        }
      });
    });
  };

  //need to clear out senators before setting again

  fetchSen = (url) => {
    fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${url}%27&electionId=2000&key=${process.env.REACT_APP_KEY}`)
    .then(res => res.json())
    .then(sen => sen.contests.map(con => {
        if (con.office && con.office.endsWith("Senator") && con.level && con.level[0] == "country") {
          // this.setState({
          //   senators: {
          //     candidates: '',
          //     office: ''
          //   }
          // })
          this.setState({
            senators: {
              candidates: con.candidates,
                office: con.office
            }}, () => {this.props.history.push('/candidates')
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

  pickCandidate = (e, card) => {
    console.log(card)
    fetch('http://localhost:3000/votes', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({vote: {name: card.name, party: card.party, candidateUrl: card.candidateUrl, user_id: localStorage.getItem('userID')}})
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleSignup = (e, userInfo) => {
    e.preventDefault()
    console.log(userInfo)
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(res => res.json())
    .then(() => {this.props.history.push('/login')})
  }

  handleLogin = (e, userInfo) => {
    e.preventDefault();
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(json => {
      if(!json.error){
        localStorage.setItem("userID", json.id);
        this.setState({
          user: {
            id: json.id,
            username: json.username}}, 
            () => {this.props.history.push('/profile')
          })
      }else {
        alert(json.error)
      }
    })
  }

  logout = () => {
    localStorage.clear()
  }

  renderHome = () => <Home sub={this.addressSubmit} change={this.handleChange}/>
  
  renderSignup = () => <Signup signup={this.handleSignup}/>

  renderLogin = () => <Login login={this.handleLogin}/>
  renderRegister = () => <Register register={this.handleRegister}/>



  renderCandidates = () => {
    return (
      <div>
        <RepresentativeContainer repsObject={this.state.representatives} add={this.pickCandidate}/>
        <SenatorContainer repsObject={this.state.senators} add={this.pickCandidate}/>
      </div>
    )
  }

  renderPollingLocations = () => <PollingLocations address={this.state.addressURL}/>

  render() {
    return (
      <div className="App">
        <header className="appheader">
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
            <li>
              <NavLink to='/ballot'>My Candidates</NavLink>
            </li>
            <li>
              <NavLink onClick={this.logout}to='/login'>Log Out</NavLink>
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
          <Route path='/ballot' component={Vote}/>
          <Route component={NotFound}/>
          </Switch>
      </div> 
    );
  }
}

export default withRouter(App);

// fetch(`https://www.googleapis.com/civicinfo/v2/elections?key=${key}`)
//returns 5 elections
// fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${key}&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000
// this one returns polling locations and candidates for a specific address and election id
// fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/representatives?address=%27523%20Pine%20St.%20Seattle%20WA%2098101%27&$key=${key}`)
//this one returns current elected officials for a specific address
