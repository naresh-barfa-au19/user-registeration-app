import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
    };
  }

  render() {
    return (
      <>
        {this.state.userData ? (
          <li>
            Name : {this.state.userData.firstname}{" "}
            {this.state.userData.lastname} <br /> Gender :{" "}
            {this.state.userData.gender} <br />
            Email : {this.state.userData.email} <br /> Date of birth :{" "}
            {this.state.userData.dob} <br /> Phone Number :
            {this.state.userData.phoneNumber}
            <br />
            <button onClick={() => this.props.editHandler(this.state.userData)}>
              Edit
            </button>
            <button
              onClick={() => this.props.deleteHandler(this.state.userData._id)}
            >
              Delete
            </button>
          </li>
        ) : (
          ""
        )}
      </>
    );
  }
}
export default User;
