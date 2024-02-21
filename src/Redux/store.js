import { configureStore } from "@reduxjs/toolkit";
import studentRegistrationReducer from "./studentsSlice";

const store = configureStore({
  reducer: {
    studentReducers: studentRegistrationReducer,
  },
});

export default store;
