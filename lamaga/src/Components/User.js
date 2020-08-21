import React from 'react';

import Card from 'react-bootstrap/Card';

class User extends React.Component {
    
    state = {
        activeUser: {
            name: '',
            username: '',
            address: '',
            age: '',
            party: ''
            

        }
    }

    componentDidMount = () => {
        const activeUser = localStorage.getItem("userID");
        fetch(`http://localhost:3000/users/${activeUser}`) 
        .then((res) => res.json())
        .then(json => {
            this.setState({
                activeUser:{ 
                    name: json.name,
                    username: json.username,
                    address: json.address,
                    age: json.age,
                    party: json.party
                }
            })});
        }
        
        handleChange = (e) => {
            // e.preventDefault()
            console.log(e)
            console.log(e.target.name.value)
            
            let {name, username, address, age, party} = e.target
            let data = { name: name.value, username: username.value, address: address.value, age: age.value , party: party.value  } 
                    
            const activeUser = localStorage.getItem("userID");
            fetch(`http://localhost:3000/users/${activeUser}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    activeUser:{ 
                        name: json.name,
                        username: json.username,
                        address: json.address,
                        age: json.age,
                        party: json.party
                    }
                })
            })
    }

    delete = () => {
        const activeUser = localStorage.getItem("userID");
        fetch(`http://localhost:3000/users/${activeUser}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
        .then(res => res.json())
        .then(json => alert(json.error))

    }



    render(){
        console.log(this.state.activeUser)
        console.log(this.state)
        
        return (
            <Card border="secondary" >
                <form onSubmit={(e) => {this.handleChange(e)}}>
                <Card.Header>Profile</Card.Header>
                <Card.Body>

                <Card.Title><b>Name:    {this.state.activeUser.name}</b></Card.Title>
                <label>Update Name: </label>
                <input type="text" name="name" value={this.state.name} /><br></br><br></br>

                <Card.Subtitle><b>Current Username: {this.state.activeUser.username}</b></Card.Subtitle>
                <label>Update Username: </label>
                <input type="text" name="username" value={this.state.username} /><br></br><br></br>

                <Card.Subtitle><b>Current Address:  {this.state.activeUser.address}</b></Card.Subtitle>
                <label>Update Address:  </label>
                <input type="text" name="address" value={this.state.address} /><br></br><br></br>

                <Card.Subtitle><b>Current Age:  {this.state.activeUser.age}</b></Card.Subtitle>
                <label>Update Age:  </label>
                <input type="text" name="age" value={this.state.age} /><br></br><br></br>

                <Card.Subtitle><b>Current Party:{this.state.activeUser.party}</b></Card.Subtitle>
                <label>Update Party:</label>
                <input type="text" name="party" value={this.state.party} />
                </Card.Body>

                <input type="submit" value="Submit"/>
                </form>
                <button onClick={this.delete}>Delete Profile</button>
            </Card>
            // <div>
            // </div>
            
        )
    }
}
export default User