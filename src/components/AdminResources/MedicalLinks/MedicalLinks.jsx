import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function MedicalLinks() {
  const dispatch = useDispatch();
  const addMedLinks = useSelector((store) => store.addMedicalLinks);
  const medicallinks = useSelector((store) => store.medicallinks);
  const resourceToEdit = useSelector((store) => store.resourceToEdit);

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
    // console.log(updateResoursePayload);
  
    //update the database with edited info

    //:TODO eth all the stuff back from database maybe :TODO

  
    console.log('ran updateResource');
    //clear the resource to edit
    dispatch({ type: 'SET_RESOURCE_TO_EDIT', payload: {}});
   
}

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
        label="Logo Url"
        variant="outlined"
        multiline
        maxRows={4}
        value={addMedLinks.logo_url}
        onChange={(event) =>
          dispatch({
            type: "SET_MEDICAL_LOGO_URL",
            payload: event.target.value,
          })
        }
      />
      <Button onClick={handleClick}>Add Medical Link</Button>

      {/* render all medical links from database */}
      <div>
        <ul>
          {medicallinks.map((mdl) =>
            mdl.id === resourceToEdit.id ? (
              <form onSubmit={updateResource}
                    key={resourceToEdit.id}>
              <input
                value={resourceToEdit.name}
                onChange={(evt) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: { name: evt.target.value },
                  })
                }
              />
              <button onClick={()=>dispatch({type: 'SET_RESOURCE_TO_EDIT', payload: {}})}>Cancel</button>
              <button type="submit">Save</button>
              </form>
            ) : (
              <li key={mdl.id}>
                {mdl.name}
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
    </Box>
  );
}

export default MedicalLinks;
