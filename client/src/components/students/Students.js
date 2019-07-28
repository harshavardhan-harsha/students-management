import React, { Fragment, Component } from "react";
import StudentItem from "./StudentItem";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Students extends Component {
  state = {
    students: []
  };

  componentWillMount() {
    this.getStudents();
  }

  getStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      this.setState({ students: res.data });
    } catch (error) {
      console.error(error.message);
    }
  };

  onDelete = id => {
    axios
      .delete(`/api/students/${id}`)
      .then(res => {
        this.getStudents();
      })
      .catch(err => console.log(err));
  };

  filterStudents = text => {
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
      this.getStudents();
    }
  };

  render() {
    const { students } = this.state;
    return (
      // <div>
      //   <h1 className="text-primary text-center">Students Details</h1>

      //   {students.length > 0 ? (
      //     <Fragment>
      //       <table className="table table-bordered">
      //         <tbody>
      //           <tr>
      //             <th>Id</th>
      //             <th>Name</th>
      //             <th>Age</th>
      //             <th>Email</th>
      //             <th>Edit</th>
      //             <th>Delete</th>
      //           </tr>
      //           {students.map(student => (
      //             <StudentItem key={student._id} student={student} onDelete={this.onDelete} />
      //           ))}
      //         </tbody>
      //       </table>
      //       <br />

      //       <NavLink to="/students/add" className="btn btn-primary btn-block">
      //         <i className="fas fa-user-plus" /> Add Student
      //       </NavLink>
      //     </Fragment>
      //   ) : (
      //     <Fragment>
      //       <p className="lead">No students records..!! Add one</p>
      //       <br />
      //       <NavLink to="/students/add" className="btn btn-primary btn-block">
      //         <i className="fas fa-user-plus" /> Add Student
      //       </NavLink>
      //     </Fragment>
      //   )}
      // </div>

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

export default Students;
