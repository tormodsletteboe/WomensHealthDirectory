import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
//Imports
import { Button, Card, CardActions, CardContent, CardHeader, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';

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

  const submitEmail = () => {
    dispatch({ type: 'ADD_TO_NEWSLETTER', payload: text });
    setModal(false);
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
            <Button sx={({ justifyContent: 'center'})} variant='contained'
          style={{ backgroundColor: "#8EBBA7", color: "white" }} onClick={() => history.push('/membership')}>Click Here to Learn More</Button>
          </Typography>
        </Box>

        <Card variant='outlined' className='grid-col_12'>
          <CardHeader title='Preventative Care' subheader='What to look for before it happens'></CardHeader>
          <CardContent>
            <Typography paragraph>Info Info Info</Typography>
          </CardContent>
          <CardActions disableSpacing sx={({ 'justifyContent':'center' })}>
            <Button variant='contained' style={{ backgroundColor: "#8EBBA7", color: "white" }} onClick={() => history.push('/preventativecare')}>Learn More</Button>
          </CardActions>
        </Card>

        <Card variant='outlined' className='grid-col_12'>
          <CardHeader title='Resources' subheader='Educational resources'></CardHeader>
          <CardContent>
            <Typography paragraph>Info Info Info</Typography>
          </CardContent>
          <CardActions disableSpacing sx={({ 'justifyContent':'center' })}>
            <Button variant='contained' style={{ backgroundColor: "#8EBBA7", color: "white" }} onClick={() => history.push('/resources')}>Learn More</Button>
          </CardActions>
        </Card>

        <Box className='grid-col_12' id='newsletter'>
          <h1>Subscribe to our Newsletter!</h1>
          <Typography paragraph>Get weekly news and updates of how to advocate for your health!</Typography>
          <Button sx={({ '&:hover': { opacity: 0.7 } })} variant='outlined' style={{ backgroundColor: "#8EBBA7", color: "white" }} onClick={() => setModal(true)}>Subscribe</Button>

          {/* <h1>The ViFi Newsletter</h1>
          <Typography paragraph>Stay up-to-date on healthcare and what it really means for you</Typography>
          <Button sx={({ '&:hover': { opacity: 0.7 } })} variant='outlined' onClick={() => setModal(true)}>Subscribe</Button> */}

        </Box>

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

              <CardActions sx={({ 'justifyContent':'center' })}>
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
