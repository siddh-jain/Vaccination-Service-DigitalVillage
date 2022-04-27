import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import List from "@mui/material/List";
import BottomNavigation from '@mui/material/BottomNavigation';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import HelpIcon from '@mui/icons-material/Help';
import WebFont from 'webfontloader';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchAppBar from "../templates/Navbar";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import emailjs from "emailjs-com";
import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';


// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// var config_ = {
//   headers: {
//     "Access-Control-Allow-Origin": "*"
//   }
// }

ChartJS.register(ArcElement, Tooltip, Legend);

const UsersList = (props) => {
  const [options, setOptions] = useState([]);
  const [color, setColor] = useState("red");
  const [alertmsg, setAlertmsg] = useState(null);


  useEffect(() => {
    axios({
      method: 'get',
      url: "/api/villagers/",
    })
      .then((response) => {
        setOptions(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])


  const [value, setValue] = React.useState(0);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });

  }, []);

  // filters in view-
  const [open_filters, setShowFilters] = useState(false);
  const handleOpen_filters = () => {
    setShowFilters(true);
  };

  const handleClose_filters = () => {
    setShowFilters(false);
  };

  // filter for covid status
  const [covidStatus_filter, setcovidStatus_filter] = useState({
    positive: true,
    negative: true,
    at_risk: true
  });

  const handlechangecovidstatus = (event) => {
    setcovidStatus_filter({
      ...covidStatus_filter,
      [event.target.name]: event.target.checked
    });
  };
  const { positive, negative, at_risk } = covidStatus_filter;

  const checkCovidStatus = (status) => {
    // console.log(status);
    var colour = null;
    if (status === "Positive") {
      colour = "#FF7C7C";
      return [covidStatus_filter.positive, colour];
    }
    else if (status === "Negative") {
      colour = "#92FF7C";
      return [covidStatus_filter.negative, colour];
    }
    else if (status === "At Risk") {
      colour = "#FFE57C";
      return [covidStatus_filter.at_risk, colour];
    }
    // console.log(covidStatus_filter.positive);
    return true;
  }



  // filter for vaccination-
  const [vaccination_filter, setvaccination_filter] = useState({
    Covaxin: true,
    Covishield: true,
    Sputnik_V: true,
    Corbevax: true
  });

  const handlechangevaccination = (event) => {
    setvaccination_filter({
      ...vaccination_filter,
      [event.target.name]: event.target.checked
    });
  };

  const { Covaxin, Covishield, Sputnik_V, Corbevax } = vaccination_filter;

  const checkVaccination = (vaccination) => {
    if (vaccination === "Covaxin") {
      return vaccination_filter.Covaxin;
    }
    else if (vaccination === "Covishield") {
      return vaccination_filter.Covishield;
    }
    else if (vaccination === "Sputnik_V") {
      return vaccination_filter.Sputnik_V;
    }
    else if (vaccination === "Corbevax") {
      return vaccination_filter.Corbevax;
    }
    return true;

  }

  // Filter for first dose dates-
  const [firstDose_filter, setfirstDose_filter] = useState({
    Completed: true,
    Remaining: true
  });

  const handlechangefirstDose = (event) => {
    // console.log(event.target.name, event.target.checked);
    setfirstDose_filter({
      ...firstDose_filter,
      [event.target.name]: event.target.checked
    });
  };

  const { Completed, Remaining } = firstDose_filter;

  const checkFirstDose = (firstDose) => {
    // console.log(firstDose);
    if (firstDose !== null) {
      return firstDose_filter.Completed;
    }
    else if (firstDose === null) {
      return firstDose_filter.Remaining;
    }

  };

  // Filter for second dose dates-
  const [secondDose_filter, setsecondDose_filter] = useState({
    Completed2: true,
    Remaining2: true
  });

  const handlechangesecondDose = (event) => {
    setsecondDose_filter({
      ...secondDose_filter,
      [event.target.name]: event.target.checked

    });
  };

  const { Completed2, Remaining2 } = secondDose_filter;

  const checkSecondDose = (secondDose) => {
    if (secondDose !== null) {
      return secondDose_filter.Completed2;
    }
    else if (secondDose === null) {

      return secondDose_filter.Remaining2;
    }
  };

  // Filters for Booster Dose date-
  const [boosterDose_filter, setboosterDose_filter] = useState({
    Completed3: true,
    Remaining3: true
  });

  const handlechangeboosterDose = (event) => {
    setboosterDose_filter({
      ...boosterDose_filter,
      [event.target.name]: event.target.checked
    });
  };

  const { Completed3, Remaining3 } = boosterDose_filter;

  const checkBoosterDose = (boosterDose) => {
    if (boosterDose !== null) {
      return boosterDose_filter.Completed3;
    }
    else if (boosterDose === null) {
      return boosterDose_filter.Remaining3;
    }
  };

  // Specific notifications-
  const [open_notification, setOpen_notification] = useState(false);

  const handleOpen_notification = () => {
    setOpen_notification(true);
  };

  const handleClose_notification = () => {
    setOpen_notification(false);
  };

  const onSubmitNotification = (event) => {
    event.preventDefault();

    setAlertmsg(null) 
    
    var themsg = document.getElementById('outlined-multiline-static').value;

    var send_emails = "";
    options.map((user, ind) => {
      if (user.Email != null && checkCovidStatus(user.CovidStatus) && checkVaccination(user.Vaccination) && checkFirstDose(user.FirstDoseDate) && checkSecondDose(user.SecondDoseDate) && checkBoosterDose(user.BoosterDoseDate)) {
        send_emails = send_emails + user.Email + ","
      }
    })

    if (send_emails.length > 0) {
      send_emails = send_emails.substring(0, send_emails.length - 1);
    }

    console.log(send_emails);
    // return;

    var templateParams = {
      subject: "hello",
      from_email: 'nnithil467@gmail.com',
      to_email: send_emails,
      message: themsg,
    };

    emailjs.send('service_ti4v7h2', 'template_ikeuk05', templateParams, 'user_a2QmVasySjQNnNT8Aix7m')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="success">Email sent successfully</Alert>)

        setOpen_notification(false);
      }, function (error) {
        console.log('FAILED...', error);
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Email could not be sent</Alert>)
        setOpen_notification(false);
      });

  };


  return (
    <div>
      <SearchAppBar />
      <div className="container">
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen_filters}
            >Show Filters</Button>

          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleOpen_notification}
              color="primary"
            >
              Send Notification
            </Button>
            <Dialog open={open_notification} onClose={handleClose_notification}>
              <DialogTitle>Notifications</DialogTitle>
              <DialogContent>
                <br></br>
                <Box display="flex"
                  justifyContent="center"
                  component="form" noValidate autoComplete="off">
                  <FormControl sx={{ width: '50ch' }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Message"
                      multiline
                      rows={10}
                      defaultValue=""
                    />
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose_notification} color="error" variant="outlined">Cancel</Button>
                <Button onClick={onSubmitNotification} color="primary" variant="contained">Send</Button>
              </DialogActions>
            </Dialog>

          </Grid>
        </Grid>

        <Dialog open={open_filters} onClose={handleClose_filters}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>

            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex" }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      <FormLabel component="legend">Covid Status</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={positive} onChange={handlechangecovidstatus} name="positive" />
                          }
                          label="Positive"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={negative} onChange={handlechangecovidstatus} name="negative" />
                          }
                          label="Negative"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={at_risk}
                              onChange={handlechangecovidstatus}
                              name="at_risk"
                            />
                          }
                          label="At Risk"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      <FormLabel component="legend">Vaccination</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={Covaxin} onChange={handlechangevaccination} name="Covaxin" />
                          }
                          label="Covaxin"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={Covishield} onChange={handlechangevaccination} name="Covishield" />
                          }
                          label="Covishield"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Sputnik_V}
                              onChange={handlechangevaccination}
                              name="Sputnik_V"
                            />
                          }
                          label="Sputnik V"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Corbevax}
                              onChange={handlechangevaccination}
                              name="Corbevax"
                            />
                          }
                          label="Corbevax"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>

                </Grid>
                <Grid item xs={6}>


                  <Box sx={{ display: "flex" }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      <FormLabel component="legend">First Dose</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={Completed} onChange={handlechangefirstDose} name="Completed" />
                          }
                          label="Completed"
                        />
                        <FormControlLabel

                          control={
                            <Checkbox checked={Remaining} onChange={handlechangefirstDose} name="Remaining" />
                          }
                          label="Remaining"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      <FormLabel component="legend">Second Dose</FormLabel>
                      <FormGroup>
                        <FormControlLabel

                          control={
                            <Checkbox checked={Completed2} onChange={handlechangesecondDose} name="Completed2" />
                          }
                          label="Completed"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={Remaining2} onChange={handlechangesecondDose} name="Remaining2" />
                          }
                          label="Remaining"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      <FormLabel component="legend">Booster Dose</FormLabel>
                      <FormGroup>
                        <FormControlLabel

                          control={
                            <Checkbox checked={Completed3} onChange={handlechangeboosterDose} name="Completed3" />
                          }
                          label="Completed"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={Remaining3} onChange={handlechangeboosterDose} name="Remaining3" />
                          }
                          label="Remaining"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_filters} color="primary" variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

        <br />
        {/*LIST  */}
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow style={{backgroundColor:"#E8E8E8"}}>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Aadhar Number</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Covid Status</TableCell>
                  <TableCell>Vaccination</TableCell>
                  <TableCell>First-Dose-Date</TableCell>
                  <TableCell>Second-Dose-Date</TableCell>
                  <TableCell>Booster-Dose-Date</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {options.map((user, ind) => (
                  checkCovidStatus(user.CovidStatus)[0] && checkVaccination(user.Vaccination) && checkFirstDose(user.FirstDoseDate) && checkSecondDose(user.SecondDoseDate) && checkBoosterDose(user.BoosterDoseDate) ?
                    (

                      <TableRow key={ind} style={{ backgroundColor: checkCovidStatus(user.CovidStatus)[1] }}>
                        <TableCell>{user.VillagerID}</TableCell>
                        <TableCell>{user.VillagerName}</TableCell>
                        <TableCell>{user.Gender}</TableCell>
                        <TableCell>{user.AadharNumber}</TableCell>
                        <TableCell>{user.PhoneNumber}</TableCell>
                        <TableCell>{user.CovidStatus}</TableCell>
                        <TableCell>{user.Vaccination}</TableCell>
                        <TableCell>{user.FirstDoseDate}</TableCell>
                        <TableCell>{user.SecondDoseDate}</TableCell>
                        <TableCell>{user.BoosterDoseDate}</TableCell>
                      </TableRow>

                    )
                    :
                    null
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div >
      <Box sx={{ pb: 7 }} >
        <Paper style={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={3}>
          {alertmsg}
        </Paper>
      </Box>
    </div >

  );
};

export default UsersList;
