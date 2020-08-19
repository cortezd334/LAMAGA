import React from 'react';

const Login = () => {
    return (
        <div className="Login">
            <form>
                <label>UserName: </label>
                <input></input>
                <br/>
                <label>Password: </label>
                <input></input>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Login;
