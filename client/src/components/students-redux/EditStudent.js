import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import { connect } from "react-redux";
import { getEditStudentDetails, editStudent } from "../../actions/studentActions";

class EditStudent extends Component {
  state = {
    name: "",
    age: "",
    email: ""
  };

  async componentWillMount() {
    let editStudentId = this.props.match.params.id;
    await this.props.getEditStudentDetails(editStudentId);
    this.setState({
      name: this.props.studentedit.name,
      age: this.props.studentedit.age,
      email: this.props.studentedit.email
    });
  }

  onSubmit = e => {
    e.preventDefault();
    let editStudentId = this.props.match.params.id;
    const updatedStudent = {
      name: this.refs.name.value,
      age: this.refs.age.value,
      email: this.refs.email.value
    };
    this.props.editStudent(updatedStudent, editStudentId);
    Swal.fire("Edited!", "Your data has been saved.", "success");
    this.props.history.push("/");
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

const mapStateToProps = state => ({
  studentedit: state.studentedit
});
export default connect(
  mapStateToProps,
  { getEditStudentDetails, editStudent }
)(EditStudent);
