import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  InputLabel,
  FormControl,
  Select,
  Box,
  Grid,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteAllStudents,
  getAllStudents,
  deleteStudent,
  updateStudent,
} from "../Redux/studentsSlice";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Swal from "sweetalert2";

const StudentRegistration = () => {
  const [openModal, setOpenModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    studentName: "",
    clas: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    studentName: "",
    studentId: "",
    clas: "",
    subject: "",
  });
  const allStudentData = useSelector(
    (state) => state?.studentReducers?.students
  );

  const classes = [
    { text: "1", value: 1 },
    { text: "2", value: 2 },
    { text: "3", value: 3 },
    { text: "4", value: 4 },
    { text: "5", value: 5 },
  ];

  const subjects = [
    { text: "Odia", value: "odia" },
    { text: "Sanskrit", value: "sanskrit" },
    { text: "English", value: "english" },
  ];

  const openStudentModal = () => {
    setOpenModal(true);
  };

  const closeStudentModal = () => {
    setOpenModal(false);
    setStudentDetails({
      studentName: "",
      clas: "",
      subject: "",
    });
  };

  const closeUpdateModal = () => {
    setupdateModal(false);
    setStudentDetails({
      studentName: "",
      clas: "",
      subject: "",
    });
  };

  const dispatch = useDispatch();

  //^----------------For saving the student records----------------------
  const saveStudentData = () => {
    if (
      !studentDetails.studentName ||
      studentDetails.studentName.trim() === ""
    ) {
      alert("Please select the student name !");
    } else if (!studentDetails.clas) {
      alert("Please select the class !");
    } else if (!studentDetails.subject) {
      alert("Please select a subject !");
    } else {
      const body = {
        studentName: studentDetails.studentName,
        studentId: new Date().getTime().toString(),
        clas: studentDetails.clas,
        subject: studentDetails.subject,
      };
      dispatch(addStudent(body));
      setOpenModal(false);
      setStudentDetails({
        studentName: "",
        class: "",
        subject: "",
      });
    }
  };

  const openUpdateModal = (item) => {
    setupdateModal(true);
    setUpdateData({
      studentName: item.studentName,
      studentId: item.studentId,
      clas: item.clas,
      subject: item.subject,
    });
  };

  //~---------------For updating the student record----------------------
  const updateStudentRecord = () => {
    if (updateData.studentName.length === 0) {
      alert("Please select the student name !");
    } else if (!updateData.clas) {
      alert("Please select the class !");
    } else if (!updateData.subject) {
      alert("Please select a subject !");
    } else {
      console.log("body for update--------->", updateData);
      dispatch(updateStudent(updateData));
      setupdateModal(false);
      setStudentDetails({
        studentName: "",
        class: "",
        subject: "",
      });
    }
  };

  //!-----------------------For deleting all the student records------------
  const deleteAllRecords = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will clear all the student records !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllStudents());
        setStudentDetails([]);
      }
    });
  };

  //!-------------------Delete Individual Record----------------------

  const deleteSingleRecord = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will clear the student's records !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(data));
      }
    });
  };

  //todo--------------------------------------------
  console.log("studentDetails--------->", studentDetails);
  console.log("allStudentData--------->", allStudentData);

  return (
    <>
      <div>
        <div>
          <u>
            <h1>Welcome to the student registration portal</h1>
          </u>
        </div>
        <span
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "4%",
          }}
        >
          <Button variant="contained" onClick={openStudentModal}>
            <b> Add Students</b>
          </Button>
        </span>
        {allStudentData && allStudentData?.length > 0 ? (
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "4%",
              marginTop: "2%",
            }}
          >
            <Button
              variant="contained"
              onClick={deleteAllRecords}
              style={{ backgroundColor: "red" }}
            >
              <b>Delete All Students</b>
            </Button>
          </span>
        ) : null}
      </div>
      <div>
        <Modal open={openModal} onClose={closeStudentModal}>
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Student Name"
                multiline
                rows={2}
                variant="outlined"
                sx={{
                  width: 250,
                  marginTop: 2,
                  marginLeft: "17%",
                }}
                size="small"
                value={studentDetails.studentName}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    studentName: e.target.value,
                  })
                }
              />

              <FormControl
                sx={{ m: 1 }}
                style={{ width: 250, marginLeft: "30px", marginLeft: "17%" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Class</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Class"
                  value={studentDetails.clas}
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      clas: e.target.value,
                    })
                  }
                  style={{ padding: "10px" }}
                >
                  <MenuItem value={null}>None</MenuItem>
                  {classes.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{ m: 1 }}
                style={{ width: 250, marginLeft: "30px", marginLeft: "17%" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Subject</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Class"
                  value={studentDetails.subject}
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      subject: e.target.value,
                    })
                  }
                  style={{ padding: "10px" }}
                >
                  <MenuItem value={null}>None</MenuItem>
                  {subjects.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="contained"
                sx={{
                  width: 70,
                  marginTop: 2,
                  marginBottom: 1,
                  marginRight: 1,
                }}
                onClick={closeStudentModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 70,
                  marginTop: 2,
                  marginBottom: 1,
                  marginRight: 1,
                }}
                onClick={saveStudentData}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal open={updateModal} onClose={closeUpdateModal}>
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Student Name"
                multiline
                rows={2}
                variant="outlined"
                sx={{
                  width: 250,
                  marginTop: 2,
                  marginLeft: "17%",
                }}
                size="small"
                value={updateData.studentName}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    studentName: e.target.value,
                  })
                }
              />

              <FormControl
                sx={{ m: 1 }}
                style={{ width: 250, marginLeft: "30px", marginLeft: "17%" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Class</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Class"
                  value={updateData.clas}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      clas: e.target.value,
                    })
                  }
                  style={{ padding: "10px" }}
                >
                  <MenuItem value={null}>None</MenuItem>
                  {classes.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{ m: 1 }}
                style={{ width: 250, marginLeft: "30px", marginLeft: "17%" }}
                size="small"
              >
                <InputLabel id="demo-select-small">Subject</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Class"
                  value={updateData.subject}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      subject: e.target.value,
                    })
                  }
                  style={{ padding: "10px" }}
                >
                  <MenuItem value={null}>None</MenuItem>
                  {subjects.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="contained"
                sx={{
                  width: 70,
                  marginTop: 2,
                  marginBottom: 1,
                  marginRight: 1,
                }}
                onClick={closeUpdateModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 70,
                  marginTop: 2,
                  marginBottom: 1,
                  marginRight: 1,
                }}
                onClick={() => updateStudentRecord(updateData)}
              >
                Update
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        {allStudentData && allStudentData.length > 0 ? (
          <table
            border={4}
            style={{ marginLeft: "19%", width: "60%", marginTop: "5%" }}
          >
            <thead>
              <th>Sl no.</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Action</th>
            </thead>
            <tbody>
              {allStudentData?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.studentName}</td>
                  <td>{item?.clas}</td>
                  <td>{item?.subject}</td>
                  <td>
                    <Button
                      style={{ color: "blue" }}
                      onClick={() => openUpdateModal(item)}
                    >
                      <ModeEditOutlineRoundedIcon />
                    </Button>
                    <Button
                      style={{ color: "red" }}
                      onClick={() => deleteSingleRecord(item.studentId)}
                    >
                      <DeleteRoundedIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
};

export default StudentRegistration;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
