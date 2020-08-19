import React from 'react';

class Register extends React.Component{

    render() {
        return (
            <div className="Register">
               <h2> Register to Vote </h2><br></br>
               <p> Voter registration in the United States is required for voting in federal, state and local elections in the United States. </p>
               <p> If you have not registered to vote yet, please vist the following website</p>
               <a href="https://vote.gov">Register to Vote</a>
            </div>
        );
    };
};

export default Register;