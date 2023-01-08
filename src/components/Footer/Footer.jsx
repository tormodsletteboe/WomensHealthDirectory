import React from 'react';
import './Footer.css';
import {useSelector} from 'react-redux';


function Footer() {
const user = useSelector((store) => store.user);


 return (
  <>
  {/* if the user is not an admin, display the mission statement in the footer */}
  {user.access_level === 0 && (
    <footer>
    <p className="footerTitle">
        <b>Mission:</b>
    </p>
      

    <p>
        The ViFi strives to improve women’s health outcomes by empowering women with concise and actionable 
        tips for navigating the US healthcare system.  We believe that educated patients become engaged 
        in their healthcare and make better choices for themselves. We enable the average patient to confidently 
        advocate for themselves through our hub of healthcare resources.
    </p>
        
    <p className = "copyright">
        Register now to access our healthcare pro tips.
        &copy; The Vifi
    </p>
    </footer>
  )}

    {/* If no user is logged in, display the mission statement in the footer */}
    {!user.id && (
        <footer>
         <p className="footerTitle">
             <b>Mission:</b>
         </p>
         <p>
             The ViFi strives to improve women’s health outcomes by empowering women with concise and actionable 
             tips for navigating the US healthcare system.  We believe that educated patients become engaged 
             in their healthcare and make better choices for themselves. We enable the average patient to confidently 
             advocate for themselves through our hub of healthcare resources.
         </p>
         <p className = "copyright">
             Register now to access our healthcare pro tips.
             &copy; The Vifi
         </p>
         </footer>
    )}
  </>
  );
}

export default Footer;
