import React from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// CUSTOM COMPONENTS
//Imports
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import useAnalyticsEventTracker from '../UseAnalyticsEventTracker/UseAnalyticsEventTracker';

function UserPage() {

  const [history, dispatch] = [useHistory(), useDispatch()];

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  //Google Analytics tracking for buttons
  const gaEventTracker = useAnalyticsEventTracker('Learn More');

  //track Learn More about Preventative Care click
  const handleLearnMorePcClick = () => {
    gaEventTracker('Learn More about Preventative Care clicked ');
    history.push('/preventativecare')
  }

  //track Learn More about Resources click
  const handleLearnMoreResourcesClick = () => {
    gaEventTracker('Learn More about Resources clicked ');
    history.push('/resources');
  }

  return (
    <>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}
    </div>
    {/* <div id="landingPage" className='grid'> */}
        <Card variant='outlined' className='grid-col_12' sx={{marginBottom: '20px'}}>
          <CardMedia
            component="img"
            alt="resources"
            height="300"
            src="https://image.freepik.com/free-photo/woman-consultation-with-doctor-female-appointment-with-gynecologist-breast-cancer_8119-2506.jpg"
            // src="https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          />
          <CardHeader title='Preventative Care' subheader='What to look for before it happens'></CardHeader>
          <CardActions disableSpacing sx={({ 'justifyContent': 'center' })}>
            <Button variant='contained' style={{ backgroundColor: "#8EBBA7", marginBottom: "10px" }} onClick={handleLearnMorePcClick}>Learn More
            </Button>
          </CardActions>
        </Card>

        <Card variant='outlined' className='grid-col_12' sx={{marginBottom: '20px'}}>
        <CardMedia
          component="img"
          alt="resources"
          height="300"
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
          <CardHeader title='Resources' subheader='Educational resources'></CardHeader>
          <CardActions disableSpacing sx={({ 'justifyContent': 'center' })}>
            <Button variant='contained' style={{ backgroundColor: "#8EBBA7", marginBottom: "10px" }} onClick={handleLearnMoreResourcesClick}>Learn More</Button>
          </CardActions>
        </Card>

        {/* </div> */}
        </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
