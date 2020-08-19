import React from "react";

import SenatorCard from "../Cards/SenatorCard.js";

class SenatorContainer extends React.Component {
  
  renderSenators = () => {
    let senators = this.props.repsObject.candidates
    // console.log(senators)
    return senators.map(sen => {
      return (
        <SenatorCard sen={sen} key={sen.name} name={sen.name} party={sen.party} candidateUrl={sen.candidateUrl}/>
      );
    });
  };

  render() {
    // console.log(this.props.repsObject)
    return (
      <div>
<<<<<<< HEAD
        {/* <SenatorCard sens={this.renderSenators}/> */}
        {this.renderSenators()}
=======
        {/* {this.renderSenators()} */}
>>>>>>> 60ea37814265a56faad8d092b0def6bb7d37f807
      </div>);
  }
}
export default SenatorContainer;
