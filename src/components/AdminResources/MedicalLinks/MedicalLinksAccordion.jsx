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
import ToggleButton from "@mui/material/ToggleButton";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import PreviewMedicalLinkCard from "./PreviewMedicalLinkCard";
import Swal from "sweetalert2";

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
              <Avatar
                alt=""
                src={medicallink.logo_url}
                sx={{ bgcolor: "white" }}
              />
              {/* <img src={medicallink.logo_url} /> */}
            </Grid>
            <Grid item xs={4} my={1} textAlign={"start"}>
              <Typography textAlign={"start"}>{medicallink.name}</Typography>
            </Grid>
            <Grid item xs={6} my={1} textAlign={"end"}>
              <Typography textAlign={"start"} sx={{ color: "text.secondary" }}>
                {medicallink.link}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign={"start"} sx={{ width: "33%", flexShrink: 0 }}>
            {medicallink.description}
          </Typography>
          <Grid item textAlign={"end"}>
            <ToggleButton onClick={handleChange} selected={checked}>
              <Tooltip title={checked ? "Close" : "Preview"}>
                <PhoneAndroidIcon />
              </Tooltip>
            </ToggleButton>
            <Button
              onClick={() =>
                dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: medicallink })
              }
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch({
                      type: "DELETE_MEDICAL_LINK",
                      payload: medicallink.id,
                    });
                  }
                });
              }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid item mr={10} sx={{ display: "flex", justifyContent: "end" }}>
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
