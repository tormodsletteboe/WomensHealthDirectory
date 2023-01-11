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
import { Typography } from "@mui/material";

import Slide from "@mui/material/Slide";
import ToggleButton from "@mui/material/ToggleButton";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import ListItemButton from "@mui/material/ListItemButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";

import "./VirtualHealth.css";
import VirtualHealthAccordion from "./VirtualHealthAccordion";
import EditVirtualHealthLinksAccordion from "./EditVirtualHealthAccordion";
import PreviewAddVirtualHealthCard from "./PreviewAddVirtualHealthCard";

function VirtualHealth() {
  const dispatch = useDispatch();

  //reducer for the add virtual health link, as the user is typing into the input fields the values are stored in this reducer
  const addVirtualHealthLinks = useSelector(
    (store) => store.addVirtualHealthLinks
  );

  //reducer for the virtual health links from the database
  const virtualhealthlinks = useSelector((store) => store.virtualhealth_links);

  //reducer for the resource to edit, this is used to populate the edit accordion
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

  //state for the icon result from the icon api favicongrabber
  const [result, setResult] = useState([addVirtualHealthLinks.logo_url]);
  
  //selected icon state
  const [selected, setSelected] = useState(addVirtualHealthLinks.logo_url);

  //used to fake a loading state when clicking the GET ICON button
  const [loading, setLoading] = React.useState(false);

  //intended to be used with the get icon button on success api return call
  const [success, setSuccess] = React.useState(false);

  //used to fake a loading state when clicking the GET ICON in the add virtual health accordion
  const timer = React.useRef();

  //used to conditionally render the imagelist of returned icons from the api favicongrabber
  const [open, setOpen] = React.useState(false);

  //state of the preview toggle button
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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

    dispatch({ type: "CLEAR_ADD_VIRTUALHEALTH_LINKS" });
    //TODO: clear the add virtual health link reducer
    dispatch({
      type: "SET_VIRTUALHEALTH_TITLE",
      payload: "",
    });
    dispatch({
      type: "SET_VIRTUALHEALTH_LINK",
      payload: "",
    });
    dispatch({
      type: "SET_VIRTUALHEALTH_LOGO_URL",
      payload: "",
    });
    dispatch({
      type: "SET_VIRTUALHEALTH_DESCRIPTION",
      payload: "",
    });
    dispatch({
      type: "SET_VIRTUALHEALTH_SPECIALTY",
      payload: "",
    });
    dispatch({
      type: "SET_VIRTUALHEALTH_INFO_COST",
      payload: "",
    });
    setResult([]);
    setSelected("");
   
  };

  useEffect(() => {
    //fetch all virtual health links from database
    //dispatch someting
    dispatch({ type: "FETCH_VIRTUALHEALTH_LINKS" });
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  let imgpath = "./images/vifidefault.jpeg";
  let noImagePath = "";

  return (
    <Box>
      <Typography variant="h5">Add New Virtual Health</Typography>
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
                    label="Url"
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
                <Grid item xs={4} px={1} pt={2} className="centerthis">
                  <TextField
                    label="Specialty"
                    variant="outlined"
                    fullWidth
                    value={addVirtualHealthLinks.specialty}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_VIRTUALHEALTH_SPECIALTY",
                        payload: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={8} px={1} pt={2} className="centerthis">
                  <TextField
                    label="Cost/Coverage"
                    variant="outlined"
                    fullWidth
                    value={addVirtualHealthLinks.info_cost}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_VIRTUALHEALTH_INFO_COST",
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

        {/* //icons button and add, stuff directly below add accordion */}
        <Grid
          container
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "white",
          }}
        >
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
                          const url = new URL(addVirtualHealthLinks.link);
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
                                type: "SET_VIRTUALHEALTH_LOGO_URL",
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
                                type: "SET_VIRTUALHEALTH_LOGO_URL",
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
                                  type: "SET_VIRTUALHEALTH_LOGO_URL",
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
                <Button variant="contained" onClick={handleAddVirtualHealth}>
                  Add Virtual Health
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
                    {<PreviewAddVirtualHealthCard addVirtualHealthLink={addVirtualHealthLinks} />}
                  </Slide>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
      <Box sx={{ mx: 2, marginTop: 10 }}>
        <Typography variant="h3"> Virtual Health </Typography>
        {/* render all virtual health links from database */}
        {virtualhealthlinks.map((virtualhealthlink) =>
          virtualhealthlink.id === resourceToEdit.id ? (
            <EditVirtualHealthLinksAccordion
              key={virtualhealthlink.id}
              medLinkToEdit={virtualhealthlink}
            />
          ) : (
            <VirtualHealthAccordion
              key={virtualhealthlink.id}
              virtualhealthlink={virtualhealthlink}
            />
          )
        )}
      </Box>
    </Box>
  );
}

export default VirtualHealth;
