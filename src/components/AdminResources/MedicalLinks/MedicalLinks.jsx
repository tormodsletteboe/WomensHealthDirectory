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
import Slide from "@mui/material/Slide";
import ToggleButton from "@mui/material/ToggleButton";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";

import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

import "./MedicalLinks.css";
import MedicalLinksAccordion from "./MedicalLinksAccordion";
import EditMedicalLinksAccordion from "./EditMedicalLinksAccordion";
import PreviewAddMedicalLinkCard from "./PreviewAddMedicalLinkCard";

function MedicalLinks() {
  const dispatch = useDispatch();

  //use selector for the "add medical links" view
  const addMedLinks = useSelector((store) => store.addMedicalLinks);

  //use selector for medical links thats in the database
  const medicallinks = useSelector((store) => store.medicallinks);

  //use selector for the "edit medical links" view
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

  //use state for icon urls returned by the icon api favicongrabber
  const [result, setResult] = useState([addMedLinks.logo_url]);

  //use state for the selected icon url
  const [selected, setSelected] = useState(addMedLinks.logo_url);

  //used to conditionally render imagelist of icons returned by the icon api favicongrabber
  const [open, setOpen] = React.useState(false);

  //used to conditionally render the preview card, ie the state of the togglebutton
  const [checked, setChecked] = React.useState(false);

  //used to render the preview card,
  const containerRef = React.useRef(null);

  //turn on and off the preview card
  const handleChange = () => {
    setChecked((prev) => !prev);
  };


  //add new medlink to the database
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

    //clear the inputs
    dispatch({ type: "CLEAR_ADD_MEDICAL_LINKS" });
    dispatch({
      type: "SET_MEDICAL_TITLE",
      payload: "",
    });
    dispatch({
      type: "SET_MEDICAL_URL",
      payload: "",
    });
    dispatch({
      type: "SET_MEDICAL_DESCRIPTION",
      payload: "",
    });
    setResult([]);
    setSelected("");
  };

  useEffect(() => {
    //fetch all medical links from database
    
    dispatch({ type: "FETCH_MEDICAL_LINKS" });
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //default vifi logo
  let imgpath = "./images/vifidefault.jpeg";
  //default no image path
  let noImagePath = "";

  //while waiting on the icon api to return the icon url, display a circular progress
  const [loading, setLoading] = React.useState(false);

  //intended to be used with the su
  const [success, setSuccess] = React.useState(false);

  //used to fake a loading state while waiting on the icon api to return the icon url
  const timer = React.useRef();



  return (
    <Box>
      <Typography variant="h5">Add New Medical Link</Typography>
      <Grid container>
        {/* add new medical link part of the ui */}
        <Grid item xs={12} my={1}>
          <Accordion expanded>
            <AccordionSummary>
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
                    value={addMedLinks.title}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_MEDICAL_TITLE",
                        payload: event.target.value,
                      })
                    }
                    sx={{ justifyContent: "start" }}
                  />
                </Grid>
                {/* url */}
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
              {/* description */}
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
        <Grid
          container
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "white",
          }}
        >
          {/* 6 columns for the GET ICONS part */}
          <Grid item xs={6}>
            <Grid
              container
              justifyContent={"flex-start"}
            >
              {/* GET ICON button */}
              <Grid
                item
                xs={"auto"}
                style={{
                  borderStyle: "solid",
                  borderWidth: "0px",
                  borderColor: "white",
                }}
                textAlign={"start"}
              >
                <Box sx={{ m: 0, position: "relative", p:0 }}>
                  <Button
                    onClick={() => {
                      if (!loading) {
                        setSuccess(false);
                        setLoading(true);
                        timer.current = window.setTimeout(async() => {
                          const url = new URL(addMedLinks.url);
                          const result = await axios.get(
                        `https://favicongrabber.com/api/grab/${url.hostname}`
                      );
                         
                          setResult(result.data.icons.map((icon) => icon.src));
                          setOpen(true);
                          setSuccess(true);
                          setLoading(false);
                        }, 1000);
                      }
                      
                    }}
                    variant="contained"
                    disabled={loading}
                    // sx={buttonSx}
                  >
                    get icons
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                  {/* this is where I am at lunch sunday, add avatars to the virtual health aswell, then make the icon viewer for all components */}
                </Box>
              </Grid>
              {/* Image list of icons, displayed after clicking GET ICONS */}
              <Grid
                item
                xs={"auto"}
                my={1}
                sx={{ display: "flex", justifyContent: "start" }}
              >
                {open && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: 400,
                        height: 200,
                      },
                    }}
                  >
                    <Paper elevation={2}>
                      <ImageList sx={{ width: 400, height: 200 }} cols={7}>
                        <ImageListItem key={noImagePath}>
                          <ListItemButton
                            onMouseOver={() => {
                              setSelected(noImagePath);
                              dispatch({
                                type: "SET_MEDICAL_LOGO_URL",
                                payload: noImagePath,
                              });
                            }}
                            onClick={() => setOpen(false)}
                          >
                            <Avatar
                              alt=""
                              src={noImagePath}
                              sx={{ bgcolor: "white" }}
                            />
                          </ListItemButton>
                        </ImageListItem>
                        <ImageListItem key={imgpath}>
                          <ListItemButton
                            onMouseOver={() => {
                              setSelected(imgpath);
                              dispatch({
                                type: "SET_MEDICAL_LOGO_URL",
                                payload: imgpath,
                              });
                            }}
                            onClick={() => setOpen(false)}
                          >
                            <Avatar
                              alt=""
                              src={imgpath}
                              sx={{ bgcolor: "white" }}
                            />
                          </ListItemButton>
                        </ImageListItem>
                        {result.map((icon) => (
                          <ImageListItem key={icon}>
                            <ListItemButton
                              onMouseOver={() => {
                                setSelected(icon);
                                dispatch({
                                  type: "SET_MEDICAL_LOGO_URL",
                                  payload: icon,
                                });
                              }}
                              onClick={() => setOpen(false)}
                            >
                              <Avatar
                                alt=""
                                src={icon}
                                sx={{ bgcolor: "white" }}
                              />
                            </ListItemButton>
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Paper>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* 6 columns for the ADD MEDICAL LINK and preview button */}
          <Grid item xs={6}>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"flex-end"}
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "white",
              }}
              textAlign="end"
            >
              <Grid
                item
                xs={"auto"}
                textAlign={"end"}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
              >
                <ToggleButton onClick={handleChange} selected={checked}>
                  <Tooltip title={checked ? "Close" : "Preview"}>
                    <PhoneAndroidIcon />
                  </Tooltip>
                </ToggleButton>
              </Grid>
              <Grid
                item
                xs={"auto"}
                textAlign={"end"}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
                ml={1}
              >
                <Button variant="contained" onClick={handleAddMedLink}>
                  Add Medical Link
                </Button>
              </Grid>
              <Grid
                item
                xs={11}
                my={1}
                sx={{ display: "flex", justifyContent: "end" }}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
              >
                {checked && (
                  <Slide
                    direction="up"
                    in={checked}
                    container={containerRef.current}
                  >
                    {<PreviewAddMedicalLinkCard addMedicalLink={addMedLinks} />}
                  </Slide>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

{/* render all medical links from database */}
      <Box sx={{ mx: 2, marginTop: 10 }}>
        <Typography variant="h3"> Medical Links </Typography>
        
        {medicallinks.map((medlink) =>
        // if medlink is in edit mode render the edit component, otherwise render the normal component
          medlink.id === resourceToEdit.id ? (
            <EditMedicalLinksAccordion
              key={medlink.id}
              medLinkToEdit={medlink}
            />
          ) : (
            <MedicalLinksAccordion key={medlink.id} medicallink={medlink} />
          )
        )}
      </Box>
    </Box>
  );
}

export default MedicalLinks;
