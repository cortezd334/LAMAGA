import React from 'react';

import Card from 'react-bootstrap/Card';

class User extends React.Component {
    
    state = {
        activeUser: {
            name: [],
            address: [],
            

        }
    }

    
    
    
    // renderUserInfo = () => {
    //     fetch('http://localhost:3000/users')
    //         .then((res) => res.json())
    //         .then(console.log);
    //   }

    componentDidMount = () => {
        const activeUser = localStorage.getItem("userID");
        fetch(`http://localhost:3000/users/${activeUser}`) 
        .then((res) => res.json())
        // .then(console.log)
        .then(json => {
            this.setState({
            activeUser:{ 
                name: json.name,
                address: json.address,
               
            }
        })});
    }

    render(){
        
        return (
            <Card border="secondary" >
                <Card.Header>Profile</Card.Header>
                <Card.Body>
                <Card.Title><b>Name:{this.state.activeUser.name}</b></Card.Title>
                <Card.Subtitle>Address:{this.state.activeUser.address}</Card.Subtitle>
                <Card.Subtitle>Age:{this.state.activeUser.age}</Card.Subtitle>
                </Card.Body>
            </Card>
        )
    }
}
export default User