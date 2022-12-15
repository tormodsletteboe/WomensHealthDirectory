import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 200,
  width:700
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

  let imgpath = "./images/vifidefault.jpeg";
  let siteUrl = "vg.no";
  return (
    <Box>
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Item>
              xs=4
              <img src={selected}/>
            </Item>
          </Grid>
          <Grid item >
            <Item>xs=4</Item>
          </Grid>
          <Grid item >
            <Item>xs</Item>
          </Grid>
          <Grid item>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MedicalLinks;
