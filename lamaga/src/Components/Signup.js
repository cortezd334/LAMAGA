import React from 'react';

class Signup extends React.Component{

    state = {
        name: '',
        username: '',
        password: ''
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="SignUp">
                <form onSubmit={(e) => this.props.signup(e, this.state)}>
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    <br/>
                    <label>UserName:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <br/>
                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    };
};

export default Signup;