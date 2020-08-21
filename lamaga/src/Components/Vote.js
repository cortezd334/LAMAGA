import React from 'react';

import Ballot from './Ballot'
import PollingLocations from './PollingLocations'

class Vote extends React.Component {

    state  = {
        candidate: []
    }
    
    shit = () => {
        fetch('http://localhost:3000/votes')
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            json.map(can => {
                this.setState({
                    candidate: can
                })
                // <Ballot can={this.state.candidate}/>
            })
        })
    }

    render(){
        // console.log(this.props)
        return(
            <div>
            {/* {this.shit()} */}
            </div>
        )
    }
}
export default Vote