import React from 'react';
import './About.css';

function AboutPage() {
  return (
    <>
    <div className="aboutTitle">
      <h3>About</h3>
    </div>
    
    <div className="aboutText">
        <p><b>The Vifi</b> strives to develop and maintain a diverse team of experts across the healthcare industry in order to serve our members in a holistic and empathetic manner.</p>
    </div>

    <div className = "aboutImage">
      <img src="./images/about.png"/>
    </div>

    <div className = "caption">
      <ul>
        <li>Laina Latterner</li>
        <li>Founder</li>
        <li>Women’s health enthusiast</li>
      </ul>
    </div>

    <div className="bio">
      <p>
      Laina Latterner is an accomplished strategic sales and marketing consultant 
      with over 15 years of experience in the global medical device industry with 
      organizations including Roche Diagnostics and McKesson.</p>
      
      <p>Her critical thinking 
      and innovative ideas combined with her deep knowledge of laboratory testing, 
      women’s health, and healthcare reform, enable her to identify unique opportunities 
      in the marketplace for her clients.</p>
  
      <p>Throughout her career she focused on clinician education and saw a gap 
        between the information healthcare providers knew and the amount of time they 
        had to share it with their patients. The ViFi is her solution to this problem. 
        She is passionate about working towards health equity and improving women’s 
        health outcomes and experiences in the healthcare system.. She also loves a 
        good DIY project, wine and spending time with her family. 
        </p>
  </div>
    </>
  );
}

export default AboutPage;
