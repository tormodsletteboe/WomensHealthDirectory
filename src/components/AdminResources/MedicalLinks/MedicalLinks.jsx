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
  const addMedLinks = useSelector((store) => store.addMedicalLinks);
  const medicallinks = useSelector((store) => store.medicallinks);
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

  const [result, setResult] = useState([addMedLinks.logo_url]);
  const [selected, setSelected] = useState(addMedLinks.logo_url);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
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
    //dispatch someting
    dispatch({ type: "FETCH_MEDICAL_LINKS" });
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  let imgpath = "./images/vifidefault.jpeg";
  let noImagePath = "";

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box>
      <Typography variant="h5">Add New Medical Link</Typography>
      <Grid container>
        <Grid item xs={12} my={1}>
          <Accordion expanded>
            <AccordionSummary>
              <Grid container columnSpacing={1}>
                <Grid item xs={1} className="centerthis">
                  <Avatar alt="" src={selected} sx={{ bgcolor: "white" }} />
                  {/* <img src={selected} /> */}
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
                    sx={{ justifyContent: "start" }}
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
        <Grid
          container
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "white",
          }}
        >
          {/* this is where I am, sunday morning make a imagelist of avatars, also maybe look at image size from the api for get icons */}
          <Grid item xs={6}>
            {/* select used to be here */}
            <Grid
              container
              justifyContent={"flex-start"}
            >
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
                         console.log(result.data);
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

      <Box sx={{ mx: 2, marginTop: 10 }}>
        <Typography variant="h3"> Medical Links </Typography>
        {/* render all medical links from database */}
        {medicallinks.map((medlink) =>
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
