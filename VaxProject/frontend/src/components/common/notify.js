import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import SearchAppBar from "../templates/Navbar";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import emailjs from "emailjs-com";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Paper from "@mui/material/Paper";

const UsersList = (props) => {
  const [alertmsg, setAlertmsg] = useState(null);
  const [options, setOptions] = useState([]);

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

  }, []);

  // const Telegraf = require('telegraf');
  // const bot = new Telegraf('5395022229:AAGlccJP-o_qTboYbkhzv5AZvA0j6n-Ld5s'
  // );
  //  bot.command('start', ctx => {
  //   bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
  //   })
  // })

  const onSubmit = (e) => {
    e.preventDefault();

    setAlertmsg(null) 

    var themsg = document.getElementById('outlined-multiline-static').value;

    var send_emails = "";
    options.map((user, ind) => {
      if (user.Email != null) {
        send_emails = send_emails + user.Email + ","
      }
    })

    if (send_emails.length > 0) {
      send_emails = send_emails.substring(0, send_emails.length - 1);
    }

    console.log(send_emails);
    var templateParams = {
      subject: "helo",
      from_email: 'nnithil467@gmail.com',
      to_email: send_emails,
      message: themsg,
    };

    emailjs.send('service_ti4v7h2', 'template_ikeuk05', templateParams, 'user_a2QmVasySjQNnNT8Aix7m')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        // alert("Email sent successfully!");
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="success">Email sent successfully</Alert>)
        
      }, function (error) {
        // console.log('FAILED...', error);
        setAlertmsg(<Alert onClose={() => { setAlertmsg(null) }} severity="error">Email could not be sent</Alert>)

      });
  }

  return (


    <div>
      <SearchAppBar />
      <div className="container" >
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>Send message to villagers</h1>

        <br />
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

        <br />

        <Box display="flex"
          justifyContent="center">

          <Button variant="contained" color="success" onClick={onSubmit}>
            Submit</Button>
        </Box>

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
