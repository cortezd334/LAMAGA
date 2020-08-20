import React from "react";

import RepresentativeCard from "../Cards/RepresentativeCard.js";

class RepresentativeContainer extends React.Component {
  renderReps = () => {
    let representatives = this.props.repsObject.candidates;

    return representatives.map(rep => {
      return (
        <RepresentativeCard rep={rep} key={rep.name} name={rep.name} party={rep.party} candidateUrl={rep.candidateUrl} add={this.props.add}/>
      );
    });
  };

  render() {
    return (
      <div>
        {this.renderReps()}
      </div>);
  }
}
export default RepresentativeContainer;
