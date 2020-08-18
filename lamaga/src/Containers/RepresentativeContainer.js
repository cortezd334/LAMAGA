import React from "react";

import RepresentativeCard from "../Cards/RepresentativeCard.js";

class RepresentativeContainer extends React.Component {
  renderReps = () => {
    let representatives = this.props.repsObject.candidates;

    return representatives.map((sen) => {
      return (
        <RepresentativeCard
          rep={sen}
          key={sen.name}
          name={sen.name}
          party={sen.party}
          candidateUrl={sen.candidateUrl}
        />
      );
    });
  };

  render() {
    return <div>{this.renderReps()}</div>;
  }
}
export default RepresentativeContainer;
