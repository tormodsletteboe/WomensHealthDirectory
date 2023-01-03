import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import "./UserVirtualHealth.css";
import VirtualHealthCard from "./VirtualHealthCard";



//test
function UserVirtualHealth() {
  const virtualhealthlinks = useSelector((store) => store.virtualhealth_links);
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  }, []);

  

  return (
    <Container maxWidth="sm">
      <div className="virtualHealthTitle">
        <h3>Virtual Health</h3>
      </div>
      <ul style={{padding:0}} >
        {virtualhealthlinks.map((virthealthlink) => (
          <li key={virthealthlink.id}>
            <VirtualHealthCard virthealthlink={virthealthlink} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default UserVirtualHealth;
