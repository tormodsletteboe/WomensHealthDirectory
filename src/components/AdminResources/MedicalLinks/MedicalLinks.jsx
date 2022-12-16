import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: 200,
  minWidth: 600,
}));

function MedicalLinks() {
  const dispatch = useDispatch();
  const addMedLinks = useSelector((store) => store.addMedicalLinks);
  const medicallinks = useSelector((store) => store.medicallinks);
  const resourceToEdit = useSelector((store) => store.resourceToEdit);
  const [result, setResult] = useState([]);
  const [selected, setSelected] = useState("");
  const handleClick = () => {
    console.log("title", addMedLinks.title);
    console.log("url", addMedLinks.url);
    console.log("urllogo", addMedLinks.logo_url);
    for (let mdl of medicallinks) {
      console.log(mdl.name);
    }
  };

  useEffect(() => {
    console.log("medical links useeffect ran");
    //fetch all medical links from database
    //dispatch someting

    dispatch({ type: "FETCH_MEDICAL_LINKS" });
  }, []);

  function updateResource(evt) {
    evt.preventDefault();
    // const updateResoursePayload = {...resourceToEdit, categoryId: params.categoryId}
    console.log("resource to edit", resourceToEdit);

    //update the database with edited info
    dispatch({
      type: "UPDATE_MEDICAL_LINK",
      payload: {
        id: resourceToEdit.id,
        name: resourceToEdit.name,
        link: resourceToEdit.link,
        logo_url: resourceToEdit.logo_url,
      },
    });

    //:TODO eth all the stuff back from database maybe :TODO

    console.log("ran updateResource");
    //clear the resource to edit

    dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} });
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let imgpath = "./images/vifidefault.jpeg";
  let siteUrl = "vg.no";
  return (
    <Box>
      <Grid container>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ my: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container nowrap>
              <Grid item xs={2}>
                <img src={selected} />
              </Grid>
              <Grid item xs={4} my={1}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Title
                </Typography>
                <TextField
                  label="Title"
                  variant="outlined"
                  multiline
                  maxRows={4}
                  value={addMedLinks.title}
                  onChange={(event) =>
                    dispatch({
                      type: "SET_MEDICAL_TITLE",
                      payload: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6} my={1}>
                <Typography sx={{ color: "text.secondary" }}>Link</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Description</Typography>
            <Button>Click Me</Button>
          </AccordionDetails>
        </Accordion>

        <TextField
          label="Url"
          variant="outlined"
          multiline
          maxRows={4}
          value={addMedLinks.url}
          onChange={(event) =>
            dispatch({
              type: "SET_MEDICAL_URL",
              payload: event.target.value,
            })
          }
        />
        <TextField
          variant="outlined"
          multiline
          maxRows={4}
          value={addMedLinks.logo_url}
          disabled
          // onChange={(event) =>
          //   dispatch({
          //     type: "SET_MEDICAL_LOGO_URL",
          //     payload: event.target.value,
          //   })
          // }
        />

        <img src={selected} />

        <Button onClick={handleClick}>Add Medical Link</Button>
        <Button
          onClick={async () => {
            const url = new URL(addMedLinks.url);
            console.log(url.hostname);
            const result = await axios.get(
              `https://favicongrabber.com/api/grab/${url.hostname}`
            );
            setResult(result.data.icons.map((icon) => icon.src));
            console.log(result.data.icons.map((icon) => icon.src));
          }}
        >
          get icnos
        </Button>
      </Grid>
      {/* render all medical links from database */}
      <div>
        <ul>
          {medicallinks.map((mdl) =>
            mdl.id === resourceToEdit.id ? (
              <form onSubmit={updateResource} key={resourceToEdit.id}>
                <input
                  value={resourceToEdit.name}
                  onChange={(evt) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { name: evt.target.value },
                    })
                  }
                />
                <input
                  value={resourceToEdit.link}
                  onChange={(evt) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { link: evt.target.value },
                    })
                  }
                />
                <input
                  value={resourceToEdit.logo_url}
                  onChange={(evt) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      payload: { logo_url: evt.target.value },
                    })
                  }
                />
                <button
                  onClick={() =>
                    dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} })
                  }
                >
                  Cancel
                </button>
                <button type="submit">Save</button>
              </form>
            ) : (
              <li key={mdl.id}>
                {mdl.name} {mdl.link} {mdl.logo_url}
                <button
                  onClick={() =>
                    dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: mdl })
                  }
                >
                  Edit
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        <select
          onChange={(e) => {
            setSelected(e.target.value);
            dispatch({
              type: "SET_MEDICAL_LOGO_URL",
              payload: e.target.value,
            });
          }}
        >
          <option disabled>Choose One</option>
          <option>{imgpath}</option>
          {result.map((icon) => (
            <option value={icon}>{icon}</option>
          ))}
        </select>
      </div>
      {/* this is where I am */}
      {/* https://mui.com/material-ui/react-grid/ */}
      {/* white space no wrap example */}

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ my: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container nowrap>
            <Grid item xs={2}>
              <img src={selected} />
            </Grid>
            <Grid item xs={4} my={1}>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                General settings
              </Typography>
            </Grid>
            <Grid item xs={6} my={1}>
              <Typography sx={{ color: "text.secondary" }}>
                I am an accordion
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
          <Button>Click Me</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default MedicalLinks;
