import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import WebFont from 'webfontloader';
import CssBaseline from '@mui/material/CssBaseline';
import SearchAppBar from "../templates/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from '@mui/material/Alert';
import Paper from "@mui/material/Paper";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const theme = createTheme();

const UsersList = (props) => {
  const [alertmsg, setAlertmsg] = useState(null);
  const [search, setSearch] = useState(0);
  const [query, setquery] = useState([]);
  const [VillagerName, setVillagerName] = useState("");
  const [AadharNumber, setAadharNumber] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Gender, setGender] = useState("");
  const [CovidStatus, setCovidStatus] = useState("");
  const [Vaccination, setVaccination] = useState("");
  const [FirstDoseDate, setFirstDoseDate] = useState("");
  const [SecondDoseDate, setSecondDoseDate] = useState("");
  const [BoosterDoseDate, setBoosterDoseDate] = useState("");
  const onChangequery = (event) => {
    setquery(event.target.value);
  };

  const onChangeVillagerName = (event) => {
    setVillagerName(event.target.value);
  };

  const onChangePhoneNumber = (event) => { setPhoneNumber(event.target.value); };
  const onChangeEmail = (event) => { setEmail(event.target.value); };
  const onChangeCovidStatus = (event) => { setCovidStatus(event.target.value); };
  const onChangeVaccination = (event) => { setVaccination(event.target.value); };

  const onChangeFirstDoseDate = (event) => {
    // console.log(Vaccination);
    if (Vaccination === null) {
      // alert("Please select Vaccination first");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Please select Vaccination first</Alert>)

      return;
    }
    setFirstDoseDate(event.target.value);
  };

  const onChangeSecondDoseDate = (event) => {
    if (FirstDoseDate === "") {
      // alert("Please enter first dose date first");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Please enter first dose date first</Alert>)

      return;
    }
    setSecondDoseDate(event.target.value);
  };

  const onChangeBoosterDoseDate = (event) => {
    if (SecondDoseDate === "") {
      // alert("Please enter second dose date first");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Please enter second dose date first</Alert>)

      return;
    }
    setBoosterDoseDate(event.target.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();

    setAlertmsg(null) 

    axios({
      method: 'post',
      url: "/api/find/",
      // headers: { 'X-CSRFToken': csrftoken },
      data: { "AadharNumber": query }
    })
      .then((response) => {
        setSearch(1);
        console.log(response.data)
        setVillagerName(response.data.VillagerName);
        setAadharNumber(response.data.AadharNumber);
        setPhoneNumber(response.data.PhoneNumber);
        setEmail(response.data.Email);
        setGender(response.data.Gender);
        setCovidStatus(response.data.CovidStatus);
        setVaccination(response.data.Vaccination);
        // console.log(typeof response.data.FirstDoseDate);
        if (response.data.FirstDoseDate === null) {
          setFirstDoseDate("");
        }
        else {
          setFirstDoseDate(response.data.FirstDoseDate);
        }
        if (response.data.SecondDoseDate === null) {
          setSecondDoseDate("");
        }
        else {
          setSecondDoseDate(response.data.SecondDoseDate);
        }
        if (response.data.BoosterDoseDate === null) {
          setBoosterDoseDate("");
        }
        else {
          setBoosterDoseDate(response.data.BoosterDoseDate);
        }
        if (response.data.Email === null) {
          setEmail("");
        }
        else {
          setEmail(response.data.Email);
        }
      })
      .catch((error) => {
        console.log(error);
        // alert("No such user found");
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">No such user found</Alert>)

      });
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });

  }, []);

  const onSubmitChanges = (event) => {
    event.preventDefault();

    setAlertmsg(null) 

    var d1 = Date.parse(FirstDoseDate);
    var d2 = Date.parse(SecondDoseDate);
    var d3 = Date.parse(BoosterDoseDate);

    if (isNaN(d1) && FirstDoseDate !== "") {
      // alert("Invalid Date Format for First Dose Date");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Invalid Date Format for First Dose Date</Alert>)

      return;
    }
    if (isNaN(d2) && SecondDoseDate !== "") {
      // alert("Invalid Date Format for Second Dose Date");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Invalid date format for Second Dose Date</Alert>)

      return;
    }

    if (isNaN(d3) && BoosterDoseDate !== "") {
      // alert("Invalid Date Format for Booster Dose Date");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Invalid date format for Booster Dose Date</Alert>)

      return;
    }

    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (!regex.test(Email)) {
      // alert("Invalid Email");
      setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Invalid email address</Alert>)

      return;
    }


    const newUser = {
      // "VillagerName": VillagerName,
      "AadharNumber": AadharNumber,
      // "Gender": Gender,
      "PhoneNumber": PhoneNumber,
      "Email": Email,
      "CovidStatus": CovidStatus,
      "Vaccination": Vaccination,
      "FirstDoseDate": FirstDoseDate,
      "SecondDoseDate": SecondDoseDate,
      "BoosterDoseDate": BoosterDoseDate,
    };

    axios({
      method: 'post',
      url: "/api/edit/",
      // headers: { 'X-CSRFToken': csrftoken },
      data: newUser
    })
      .then((response) => {
        console.log(response.data)
        // alert("Changes Saved");
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="success">Changes Saved</Alert>)

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteRecord = (event) => {
    event.preventDefault();

    const delUser = {
      "AadharNumber": AadharNumber
    };

    axios({
      method: 'delete',
      url: "/api/delete/",
      // headers: { 'X-CSRFToken': csrftoken },
      data: delUser
    })
      .then((response) => {
        // alert("Record Deleted");
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="success">Record deleted</Alert>)

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <SearchAppBar />
        <div className="container" >
          <br />
          <br />
          <br />

          <Box
            display="flex"
            justifyContent="center"
          >

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={onSubmit}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id="standard-basic"
              label="Enter Aadhar Card Number"
              value={query}
              onChange={onChangequery}
            />

            &nbsp;
            &nbsp;
            &nbsp;
          </Box>
          <br />

          {
            search === 1 ?
              <>
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />

                    <TextField
                      margin="normal"
                      fullWidth
                      label="Villager Name"
                      autoFocus
                      value={VillagerName}
                      onChange={onChangeVillagerName}
                    />

                    <TextField
                      margin="normal"
                      fullWidth
                      label="Aadhar Card Number"
                      autoFocus
                      value={AadharNumber}
                    // onChange={onChangeAadharNumber}
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

                    <TextField
                      margin="normal"
                      fullWidth
                      label="Gender"
                      autoFocus
                      value={Gender}
                    />

                    <Box sx={{ minWidth: 120 }}>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">Vaccination</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={Vaccination}
                          label="Vaccination"
                          onChange={onChangeVaccination}
                        >
                          <MenuItem value={"Covaxin"}>Covaxin</MenuItem>
                          <MenuItem value={"Covishield"}>Covishield</MenuItem>
                          <MenuItem value={"Sputnik V"}>Sputnik V</MenuItem>
                          <MenuItem value={"Corbevax"}>Corbevax</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">Covid Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={CovidStatus}
                          label="CovidStatus"
                          onChange={onChangeCovidStatus}
                        >
                          <MenuItem value={"Positive"}>Positive</MenuItem>
                          <MenuItem value={"Negative"}>Negative</MenuItem>
                          <MenuItem value={"At Risk"}>At Risk</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <TextField
                      margin="normal"
                      fullWidth
                      label="First Dose Date"
                      autoFocus
                      value={FirstDoseDate}
                      onChange={onChangeFirstDoseDate}
                    />

                    <TextField
                      margin="normal"
                      fullWidth
                      label="Second Dose Date"
                      autoFocus
                      value={SecondDoseDate}
                      onChange={onChangeSecondDoseDate}
                    />

                    <TextField
                      margin="normal"
                      fullWidth
                      label="Booster Dose Date"
                      autoFocus
                      value={BoosterDoseDate}
                      onChange={onChangeBoosterDoseDate}
                    />
                    {/* <DatePicker
                value={FirstDoseDate}
                onChange={onChangeFirstDoseDate}
              /> */}
                    {/* 
              <MobileDatePicker
                label="For mobile"
                value={FirstDoseDate}
                onChange={onChangeFirstDoseDate}
                renderInput={(params) => <TextField {...params} />}
              /> */}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={onSubmitChanges}
                      color="success"
                    >
                      Save Changes
                    </Button>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={onDeleteRecord}
                      color="error"
                    >
                      Delete Record
                    </Button>


                  </Container>
                </ThemeProvider>

              </>
              :
              <div>
              </div>
          }


          {/* 
          <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <List>

            </List>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label="Help" icon={<HelpIcon />} />
              </BottomNavigation>
            </Paper>
          </Box> */}
        </div>
      </div>
      <Box sx={{ pb: 7 }} >
        <Paper style={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={3}>
          {alertmsg}
        </Paper>
      </Box>
    </div>

  );


};

export default UsersList;
