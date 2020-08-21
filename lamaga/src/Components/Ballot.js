import React from 'react';
import Card from 'react-bootstrap/Card';

class Ballot extends React.Component {

    render(){
console.log(this.props)
        // let makeCards = (this.props.can) => {
        //     <Card border="secondary" style={{ width: '24rem' }}>
        //     {/* <Card.Header>Senator</Card.Header> */}
        //         <Card.Body>
        //             <Card.Title><b>{this.props.can.name}</b></Card.Title>
        //             <Card.Subtitle>Party: {this.props.can.party}</Card.Subtitle>
        //             <Card.Link href="{this.props.can.candidateUrl}">{this.props.can.candidateUrl}</Card.Link>
        //         </Card.Body>
        //     </Card>
        // }
        return (
            <div></div>
                // {/* {this.makeCards()} */}
                // {/* <Card border="secondary" style={{ width: '24rem' }}> */}
                // {/* <Card.Header>Senator</Card.Header> */}
                //      {/* <Card.Body>
                //          <Card.Title><b>{this.props.can.name}</b></Card.Title>
                //          <Card.Subtitle>Party: {this.props.can.party}</Card.Subtitle>
                //          <Card.Link href="{this.props.can.candidateUrl}">{this.props.can.candidateUrl}</Card.Link>
                //      </Card.Body>
                //  </Card> */}

    
        )
    }
}

export default Ballot