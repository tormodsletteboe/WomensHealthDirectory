import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MedicalLinks() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  //const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Medical Links");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [urlLogo, setUrlLogo] = useState("");

  const dispatch = useDispatch();
  const editMedLinks = useSelector(store=>store.editMedicalLinks);
  const handleClick = () => {
    console.log("title", title);
    console.log("url", url);
    console.log("urllogo", urlLogo);
  };
  return (
    <Box>
      
        <TextField
          label="Title"
          variant="outlined"
          multiline
          maxRows={4}
          value={editMedLinks.title}
          onChange={(event) =>
            dispatch({
              type: "SET_MEDICAL_TITLE",
              payload: event.target.value
            })
          }
        />
        <TextField
          label="Url"
          variant="outlined"
          multiline
          maxRows={4}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <TextField
          label="Logo Url"
          variant="outlined"
          multiline
          maxRows={4}
          value={urlLogo}
          onChange={(event) => setUrlLogo(event.target.value)}
        />
        <Button onClick={handleClick}>Click me</Button>
      
      <div></div>
    </Box>
  );
}

export default MedicalLinks;
