import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Container from "@mui/material/Container";

import "./UserVirtualHealth.css";
import VirtualHealthCard from "./VirtualHealthCard";



// UserVirtualHealth component, displays all virtual health links for a user in cards
function UserVirtualHealth() {

  //all virtual health links form database
  const virtualhealthlinks = useSelector((store) => store.virtualhealth_links);
  const dispatch = useDispatch();

  

  useEffect(() => {
    //get all virtual health links from database
    dispatch({ type: "FETCH_VIRTUALHEALTH_LINKS" });
  }, []);

  

  return (
    <Container maxWidth="sm">
      <div className="virtualHealthTitle">
        <h3>Virtual Health</h3>
      </div>
      {/* list of all virtual health links in mui.com cards */}
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
