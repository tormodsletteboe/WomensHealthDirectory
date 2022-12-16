import { useState } from "react";
import { useSelector } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./AdminResources.css";
import MedicalLinks from "./MedicalLinks/MedicalLinks";
import VirtualHealth from "./VirtualHealth/VirtualHealth";

function AdminResources() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab className="links" label="Medical Links"  />
        <Tab className="links" label="Virtual Health" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {value == 0 && <MedicalLinks/>}
        {value == 1 && <VirtualHealth/>}
      </Box>
    </Box>
  );
}


export default AdminResources;
