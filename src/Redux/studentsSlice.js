import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "student_registration",
  initialState,
  reducers: {
    getAllStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students = [...state.students, action.payload];
    },
    deleteStudent: (state, action) => {
      state.students = state.students?.filter(
        (item) => item.studentId !== action.payload
      );
    },
    deleteAllStudents: (state, action) => {
      state.students = [];
    },
    updateStudent: (state, action) => {
      state.students = state.students.map((item) =>
        item.studentId === action.payload.studentId
          ? { ...item, ...action.payload }
          : item
      );
    },
  },
});
export const {
  getAllStudents,
  addStudent,
  deleteStudent,
  deleteAllStudents,
  updateStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
