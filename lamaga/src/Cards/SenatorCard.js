import React from "react";
import Card from 'react-bootstrap/Card'


class SenatorCard extends React.Component {
  render() {
    return (
      <Card border="secondary" style={{ width: '24rem' }}>
        <Card.Header>Senator</Card.Header>
        <Card.Body>
          <Card.Title><b>{this.props.name}</b></Card.Title>
          <Card.Subtitle>Party: {this.props.party}</Card.Subtitle>
          <Card.Link href="{this.props.candidateUrl}">{this.props.candidateUrl}</Card.Link>
        </Card.Body>
      </Card>
    );
  }
}
export default SenatorCard;
