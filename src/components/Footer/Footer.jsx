import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
  <>

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
 
  </>
  );
}

export default Footer;
