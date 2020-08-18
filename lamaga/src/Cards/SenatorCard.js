import React from "react";

class SenatorCard extends React.Component {
  render() {
    let { name, party, candidateURL } = this.props;
    return (
      <div>
        {this.props.name}
        <SenatorCard name={name} party={party} url={candidateURL} />
      </div>
    );
  }
}
export default SenatorCard;
