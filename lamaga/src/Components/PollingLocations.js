import React from 'react';

class PollingLocations extends React.Component {
    
    componentDidMount() {
        fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${process.env.REACT_APP_KEY}&address=${this.props.address}&electionId=2000`)
        .then(res => res.json)
        .then(console.log)
    }
    render() {
        console.log(this.props)
        return(
            <div>

            </div>
        )
    }
}
export default PollingLocations;