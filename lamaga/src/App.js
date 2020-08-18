import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vote from './Components/Vote.js'
import User from './Components/User.js'
import State from './Components/State.js'
import RepresentativeContainer from './Containers/RepresentativeContainer';



class App extends React.Component {

  state = {
    address: '',
    addressURL: '',
    representatives: {
      candidates: [],
      office: '',
    },
    senators: {
      candidates: [],
      office: '',
    }
  }

  
  
  fetchReps(){
    
    let key = 'AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s'

    fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%274526%20Mill%20Run%20Rd.%20Dallas%20TX%2075244%27&electionId=2000&key=${key}`)
    //returns candidates for '2000' election for a specific address 
    .then(res => res.json())
    .then(json  => this.handleRepresentatives(json.contests[1])
    )
  }

  fetchSen(){
    
    let key = 'AIzaSyDmZGjlJOFg3tzG7QPoDDcYaGdesndYC3s'
    fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=%27${this.state.addressURL}%27&electionId=2000&key=${key}`)
    .then(res => res.json())
    .then(json  => this.handleSenators(json.contests[0])
    )
  }

  handleRepresentatives = (reps) => {
    console.log('representatives', reps)
    let can = reps.candidates
    this.setState({
      representatives: {
        candidates: can,
        office: reps.office,
      } 
    })
  }
  handleSenators = (sen) => {
    console.log('senators', sen)
    let can = sen.candidates
    this.setState({
      representatives: {
        candidates: can,
        office: sen.office,
      } 
    })
  }

  handleChange = (event) => {

    
    
    
    this.setState({ address: event.target.value })
    
  }
  
  addressSubmit = (e) => {
    e.preventDefault();
   let address = this.state.address;

   let before = address.split(' ')


    let after = before.join("%20")
    this.setState({
      addressURL: after
    })
    console.log('new Address', after)
    this.fetchSen()

    // this.fetchSen(after)

  //  this.fetchCandidates(address)
  }
  
  // handleFormSubmit = (e) => { 
    
  
  // }
  
  
  
  render() {
  return (   
    <div>
    <RepresentativeContainer repsObject={this.state.representatives} />   
        <form>
          <label>
          Address: 
          <input  type="text" name="address" onSubmit={this.addressSubmit} onChange={this.handleChange} placeholder="Ex: 123 Broadway St. Seattle WA 98101"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
    </div> 
  );
}}

export default App;

      // fetch(`https://www.googleapis.com/civicinfo/v2/elections?key=${key}`)
      //returns 5 elections
      // fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${key}&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000
      // this one returns polling locations and candidates for a specific address and election id
      // fetch(`https://content-civicinfo.googleapis.com/civicinfo/v2/representatives?address=%27523%20Pine%20St.%20Seattle%20WA%2098101%27&$key=${key}`)
      //this one returns current elected officials for a specific address