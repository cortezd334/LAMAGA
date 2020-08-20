import React from 'react';

class User extends React.Component {

    componentDidMount = () => {
        fetch(`http://localhost:3000/users/${localStorage.getItem("userID")}`) 
        .then((res) => res.json())
        .then(console.log);
    }

    render(){
        return (
            <div>

            </div>
        )
    }
}
export default User