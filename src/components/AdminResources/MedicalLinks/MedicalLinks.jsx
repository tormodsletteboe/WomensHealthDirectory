import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function MedicalLinks() {
  const dispatch = useDispatch();
  const editMedLinks = useSelector((store) => store.editMedicalLinks);

  const handleClick = () => {
    console.log("title", editMedLinks.title);
    console.log("url", editMedLinks.url);
    console.log("urllogo", editMedLinks.logo_url);
  };

  useEffect(() => {
    console.log("medical links useeffect ran");
    //fetch all medical links from database
    //dispatch someting
  }, []);

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
            payload: event.target.value,
          })
        }
      />
      <TextField
        label="Url"
        variant="outlined"
        multiline
        maxRows={4}
        value={editMedLinks.url}
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
        value={editMedLinks.logo_url}
        onChange={(event) =>
          dispatch({
            type: "SET_MEDICAL_LOGO_URL",
            payload: event.target.value,
          })
        }
      />
      <Button onClick={handleClick}>Click me</Button>

      {/* render all medical links from database */}
      <div></div>
    </Box>
  );
}

export default MedicalLinks;
