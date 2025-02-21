import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const TimeWithDay = () => {
  const firstName = localStorage.getItem('firstName');

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getGreetingMessage = () => {
    const currentHour = currentTime.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const day = { weekday: 'long' };
  const formattedTime = currentTime.toLocaleString('en-US', options);
  const formattedDay = currentTime.toLocaleString('en-US', day);
  const greetingMessage = getGreetingMessage();

  return (
    <Grid
      container
      alignItems="center"
      sx={{ background: '', height: '88dvh', padding: '10px' }}
    >
      <Grid item lg={6} sx={{ margin: 'auto' }}>
        <Typography variant="h3" sx={{ fontWeight: '50' }}>
          {greetingMessage} {''}
          <span style={{ textTransform: 'capitalize' }}>{firstName}</span>
        </Typography>

        <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
          {formattedTime}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: '50' }}>
          It's {formattedDay}
        </Typography>
      </Grid>

      <Grid item lg={6} sx={{ margin: 'auto', padding: '10px' }}>
        <img src="https://i.ibb.co/NVjQq2S/img.png" alt="" width="70%" />
      </Grid>
    </Grid>
  );
};

export default TimeWithDay;
