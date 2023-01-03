import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function MedicalLinksAccordion({ medicallink }) {
  //   const store = useSelector((store) => store);
  const dispatch = useDispatch();
  return (
    <Accordion sx={{ my: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={2}>
            <img src={medicallink.logo_url} />
          </Grid>
          <Grid item xs={4} my={1} textAlign={"start"}>
            <Typography>{medicallink.name}</Typography>
          </Grid>
          <Grid item xs={6} my={1} textAlign={"end"}>
            <Typography sx={{ color: "text.secondary" }}>
              {medicallink.link}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {medicallink.description}
        </Typography>
        <Grid item textAlign={'end'}>
        <Button
          onClick={() =>
            dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: medicallink })
          }
        >
          Edit
        </Button>
        <Button onClick={()=>dispatch({type:'DELETE_MEDICAL_LINK', payload:medicallink.id})}>Delete</Button>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default MedicalLinksAccordion;
