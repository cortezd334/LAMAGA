import React from 'react';

import Ballot from './Ballot'
import PollingLocations from './PollingLocations'

class Vote extends React.Component {

    state  = {
        candidate: []
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/votes')
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            json.map(can => {
                this.setState({
                    candidate: can
                })
            })
        })
    }

    render(){
        // console.log(this.props)
        return(
            <div>
                <Ballot can={this.state.candidate}/>
            </div>
        )
    }
}
export default Vote