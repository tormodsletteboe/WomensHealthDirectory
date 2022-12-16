import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
function EditMedicalLinksAccordion() {
  //   const store = useSelector((store) => store);

 
 
  const dispatch = useDispatch();
  const resourceToEdit = useSelector((store) => store.resourceToEdit);
  const [selected, setSelected] = useState(resourceToEdit.logo_url);
  const [result, setResult] = useState([resourceToEdit.logo_url]);
  let imgpath = "./images/vifidefault.jpeg";
  let noImagePath = "";

//console.log("resource to edit", medLinkToEdit);

  function updateResource(evt) {
    
    
    console.log("resource to edit", resourceToEdit);

    //update the database with edited info
    dispatch({
      type: "UPDATE_MEDICAL_LINK",
      payload: {
        id: resourceToEdit.id,
        name: resourceToEdit.name,
        link: resourceToEdit.link,
        logo_url: selected,
        description: resourceToEdit.description
      },
    });
    dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} });
  }
  return (
    <Grid container>
      <Grid item xs={12} my={1}>
        <Accordion
        expanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container columnSpacing={1}>
              <Grid item xs={1} className="fuckingcenterwillyou">
                <img src={selected} />
              </Grid>
              <Grid item xs={4} px={1} className="fuckingcenterwillyou">
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
              <Grid item xs={7} className="fuckingcenterwillyou">
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
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                label="description"
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
      <Grid container>
        <Grid item>
          <select
            onChange={(e) => {
              setSelected(e.target.value);
              dispatch({
                type: "UPDATE_FIELD",
                payload: { logo_url: e.target.value },
              });
            }}
          >
            <option disabled>Choose One</option>
            <option>{noImagePath}</option>
            <option>{imgpath}</option>
            {result.map((icon) => (
               icon == resourceToEdit.logo_url ?
               <option selected value={icon}>{icon}</option>
               :
               <option value={icon}>{icon}</option>
            ))}
          </select>
        </Grid>
        <Grid item xs={5}>
          <Button
            onClick={async () => {
              const url = new URL(resourceToEdit.link);
              console.log(url.hostname);
              const result = await axios.get(
                `https://favicongrabber.com/api/grab/${url.hostname}`
              );
              setResult(result.data.icons.map((icon) => icon.src));
              console.log(result.data.icons.map((icon) => icon.src));
            }}
          >
            get icons
          </Button>
        </Grid>
        <Grid item xs={4} textAlign={"end"}>
          <Button onClick={updateResource}>Update Medical Link</Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() =>
              dispatch({ type: "SET_RESOURCE_TO_EDIT", payload: {} })
            }
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditMedicalLinksAccordion;
