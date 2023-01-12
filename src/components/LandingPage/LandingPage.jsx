import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
//Imports
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import useAnalyticsEventTracker from '../UseAnalyticsEventTracker/UseAnalyticsEventTracker';

const style = {  // modal styling
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to the ViFi!');
  const [[modalOpen, setModal], [text, setText]] = [useState(false), useState('')]; 
  const [history, dispatch] = [useHistory(), useDispatch()];

  //Google Analytics tracking for buttons
  const gaEventTracker = useAnalyticsEventTracker('Learn More');

  const submitEmail = () => { //add new email to newsletter database
    dispatch({ type: 'ADD_TO_NEWSLETTER', payload: text });
    setModal(false);
  }

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

   //track Learn More about Membership click
   const handleLearnMoreMembershipClick = () => {
    gaEventTracker('Learn More about Membership clicked ');
    history.push('/membership');
  }

   //track Subscribe click
   const handleSubscribeClick = () => {
    gaEventTracker('Subscribe to newsletter button clicked ');
    setModal(true);
  }

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div id="landingPage" className='grid'>
        <Box className='grid-col_12' id='intro' >
          <Typography paragraph>
            A women's health directory created to assist women in
            advocating for their health by educating users in healthcare
            guidelines, preventative care, and questions to grill
            your doctor with in order to make a statement that your health
            is not to be trifled with. To arms!
            </Typography>
            <Button sx={({ justifyContent: 'center' })} variant='contained'
              style={{ backgroundColor: "#8EBBA7", marginBottom: "20px" }} onClick={handleLearnMoreMembershipClick}>Click Here to Learn More
            </Button>
        </Box>

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

        <Card variant='outlined' className='grid-col_12' id='newsletter'>
          <CardMedia
            component="img"
            alt="newsletter"
            height="200"
            src="https://images.unsplash.com/photo-1583142305729-5cb119ce5d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          <CardHeader title='The ViFi Newsletter' 
          titleTypographyProps={{variant:'h4' }} />
          <CardContent>
            <Typography paragraph>Stay up-to-date on healthcare and what it really means for you</Typography>
            <Button sx={({ '&:hover': { opacity: 0.7 } })} variant='contained' onClick={() => setModal(true)}>Subscribe</Button>
          </CardContent>
        </Card>

        <Modal
          open={modalOpen}
          onClose={() => setModal(false)}
        >
          <Box sx={style}>
            <Card>
              <CardHeader title='The ViFi Newsletter' subheader='' sx={({ 'textAlign': 'center' })}></CardHeader>
              <CardContent>
                <Typography paragraph></Typography>
                <TextField variant='standard' onChange={(e) => setText(e.target.value)} sx={({ 'width': '100%' })} placeholder='example@email.com'></TextField>
              </CardContent>

              <CardActions sx={({ 'justifyContent': 'center' })}>
                <Button variant='contained' style={{ backgroundColor: "#8EBBA7", color: "white" }} onClick={submitEmail}>Subscribe</Button>
              </CardActions>
            </Card>
          </Box>
        </Modal>

      </div>
    </div>
  );
}

export default LandingPage;
