import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { addStudent } from "../../actions/studentActions";

class AddStudent extends Component {
  onSubmit = e => {
    e.preventDefault();
    const newStudent = {
      name: this.refs.name.value,
      age: this.refs.age.value,
      email: this.refs.email.value
    };
    this.props.addStudent(newStudent);
    Swal.fire("Added!", "Your data has been recorded.", "success");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <br />
        <NavLink to="/" className="btn btn-light">
          Back
        </NavLink>
        <h1 className="text-primary text-center">Add Student Info</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" ref="name" placeholder="Enter Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" ref="age" placeholder="Enter Age" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref="email" placeholder="Enter Email" required />
          </div>

          <input type="submit" value="Add Student" className="btn btn-dark btn-block" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addStudent }
)(AddStudent);
