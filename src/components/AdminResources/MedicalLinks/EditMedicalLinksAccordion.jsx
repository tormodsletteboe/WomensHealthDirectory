import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ToggleButton from "@mui/material/ToggleButton";
import Avatar from "@mui/material/Avatar";
import PreviewMedicalLinkCard from "./PreviewMedicalLinkCard";

function EditMedicalLinksAccordion() {
  
  //state for the preview toggle button
  const [checked, setChecked] = React.useState(true);

  //ref for the preview card
  const containerRef = React.useRef(null);

  //function to handle the toggle button
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const dispatch = useDispatch();

  //reducer for the resource to edit
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

  //state for which icon is selected
  const [selected, setSelected] = useState(resourceToEdit.logo_url);

  //array of all icons urls returned from the icon api favicongrabber
  const [result, setResult] = useState([resourceToEdit.logo_url]);

  //default image path
  let imgpath = "./images/vifidefault.jpeg";

  let noImagePath = "";


//update the database with edited info
  function updateResource(evt) {
   
    //update the database with edited info
    dispatch({
      type: "UPDATE_MEDICAL_LINK",
      payload: {
        id: resourceToEdit.id,
        name: resourceToEdit.name,
        link: resourceToEdit.link,
        logo_url: selected,
        description: resourceToEdit.description,
      },
    });
    //clear the resource to edit
    dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} });
  }
  return (
    <Grid container>
      {/* main edit form */}
      <Grid item xs={12} my={1}>
        <Accordion expanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container columnSpacing={1}>
              {/* icon */}
              <Grid item xs={1} className="centerthis">
              <Avatar alt="" src={selected} sx={{ bgcolor: "white" }} />
              </Grid>
              {/* title */}
              <Grid item xs={4} px={1} className="centerthis">
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={resourceToEdit.name}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { name: e.target.value },
                    })
                  }
                />
              </Grid>
              {/* url */}
              <Grid item xs={7} className="centerthis">
                <TextField
                  label="Url"
                  variant="outlined"
                  fullWidth
                  value={resourceToEdit.link}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { link: e.target.value },
                    })
                  }
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            {/* description */}
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                value={resourceToEdit.description}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: { description: e.target.value },
                  })
                }
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* GET ICON and Preview button, cancel and update buttons */}
      <Grid container>
        {/* dropdown select icon url */}
        <Grid item xs={1.8} textAlign="start">
          <select
            onChange={(e) => {
              setSelected(e.target.value);
              dispatch({
                type: "UPDATE_FIELD",
                payload: { logo_url: e.target.value },
              });
            }}
            style={{marginLeft:0}}
          >
            <option disabled>Choose One</option>
            <option>{noImagePath}</option>
            <option>{imgpath}</option>
            {result.map((icon) =>
              icon == resourceToEdit.logo_url ? (
                <option selected value={icon}>
                  {icon}
                </option>
              ) : (
                <option value={icon}>{icon}</option>
              )
            )}
          </select>
        </Grid>
        {/* get icon button */}
        <Grid item xs={7.2}>
          <Button
            onClick={async () => {
              const url = new URL(resourceToEdit.link);
              
              const result = await axios.get(
                `https://favicongrabber.com/api/grab/${url.hostname}`
              );
              setResult(result.data.icons.map((icon) => icon.src));
              
            }}
          >
            get icons
          </Button>
        </Grid>
        {/* preview toggle button */}
        <Grid item xs={1} textAlign={"end"}>
          <ToggleButton onClick={handleChange} selected={checked}>
            <Tooltip title={checked ? "Close":"Preview"} placement="top">
              <PhoneAndroidIcon />
            </Tooltip>
          </ToggleButton>
        </Grid>

        {/* cancel button */}
        <Grid item xs={0.8} textAlign="end">
          <Button
            onClick={() =>
              dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} })
            }
          >
            Cancel
          </Button>
        </Grid>

        {/* update button */}
        <Grid item xs={1.2} textAlign={"end"}>
          <Button variant="contained" onClick={updateResource}>Update Link</Button>
        </Grid>
        {/* preview card */}
        <Grid
          item
          xs={10}
          my={1}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          {checked && (
            <Slide direction="up" in={checked} container={containerRef.current}>
              {<PreviewMedicalLinkCard medicallink={resourceToEdit} />}
            </Slide>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditMedicalLinksAccordion;
