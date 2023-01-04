import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import PreviewMedicalLinkCard from "./PreviewMedicalLinkCard";
function MedicalLinksAccordion({ medicallink }) {
  //   const store = useSelector((store) => store);
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const dispatch = useDispatch();
  return (
    <>
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
          <Grid item textAlign={"end"}>
            <Button ref={containerRef} onClick={handleChange}>
              Preview
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: medicallink })
              }
            >
              Edit
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "DELETE_MEDICAL_LINK",
                  payload: medicallink.id,
                })
              }
            >
              Delete
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      <Grid item  mr={10} sx={{display:'flex',justifyContent:'end'}} >
          {checked && (
            <Slide direction="up" in={checked} container={containerRef.current}>
              {<PreviewMedicalLinkCard medicallink={medicallink} />}
            </Slide>
          )}
        </Grid>
      
    </>
  );
}

export default MedicalLinksAccordion;
