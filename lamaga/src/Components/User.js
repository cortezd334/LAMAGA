import React from 'react';

class User extends React.Component {
    renderUserInfo = () => {
        fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then(console.log);
      }

    render() {
        return (
            <div>
                {this.renderUserInfo()}
            </div>
        )
    }
}
export default User