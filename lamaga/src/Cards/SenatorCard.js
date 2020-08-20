import React from "react";
import Card from 'react-bootstrap/Card';

class SenatorCard extends React.Component {
  render() {
    return (

      <Card border="secondary" style={{ width: '24rem' }} onClick={(e) => this.props.add(e, this.props.sen)}>
        <Card.Header>Senator</Card.Header>
        <Card.Body>
          <Card.Title><b>{this.props.name}</b></Card.Title>
          <Card.Subtitle>Party: {this.props.party}</Card.Subtitle>
          <Card.Link href="{this.props.candidateUrl}">{this.props.candidateUrl}</Card.Link>
        </Card.Body>
      </Card>

      // <div>
      //   <div className="card-body">
      //     <h5 className="card-title"> {this.props.name}</h5>
      //     <p className="card-text">
      //       {" "}
      //       Party: {this.props.party} <br />
      //       <a href={this.props.candidateUrl}>Website</a>
      //     </p>
      //   </div>
      // </div>
    );
  }
}
export default SenatorCard;

