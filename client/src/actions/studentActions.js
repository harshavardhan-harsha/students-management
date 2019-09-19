import { GET_STUDENTS, ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, GET_EDIT_STUDENT_DETAILS } from "./types";
import axios from "axios";

// Get students from database
export const getStudents = () => async dispatch => {
  try {
    const res = await axios.get("/api/students");
    dispatch({
      type: GET_STUDENTS,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const addStudent = newStudent => async dispatch => {
  const res = await axios.post("/api/students", newStudent);
  dispatch({
    type: ADD_STUDENT,
    payload: res.data
  });
};

export const getEditStudentDetails = editStudentId => async dispatch => {
  try {
    const res = await axios.get(`/api/students/${editStudentId}`);
    dispatch({
      type: GET_EDIT_STUDENT_DETAILS,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Edit student
export const editStudent = (updatedStudent, editStudentId) => async dispatch => {
  try {
    const res = await axios.put(`/api/students/${editStudentId}`, updatedStudent);
    dispatch({
      type: EDIT_STUDENT,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteStudent = id => async dispatch => {
  try {
    await axios.delete(`api/students/${id}`);
    dispatch({
      type: DELETE_STUDENT,
      payload: id
    });
  } catch (error) {
    console.error(error.message);
  }
};
