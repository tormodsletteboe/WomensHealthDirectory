import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Slide from "@mui/material/Slide";
import ToggleButton from "@mui/material/ToggleButton";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import PreviewVirtualHealthCard from "./PreviewVirtualHealthCard";

// VirtualHealthAccordion component
function VirtualHealthAccordion({ virtualhealthlink }) {
  //state for the preview toggle button
  const [checked, setChecked] = React.useState(false);

  //ref for the preview card
  const containerRef = React.useRef(null);

  //function to toggle the preview card
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const dispatch = useDispatch();
  return (
    <>
      <Accordion sx={{ my: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            {/* icon */}
            <Grid item xs={2}>
              <Avatar
                alt=""
                src={virtualhealthlink.logo_url}
                sx={{ bgcolor: "white" }}
              />
            </Grid>
            {/* title */}
            <Grid item xs={2} my={1} textAlign={"start"}>
              <Typography
                textAlign={"start"}
                sx={{ color: "text.primary", fontWeight: "bold" }}
              >
                {virtualhealthlink.name}
              </Typography>
            </Grid>
            {/* specialty */}
            <Grid item xs={2} my={1} textAlign={"start"}>
              <Typography textAlign={"start"} sx={{ color: "text.secondary" }}>
                {virtualhealthlink.specialty}
              </Typography>
            </Grid>
            {/* url */}
            <Grid item xs={6} my={1} textAlign={"start"}>
              <Typography textAlign={"start"} sx={{ color: "text.secondary" }}>
                {virtualhealthlink.link}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {/* cost/coverage info */}
            <Grid item xs={4} my={1} textAlign={"start"}>
              {virtualhealthlink.info_cost && (
                <Grid container direction={"column"}>
                  <Typography mb={1} textAlign="start">
                    {
                      <span style={{ fontWeight: "bold" }}>
                        {"COST/COVERAGE:"}
                      </span>
                    }
                  </Typography>
                  <Typography textAlign="start">
                    {virtualhealthlink.info_cost}
                  </Typography>
                </Grid>
              )}
            </Grid>
            {/* description */}
            <Grid item xs={6} my={1} textAlign={"start"} ml={2}>
              {virtualhealthlink.description && (
                <Grid container direction={"column"}>
                  <Typography mb={1} textAlign="start">
                    {
                      <span style={{ fontWeight: "bold" }}>
                        {"DESCRIPTION:"}
                      </span>
                    }
                  </Typography>
                  <Typography
                    textAlign={"start"}
                    sx={{ width: "50%", flexShrink: 0 }}
                  >
                    {virtualhealthlink.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          {/* preview toggle button */}
          <Grid item textAlign={"end"}>
            <ToggleButton onClick={handleChange} selected={checked}>
              <Tooltip title={checked ? "Close" : "Preview"}>
                <PhoneAndroidIcon />
              </Tooltip>
            </ToggleButton>
            {/* edit button */}
            <Button
              onClick={() =>
                dispatch({
                  type: "SET_RESOURCE_TO_EDIT",
                  payload: virtualhealthlink,
                })
              }
            >
              Edit
            </Button>
            {/* delete button */}
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
                      type: "DELETE_VIRTUALHEALTH_LINK",
                      payload: virtualhealthlink.id,
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
      {/* preview card */}
      <Grid item mr={10} sx={{ display: "flex", justifyContent: "end" }}>
        {checked && (
          <Slide direction="up" in={checked} container={containerRef.current}>
            {<PreviewVirtualHealthCard virthealthlink={virtualhealthlink} />}
          </Slide>
        )}
      </Grid>
    </>
  );
}

export default VirtualHealthAccordion;
