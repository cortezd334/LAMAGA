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
            console.log(e.target.name.value)
            
            let {name, username, address, age, party} = e.target
            
            let n = name.value.length > 0 ? name.value : this.state.activeUser.name
            let u = username.value.length > 0 ? username.value : this.state.activeUser.username
            let a = age.value.length > 0 ? age.value : this.state.activeUser.age
            let add = address.value.length > 0 ? address.value : this.state.activeUser.address
            let p = party.value.length > 0 ? party.value : this.state.activeUser.party
            
            let data = { name: n, username: u, address: add, age: a, party: p  } 
                    
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
        .then(json => {
            alert(json.error)
            {this.props.history.push('/login')}
            localStorage.clear()
        })

    }



    render(){
        console.log(this.state.activeUser)
        console.log(this.state)
        
        return (
            <body>
            <Card id='profile' border="secondary" >
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
            </body>
            // <div>
            // </div>
            
        )
    }
}
export default User