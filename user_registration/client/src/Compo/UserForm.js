import React, { Component } from "react";
import axios from "axios";
import User from "./User";
export default class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
      email: "",
      phoneNumber: "",
      password: "",
      confPassword: "",
      userId: "",
      result: {},
      allUser: [],
      isEdit: false,
    };
  }
  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    if (!this.state.isEdit) {
      axios
        .post("http://localhost:4000/register", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          gender: this.state.gender,
          dob: this.state.dob,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          password: this.state.password,
          confPassword: this.state.confPassword,
        })
        .then((response) => {
          console.log(response);
          this.setState({ result: response.data.result });
        })
        .catch((err) => console.log(err));
    } else {
      axios.patch(
        `http://localhost:4000/updateData/userId/${this.state.userId}`,
        {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          gender: this.state.gender,
          dob: this.state.dob,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          password: this.state.password,
          confPassword: this.state.confPassword,
        }
      );
    }
  };
  componentDidMount = (e) => {
    axios.get("http://localhost:4000/register").then((response) => {
      console.log(response.data);
      this.setState({ allUser: response.data });
    });
  };
  deleteHandler = (id) => {
    axios.delete(`http://localhost:4000/deleteData/userId/${id}`);
  };
  editHandler = (userData) => {
    console.log(userData);
    this.setState({
      isEdit: true,
      firstname: userData.firstname,
      lastname: userData.lastname,
      gender: userData.gender,
      dob: userData.dob,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      confPassword: userData.confPassword,
      userId: userData._id,
    });
  };
  render() {
    return (
      <React.Fragment>
        <h2>Register Form</h2>
        <form method="POST" onSubmit={this.submitHandler}>
          <label>First Name :</label>
          <input
            name="firstname"
            type="text"
            required="true"
            value={this.state.firstname}
            onChange={this.inputHandler}
          />
          <br />
          <label>Last Name :</label>
          <input
            name="lastname"
            type="text"
            required="true"
            value={this.state.lastname}
            onChange={this.inputHandler}
          />
          <br />
          <label>Gender :</label>
          <select
            name="gender"
            value={this.state.gender}
            onChange={this.inputHandler}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <label>Date of Birth :</label>
          <input
            name="dob"
            type="Date"
            required="true"
            value={this.state.dob}
            onChange={this.inputHandler}
          />
          <br />
          <label>Email :</label>
          <input
            name="email"
            type="Email"
            required="true"
            value={this.state.email}
            onChange={this.inputHandler}
          />
          <br />
          <label>Phone Number :</label>
          <input
            name="phoneNumber"
            type="Number"
            required="true"
            value={this.state.phoneNumber}
            onChange={this.inputHandler}
          />
          <br />
          <label>Password :</label>
          <input
            name="password"
            type="Password"
            required="true"
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <br />
          <label>Confirm Password :</label>
          <input
            name="confPassword"
            type="Password"
            required="true"
            value={this.state.confPassword}
            onChange={this.inputHandler}
          />
          <br />
          <br />
          <button name="submit" type="submit">
            {this.state.isEdit ? "update" : "register"}
          </button>
        </form>
        <br />
        <br />
        <ol>
          {this.state.allUser.length > 0
            ? this.state.allUser.map((usr) => {
                return (
                  <User
                    key={usr._id}
                    userData={usr}
                    deleteHandler={this.deleteHandler}
                    editHandler={this.editHandler}
                  />
                );
              })
            : ""}
        </ol>
      </React.Fragment>
    );
  }
}
