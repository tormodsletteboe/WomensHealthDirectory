import React from 'react';
import './Footer.css';
import {useSelector} from 'react-redux';
import { Typography } from '@mui/material';

function Footer() {
const user = useSelector((store) => store.user);

 return (
  <>
  {/* if the user is not an admin, display the mission statement in the footer */}
  {user.access_level === 0 && (
    <footer>
         <Typography variant='h6' className="footerTitle" paddingBottom={0} marginTop="20px">
            Mission:
        </Typography>
        <Typography paragraph p={2} paddingBottom={0} paddingTop={1}>
            The ViFi strives to improve women’s health outcomes by empowering women with concise and actionable 
            tips for navigating the US healthcare system.  We believe that educated patients become engaged 
            in their healthcare and make better choices for themselves. We enable the average patient to confidently 
            advocate for themselves through our hub of healthcare resources.
        </Typography>
        <Typography paragraph className = "copyright" p={2} paddingTop={0}>
            Register now to access our healthcare pro tips.
            &copy; The Vifi
        </Typography>
    </footer>
  )}

    {/* If no user is logged in, display the mission statement in the footer */}
    {!user.id && (
        <footer>
         <Typography variant='h6' className="footerTitle" paddingBottom={0} marginTop="20px">
            Mission:
        </Typography>
        <Typography paragraph p={2} paddingBottom={0} paddingTop={1}>
            The ViFi strives to improve women’s health outcomes by empowering women with concise and actionable 
            tips for navigating the US healthcare system.  We believe that educated patients become engaged 
            in their healthcare and make better choices for themselves. We enable the average patient to confidently 
            advocate for themselves through our hub of healthcare resources.
        </Typography>
        <Typography paragraph className = "copyright" p={2} paddingTop={0}>
            Register now to access our healthcare pro tips.
            &copy; The Vifi
        </Typography>
        </footer>
    )}
  </>
  );
}

export default Footer;
