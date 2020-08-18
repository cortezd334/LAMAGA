import React from "react";

class RepresentativeCard extends React.Component {
  render() {
    return (
      <div>
        <div className="card-body">
          <h5 className="card-title"> {this.props.name}</h5>
          <p className="card-text">
            {" "}
            Party: {this.props.party} <br />
            <a href={this.props.candidateUrl}>Website</a>
          </p>
        </div>
      </div>
    );
  }
}
export default RepresentativeCard;
