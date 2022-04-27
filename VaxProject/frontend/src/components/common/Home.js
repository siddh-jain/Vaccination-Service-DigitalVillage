import { useState, useEffect } from "react";
import axios from "axios"

import BottomNavigation from '@mui/material/BottomNavigation';
import * as React from 'react';
import Box from '@mui/material/Box';
import WebFont from 'webfontloader';
import logo from "../../../src/download.jpeg"
import SearchAppBar from "../templates/Navbar";
import { Pie } from 'react-chartjs-2';


const UsersList = (props) => {
  const [FirstDoseDone, setFirstDoseDone] = useState(0);
  const [SecondDoseDone, setSecondDoseDone] = useState(0);
  const [BoosterDoseDone, setBoosterDoseDone] = useState(0);
  const [FirstDoseRemaining, setFirstDoseRemaining] = useState(0);
  const [SecondDoseRemaining, setSecondDoseRemaining] = useState(0);
  const [BoosterDoseRemaining, setBoosterDoseRemaining] = useState(0);
  const [stat_pos, setStatPos] = useState(0);
  const [stat_neg, setStatNeg] = useState(0);
  const [stat_risk, setStatRisk] = useState(0);
  const [vaccinatedTill, setList] = useState([0, 0, 0, 0])

  useEffect(() => {
    axios({
      method: 'get',
      url: "/api/villagers/",
    })
      .then((response) => {
        var props = response.data

        var FirstDoseDone = 0;
        var SecondDoseDone = 0;
        var BoosterDoseDone = 0;
        var FirstDoseRemaining = 0;
        var SecondDoseRemaining = 0;
        var BoosterDoseRemaining = 0;
        var stat_pos = 0;
        var stat_neg = 0;
        var stat_risk = 0;
        var t = 0
        // console.log(props);
        for (let i = 0; i < props.length; i++) {
          //vaccination status
          t = 0
          if (props[i].FirstDoseDate !== null) {
            t++
            FirstDoseDone++;
          }
          else {
            FirstDoseRemaining++;
          }
          if (props[i].SecondDoseDate !== null) {
            t++
            SecondDoseDone++;
          }
          else {
            SecondDoseRemaining++;
          }
          if (props[i].BoosterDoseDate !== null) {
            t++
            BoosterDoseDone++;
          }
          else {
            BoosterDoseRemaining++;
          }
          var temp = vaccinatedTill
          temp[t]++
          setList(temp)

          //covid status
          if (props[i].CovidStatus === "Positive") {
            stat_pos++;
          }
          else if (props[i].CovidStatus === "Negative") {
            stat_neg++;
          }
          else if (props[i].CovidStatus === "At Risk") {
            stat_risk++;
          }
        }

        setFirstDoseDone(FirstDoseDone);
        setSecondDoseDone(SecondDoseDone);
        setBoosterDoseDone(BoosterDoseDone);
        setFirstDoseRemaining(FirstDoseRemaining);
        setSecondDoseRemaining(SecondDoseRemaining);
        setBoosterDoseRemaining(BoosterDoseRemaining);
        setStatPos(stat_pos);
        setStatNeg(stat_neg);
        setStatRisk(stat_risk);
        // console.log(vaccinatedTill)
      })
      .catch((error) => {
        console.log(error);
      });
  }, )

  const data1 = {
    labels: ['Positive', 'Negative', 'At Risk'],
    datasets: [
      {
        label: 'Covid Status',
        data: [stat_pos, stat_neg, stat_risk],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(3, 244, 23, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(3, 244, 23, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ]
  };

  const data2 = {
    labels: ['Unvaccinated', 'Single dosed', 'Double dosed', 'Boosted'],
    datasets: [
      {
        label: 'Vaccination Status',
        data: vaccinatedTill,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(3, 244, 23, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(3, 244, 23, 1)',
        ],
        borderWidth: 1,
      },
    ]
  };

  const data3 = {
    labels: ['First Dose Done', 'First Dose Remaining'],
    datasets: [
      {
        label: 'First Dose Status',
        data: [FirstDoseDone, FirstDoseRemaining],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ]
  };

  const data4 = {
    labels: ['Second Dose Done', 'Second Dose Remaining'],
    datasets: [
      {
        label: 'Second Dose Status',
        data: [SecondDoseDone, SecondDoseRemaining],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ]
  };

  const data5 = {
    labels: ['Booster Dose Done', 'Booster Dose Remaining'],
    datasets: [
      {
        label: 'Booster Dose Status',
        data: [BoosterDoseDone, BoosterDoseRemaining],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ]
  };


  const [value, setValue] = React.useState(0);


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });

  }, []);

  return (
    <div>
      <SearchAppBar />
      <div className="container">
        <br />
        <br />
        <div className="image-container">
          <img src={logo} alt="logo" height={300} width={200} />
        </div>

        <h1 style={{ textAlign: "center" }}>Village Statistics</h1>

        <h3 style={{ textAlign: "center" }}>{data1["datasets"][0]["label"]}</h3>
        <Box display="flex"
          justifyContent="center">
          <Pie data={data1} options={{
            padding: "2px",
            maintainAspectRatio: false,
          }} />
        </Box>

        <h3 style={{ textAlign: "center" }}>{data2["datasets"][0]["label"]}</h3>
        <Box display="flex"
          justifyContent="center">
          <Pie data={data2} options={{
            padding: "2px",
            maintainAspectRatio: false,
          }} />
        </Box>

        <h3 style={{ textAlign: "center" }}>{data3["datasets"][0]["label"]}</h3>
        <Box display="flex"
          justifyContent="center">
          <Pie data={data3} options={{
            padding: "2px",
            maintainAspectRatio: false,
          }} />
        </Box>

        <h3 style={{ textAlign: "center" }}>{data4["datasets"][0]["label"]}</h3>
        <Box display="flex"
          justifyContent="center">
          <Pie data={data4} options={{
            padding: "2px",
            maintainAspectRatio: false,
          }} />
        </Box>

        <h3 style={{ textAlign: "center" }}>{data5["datasets"][0]["label"]}</h3>
        <Box display="flex"
          justifyContent="center">
          <Pie data={data5} options={{
            padding: "2px",
            maintainAspectRatio: false,
          }} />
        </Box>

        {/* <Box sx={{ pb: 7 }} >
          <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
            </BottomNavigation>
          </Paper>
        </Box> */}
        
      </div>
    </div>
  );


};

export default UsersList;
