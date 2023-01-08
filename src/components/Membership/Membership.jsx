import { Box, Button, Container, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

function Membership() {

    const [history] = [useHistory()];

    return (
        <Container sx={({ 'textAlign':'center', marginBottom: "20px"})} id='membershipPage'>
            <h1>What is the ViFi?</h1>
            <Typography paragraph>
                Members of The ViFi can save time and lessen their mental load
                by using our compilation of actionable healthcare information
                from reputable healthcare organizations.  We've done all the
                research for you so you can log in, get your info, and get
                on with your life outside of the doctor's office.
            </Typography>
            <Typography paragraph>
                The ViFi is a one-stop online health hub and growing community
                dedicated to improving women's health by providing actionable
                healthcare information that enables women to easily advocate for
                themselves in healthcare settings.
            </Typography>
            <Typography>
                Members have access to our comprehensive screening guidelines based
                on age and specialty, suggested questions to ask your provider in
                your appointment, resources for additional information, healthcare
                shopping toolkits,  and a directory of virtual healthcare providers
                who can address your specific needs.
            </Typography>
            <h4>Don't wait to get your answers.</h4>
            <h4>It's time to be proactive.</h4>
            <Button variant='contained' onClick={() => history.push('/registration')}>Sign Up To Get Access</Button>
        </Container>
    )
}

export default Membership;