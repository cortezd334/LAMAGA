import React from 'react';

class Signup extends React.Component{
state = {
  username:'',
  password:''
}


handleChange = (e) => {
  let {name, value} = e.target
  this.setState({
    [name]: value
  })
}

render(){
  return (
    <div className="Signup">
     <form onSubmit={(e) => this.props.handleLoginOrSignup(e, this.state)}>
         <label>UserName</label>
         <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        <br/>
         <label>Password</label>
         <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
         <br/>
         <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
}

export default Signup;