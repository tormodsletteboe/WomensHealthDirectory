import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./VirtualHealth.css";
import VirtualHealthAccordion from './VirtualHealthAccordion';
import EditVirtualHealthLinksAccordion from './EditVirtualHealthAccordion';
import { Typography } from "@mui/material";

function VirtualHealth() {
  const dispatch = useDispatch();
  const addVirtualHealthLinks = useSelector((store) => store.addVirtualHealthLinks);
  const virtualhealthlinks = useSelector((store) => store.virtualhealth_links);
   const resourceToEdit = useSelector((store) => store.resourceToEdit);
 
   //this is used with the get ICONS button
  const [result, setResult] = useState([addVirtualHealthLinks.logo_url]);
  const [selected, setSelected] = useState(addVirtualHealthLinks.logo_url);

  const handleAddVirtualHealth = () => {
   
    dispatch({
      type: "ADD_VIRTUALHEALTH_LINK",
      payload: {
        name: addVirtualHealthLinks.title,
        info_cost: addVirtualHealthLinks.info_cost,
        link: addVirtualHealthLinks.link,
        specialty: addVirtualHealthLinks.specialty,
        logo_url: addVirtualHealthLinks.logo_url,
        description: addVirtualHealthLinks.description,
      },
    });

     dispatch({type:'CLEAR_ADD_VIRTUALHEALTH_LINKS'});
  };

  useEffect(() => {
    console.log("virtual health  useeffect ran");


    //fetch all virtual health links from database
    //dispatch someting
     dispatch({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  }, []);

  

  let imgpath = "./images/vifidefault.jpeg";
  let noImagePath = "";

  return (
    <Box>
      <Typography variant="h5">Add New Virtual Health</Typography>
      <Grid container >
        <Grid item xs={12} my={1}>
          <Accordion
          expanded>
            <AccordionSummary >
              <Grid container columnSpacing={1}>
                <Grid item xs={1} className="centerthis">
                  <img src={selected} />
                </Grid>
                <Grid item xs={4} px={1} className="centerthis">
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={addVirtualHealthLinks.title}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_VIRTUALHEALTH_TITLE",
                        payload: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={7} className="centerthis">
                  <TextField
                    label="Link"
                    variant="outlined"
                    fullWidth
                    value={addVirtualHealthLinks.link}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_VIRTUALHEALTH_LINK",
                        payload: event.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={11}>
                <TextField
                  variant="outlined"
                  label="description"
                  fullWidth
                  multiline
                  maxRows={4}
                  value={addVirtualHealthLinks.description}
                  onChange={(event) =>
                    dispatch({
                      type: "SET_VIRTUALHEALTH_DESCRIPTION",
                      payload: event.target.value,
                    })
                  }
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <select
              className="dropdown"
              defaultValue={result[0]}
              onChange={(e) => {
                setSelected(e.target.value);
                dispatch({
                  type: "SET_VIRTUALHEALTH_LOGO_URL",
                  payload: e.target.value,
                });
              }}
            >
              <option key={'sdfs'} disabled>Choose One</option>
              <option key={noImagePath}>{noImagePath}</option>
              <option key={imgpath}>{imgpath}</option>
              {result.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </Grid>
          <Grid item xs={5}>
            <Button
            sx={{color:'#8EBBA7'}}
              onClick={async () => {
                const url = new URL(addVirtualHealthLinks.link);
                console.log(url.hostname);
                const result = await axios.get(
                  `https://favicongrabber.com/api/grab/${url.hostname}`
                );
                setResult(result.data.icons.map((icon) => icon.src));
                console.log(result.data.icons.map((icon) => icon.src));
              }}
            >
              get icons
            </Button>
          </Grid>
          <Grid item xs={5} textAlign={"end"}>
            <Button variant="contained" onClick={handleAddVirtualHealth}>Add Virtual Health Link</Button>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{mx:2,marginTop:10}}>
        <Typography variant="h3"> Virtual Health Links </Typography>
      {/* render all medical links from database */}
      {virtualhealthlinks.map((virtualhealthlink) =>
        virtualhealthlink.id === resourceToEdit.id ? (
          <EditVirtualHealthLinksAccordion key={virtualhealthlink.id} medLinkToEdit={virtualhealthlink} />
        ) : (
          <VirtualHealthAccordion key={virtualhealthlink.id} medicallink={virtualhealthlink} />
        )
      )}
      </Box>
    </Box>
  );
}

export default VirtualHealth;
