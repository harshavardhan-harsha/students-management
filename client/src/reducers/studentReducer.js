import { GET_STUDENTS, ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, GET_EDIT_STUDENT_DETAILS } from "../actions/types";

const initialState = {
  students: [],
  studentedit: {}
};

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: payload
      };
    case ADD_STUDENT:
      return {
        ...state
      };
    case DELETE_STUDENT:
      return {
        ...state
      };

    case GET_EDIT_STUDENT_DETAILS:
      return {
        ...state,
        studentedit: payload
      };

    case EDIT_STUDENT:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default studentReducer;
