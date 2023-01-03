import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./UserVirtualHealth.css";

//test
function UserVirtualHealth() {
  const virtualhealthlinks = useSelector((store) => store.virtualhealth_links);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  

  return (
  
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc' }}>
      <div className="virtualHealthTitle">
        <h3>Virtual Health</h3>
      </div>
      <ul>
        {virtualhealthlinks.map((virthealthlink) => (
          <li key={virthealthlink.id}>
            <Card sx={{ minWidth: 275, marginBottom: 2 }} >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>
      </Box>
    </Container>
      
  
  );
}

export default UserVirtualHealth;
