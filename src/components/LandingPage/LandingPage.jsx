import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { Box } from '@mui/system';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to the ViFi!');
  const history = useHistory();

  const learnMore = () => {
    history.push('/membership');
  }

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div id="landingPage" className='grid'>
        <Box className='grid-col_12' id='intro'>
          <Typography paragraph>
            A women's health directory created to assist women in
            advocating for their health by educating users in healthcare
            guidelines, preventative care, and questions to grill
            your doctor with in order to make a statement that your health
            is not to be trifled with. To arms!
          </Typography>
          <Button sx={({ align: 'center' })} variant='contained' onClick={() => history.push('/membership')}>Click Here to Learn More</Button>
        </Box>
        
        <Card variant='outlined' className='grid-col_12'>
          <CardHeader title='Preventative Care' subheader='What to look for before it happens'></CardHeader>
          <CardContent>
            <Typography paragraph>Info Info Info</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button variant='contained' onClick={() => history.push('/preventativecare')}>Learn More</Button>
          </CardActions>
        </Card>

        <Card variant='outlined' className='grid-col_12'>
          <CardHeader title='Resources' subheader='Educational resources'></CardHeader>
          <CardContent>
            <Typography paragraph>Info Info Info</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button variant='contained' onClick={() => history.push('/resources')}>Learn More</Button>
          </CardActions>
        </Card>

      </div>
    </div>
  );
}

export default LandingPage;
