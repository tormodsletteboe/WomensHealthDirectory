import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Typography } from "@mui/material";
import Slide from '@mui/material/Slide';
import ToggleButton from '@mui/material/ToggleButton';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Tooltip from '@mui/material/Tooltip';


import "./MedicalLinks.css";
import MedicalLinksAccordion from "./MedicalLinksAccordion";
import EditMedicalLinksAccordion from './EditMedicalLinksAccordion';
import PreviewAddMedicalLinkCard from "./PreviewAddMedicalLinkCard";

function MedicalLinks() {
  const dispatch = useDispatch();
  const addMedLinks = useSelector((store) => store.addMedicalLinks);
  const medicallinks = useSelector((store) => store.medicallinks);
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

  const [result, setResult] = useState([addMedLinks.logo_url]);
  const [selected, setSelected] = useState(addMedLinks.logo_url);

  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  
  

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleAddMedLink = () => {
   
    dispatch({
      type: "ADD_MEDICAL_LINK",
      payload: {
        name: addMedLinks.title,
        link: addMedLinks.url,
        logo_url: addMedLinks.logo_url,
        description: addMedLinks.description,
      },
    });

    dispatch({type:'CLEAR_ADD_MEDICAL_LINKS'});
    dispatch({
      type: "SET_MEDICAL_TITLE",
      payload: '',
    });
    dispatch({
      type: "SET_MEDICAL_URL",
      payload: '',
    });
    dispatch({
      type: "SET_MEDICAL_DESCRIPTION",
      payload: '',
    });
    setResult([]);
    setSelected('');
   
  };

  useEffect(() => {
    //fetch all medical links from database
    //dispatch someting
    dispatch({ type: "FETCH_MEDICAL_LINKS" });
  }, []);

  

  let imgpath = "./images/vifidefault.jpeg";
  let noImagePath = "";

  return (
    <Box>
      <Typography variant="h5">Add New Medical Link</Typography>
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
                    value={addMedLinks.title}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_MEDICAL_TITLE",
                        payload: event.target.value,
                      })
                    }
                    sx={{justifyContent: 'start'}}
                  />
                </Grid>
                <Grid item xs={7} className="centerthis">
                  <TextField
                    label="Url"
                    variant="outlined"
                    fullWidth
                    value={addMedLinks.url}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_MEDICAL_URL",
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
                  label="Description"
                  fullWidth
                  multiline
                  maxRows={4}
                  value={addMedLinks.description}
                  onChange={(event) =>
                    dispatch({
                      type: "SET_MEDICAL_DESCRIPTION",
                      payload: event.target.value,
                    })
                  }
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid container>
          <Grid item xs={1.8}>
            <select
              className="dropdown"
              defaultValue={result[0]}
              onChange={(e) => {
                setSelected(e.target.value);
                dispatch({
                  type: "SET_MEDICAL_LOGO_URL",
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
          <Grid item xs={7.2}>
            <Button
            
              onClick={async () => {
                const url = new URL(addMedLinks.url);
                
                const result = await axios.get(
                  `https://favicongrabber.com/api/grab/${url.hostname}`
                );
                setResult(result.data.icons.map((icon) => icon.src));
                
              }}
            >
              get icons
            </Button>
          </Grid>
          <Grid item xs={1.5} textAlign={"end"}>
            <ToggleButton  onClick={handleChange} selected={checked}>
            <Tooltip title={checked ? "Close":"Preview"}>
                <PhoneAndroidIcon />
              </Tooltip>
            </ToggleButton>
          </Grid>
          <Grid item xs={1.5} textAlign={"end"}>
            <Button variant="contained" onClick={handleAddMedLink}>Add Medical Link</Button>
          </Grid>
        </Grid>
        <Grid item xs={11} my={1} sx={{display:'flex',justifyContent:'end'}} >
        {checked &&
        <Slide direction="up" in={checked} container={containerRef.current} >
          {<PreviewAddMedicalLinkCard addMedicalLink={addMedLinks} />}
        </Slide>}
        </Grid>
      </Grid>
      
      <Box sx={{mx:2,marginTop:10}}>
        <Typography variant="h3"> Medical Links </Typography>
      {/* render all medical links from database */}
      {medicallinks.map((medlink) =>
        medlink.id === resourceToEdit.id ? (
          <EditMedicalLinksAccordion key={medlink.id} medLinkToEdit={medlink} />
        ) : (
          <MedicalLinksAccordion key={medlink.id} medicallink={medlink} />
        )
      )}
      </Box>
    </Box>
  );
}

export default MedicalLinks;
