import React from "react";
import Card from 'react-bootstrap/Card';

class RepresentativeCard extends React.Component {
  render() {
    return (
      // <div id={this.props.name}>
      <Card id={this.props.name} border="secondary" style={{ width: '24rem' }} onClick={(e) => this.props.add(e, this.props.rep)}>
        <Card.Header>Representative</Card.Header>
        <Card.Body>
          <Card.Title><b>{this.props.name}</b></Card.Title>
          <Card.Subtitle>Party: {this.props.party}</Card.Subtitle>
          <Card.Link href="{this.props.candidateUrl}">{this.props.candidateUrl}</Card.Link>
        </Card.Body>
      </Card>
      // </div>
    );
  }
}
export default RepresentativeCard;
