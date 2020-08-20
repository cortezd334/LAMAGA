import React from 'react';

class Login extends React.Component{

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
            <div className="LogIn">
                <form onSubmit={(e) => this.props.login(e, this.state)}>
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

export default Login;
