import React from "react";

import SenatorCard from "../Cards/SenatorCard.js";

class SenatorContainer extends React.Component {
  // renderSenators = () => {
    // let senators = this.props.senObject.candidates;

  //   return senators.map((sen) => {
  //     return (
  //       <SenatorCard
  //         sen={sen}
  //         key={sen.name}
  //         name={sen.name}
  //         party={sen.party}
  //         candidateUrl={sen.candidateUrl}
  //       />
  //     );
  //   });
  // };

  render() {
    return (
      <div>
        Hello World
        {/* {this.renderSenators()} */}
      </div>
    );
  }
}
export default SenatorContainer;
