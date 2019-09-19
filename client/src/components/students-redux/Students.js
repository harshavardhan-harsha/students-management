import React, { Fragment, Component } from "react";
import StudentItem from "./StudentItem";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { getStudents, deleteStudent } from "../../actions/studentActions";

class Students extends Component {
  componentWillMount() {
    this.props.getStudents();
  }

  onDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.props.deleteStudent(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.props.getStudents();
      }
    });
  };

  filterStudents = async text => {
    const filtered = this.state.students.filter(student => {
      const regex = new RegExp(`${text}`, "gi");
      return student.name.match(regex) || student.email.match(regex);
    });
    this.setState({ students: filtered });
  };
  onChange = e => {
    if (this.refs.text.value !== "") {
      this.filterStudents(e.target.value);
    } else {
      this.props.getStudents();
    }
  };

  render() {
    const { students } = this.props;
    return (
      <div>
        {students.length > 0 ? (
          <Fragment>
            <form>
              <input ref="text" type="text" placeholder="Filter Students" onChange={this.onChange} />
            </form>
            <div className="grid-3">
              {students.map(student => (
                <StudentItem key={student._id} student={student} onDelete={this.onDelete} />
              ))}
            </div>
            <br />
            <NavLink to="/students/add" className=" all-center btn btn-primary">
              <i className="fas fa-user-plus" /> Add Student
            </NavLink>
            <br />
            <br />
          </Fragment>
        ) : (
          <Fragment>
            <p className="lead">No students records..!! Add one</p>
            <br />
            <NavLink to="/students/add" className=" all-center btn btn-primary">
              <i className="fas fa-user-plus" /> Add Student
            </NavLink>
            <br />
            <br />
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students
});

export default connect(
  mapStateToProps,
  { getStudents, deleteStudent }
)(Students);
