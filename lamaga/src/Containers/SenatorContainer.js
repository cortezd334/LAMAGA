import React from "react";

import SenatorCard from "../Cards/SenatorCard.js";

class SenatorContainer extends React.Component {
  
  renderSenators = () => {
    let senators = this.props.repsObject.candidates
    // console.log(senators)
    return senators.map(sen => {
      return (
        <SenatorCard sen={sen} key={sen.name} name={sen.name} party={sen.party} candidateUrl={sen.candidateUrl} add={this.props.add}/>
      );
    });
  };

  render() {
    // console.log(this.props.repsObject)
    return (
      <div>
        {this.renderSenators()}
      </div>);
  }
}
export default SenatorContainer;
