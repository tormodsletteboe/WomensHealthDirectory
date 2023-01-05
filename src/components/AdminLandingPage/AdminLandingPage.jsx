import React, { useState } from 'react';
import { Button } from '@mui/material';
import './AdminLandingPage.css';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AdminLandingPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  
  //const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Welcome, Admin!');
  const history = useHistory();

  const handleViewFeedback = () => {
    history.push('/feedbackview');
  }

  return (
    <div className = "adminLandingPage">
      <h2>{heading}</h2>
      <Button variant="contained" 
              style = 
                {{backgroundColor: '#8EBBA7', 
                color: '#FFFFFF', 
                fontSize: '18px'}}
                onClick = {handleViewFeedback}
              >View User Feedback
      </Button>
    </div>
  );
}

export default AdminLandingPage;
