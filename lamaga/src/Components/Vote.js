import React from 'react';

import Ballot from './Ballot'
import PollingLocations from './PollingLocations'

class Vote extends React.Component {

    state  = {
        candidate: [],
        hasCandidates: false
    }
    
    componentDidMount (){
        fetch('http://localhost:3000/votes')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({
                candidate: json,
                hasCandidates: true
            })
            })
    }

    renderBallot = () => {
        console.log(this.state.candidate)
        return this.state.candidate.map(can => <Ballot can={can}/>)
    } 
    render(){
        // console.log(this.p)
        return(
            <div>

            {this.state.hasCandidates == true ? this.renderBallot() : null}
            </div>
        )
    }
}
export default Vote