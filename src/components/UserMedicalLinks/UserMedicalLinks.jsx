import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Container from "@mui/material/Container";

import './UserMedicalLinks.css';
import MedicalLinkCard from "./MedicalLinkCard";



// UserMedicalLinks component, displays all medical links for a user in cards
function UserMedicalLinks() {

  //all medical links form database
  const medicallinks = useSelector((store) => store.medicallinks);
  const dispatch = useDispatch();

  

  useEffect(() => {
    //get all medical links from database
    dispatch({ type: "FETCH_MEDICAL_LINKS" });
  }, []);

  

  return (
    <Container maxWidth="sm">
      <div className="medicalLinksTitle">
        <h3>Medical Links</h3>
      </div>
      {/* list of all medical links in mui.com cards */}
      <ul style={{padding:0}} >
        {medicallinks.map((medlink) => (
          <li key={medlink.id}>
            <MedicalLinkCard medicallink={medlink} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default UserMedicalLinks;
