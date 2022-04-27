import axios from "axios";
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SearchAppBar from "../templates/Navbar";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Paper from "@mui/material/Paper";

const theme = createTheme();

const Register = (props) => {
  const [name, setName] = useState("");
  const [AadharNumber, setAadharNumber] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");

  const [gender, setGender] = useState("");
  const [alertmsg, setAlertmsg] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeAadharNumber = (event) => {
    setAadharNumber(event.target.value);
  };

  const onChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeGender = (event) => {
    setGender(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setAlertmsg(null)

    if (name === "") {
      // alert("Please fill the Name");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Please fill the Name</Alert>)
      return;
    }
    if (AadharNumber === "") {
      // alert("Please fill the Aadhar Number");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Please fill the Aadhar Number</Alert>)
      return;
    }
    // if(PhoneNumber ===""){
    //   alert("Please fill the Phone Number");
    //   return;
    // }
    if (gender === "") {
      // alert("please fill the gender")
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Please fill the Gender</Alert>)

      return;
    }
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!regex.test(Email)) {
      // alert("Invalid Email");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Invalid Email</Alert>)

      return;
    }
    const newUser = {
      VillagerName: name,
      AadharNumber: AadharNumber,
      PhoneNumber: PhoneNumber,
      Email: Email,
      Gender: gender
      // date: Date.now(),
    };

    axios({
      method: 'post',
      url: "/api/add/",
      // headers: { 'X-CSRFToken': csrftoken },
      data: newUser
    })
      .then((response) => {
        console.log(response.data);
        // alert("Successfully Registered");
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="success">Successfully Registered</Alert>)

      })
      .catch((error) => {
        console.log(error);
        // alert("User already exists");
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">User already exists</Alert>)
      });
  }

  return (
    <div>
      <SearchAppBar />
      <br /><br /><br />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <TextField
            margin="normal"
            fullWidth
            label="Villager Name"
            autoFocus
            value={name}
            onChange={onChangeUsername}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Aadhar Card Number"
            autoFocus
            value={AadharNumber}
            onChange={onChangeAadharNumber}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Phone Number"
            autoFocus
            value={PhoneNumber}
            onChange={onChangePhoneNumber}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoFocus
            value={Email}
            onChange={onChangeEmail}
          />
            <Box  sx={{ minWidth: 120 }}>
              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={onChangeGender}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
              color="success"
            >
              Add
            </Button>

        </Container>
      </ThemeProvider>

      <Box sx={{ pb: 7 }} >
        <Paper style={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={3}>
          {alertmsg}
        </Paper>
      </Box>
    </div>
  );
}

export default Register;