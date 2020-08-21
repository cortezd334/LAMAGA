import React from "react";
import Card from 'react-bootstrap/Card';

class SenatorCard extends React.Component {
  render() {
    return (
      <body>
      <Card className="sen" border="secondary" style={{ width: '24rem' }} onClick={(e) => this.props.add(e, this.props.sen)}>
        <Card.Header>Senator</Card.Header>
        <Card.Body>
          <Card.Title><b>{this.props.name}</b></Card.Title>
          <Card.Subtitle>Party: {this.props.party}</Card.Subtitle>
          <Card.Link href="{this.props.candidateUrl}">{this.props.candidateUrl}</Card.Link>
        </Card.Body>
      </Card>
      </body>

    );
  }
}
export default SenatorCard;

