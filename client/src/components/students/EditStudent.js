import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class EditStudent extends Component {
  state = {
    name: "",
    age: "",
    email: ""
  };

  componentWillMount() {
    this.getStudentDetails();
  }

  getStudentDetails = async () => {
    let editStudentId = this.props.match.params.id;
    try {
      const res = await axios.get(`/api/students/${editStudentId}`);
      this.setState({
        name: res.data.name,
        age: res.data.age,
        email: res.data.email
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  editStudent = async newStudent => {
    let editStudentId = this.props.match.params.id;
    try {
      await axios.put(`/api/students/${editStudentId}`, newStudent);
      this.props.history.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  onSubmit = e => {
    e.preventDefault();
    const newStudent = {
      name: this.refs.name.value,
      age: this.refs.age.value,
      email: this.refs.email.value
    };
    this.editStudent(newStudent);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <br />
        <NavLink to="/" className="btn btn-light">
          Back
        </NavLink>
        <h1 className="text-dark text-center">Edit Student details</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" ref="age" value={this.state.age} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref="email" value={this.state.email} onChange={this.onChange} />
          </div>
          <input type="submit" value="Save Details" className="btn btn-secondary btn-block" />
        </form>
      </div>
    );
  }
}

export default EditStudent;
