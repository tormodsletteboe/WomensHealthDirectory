import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Container from "@mui/material/Container";

import './UserMedicalLinks.css';
import MedicalLinkCard from "./MedicalLinkCard";



//test
function UserMedicalLinks() {
  const medicallinks = useSelector((store) => store.medicallinks);
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch({ type: "FETCH_MEDICAL_LINKS" });
  }, []);

  

  return (
    <Container maxWidth="sm">
      <div className="medicalLinksTitle">
        <h3>Medical Links</h3>
      </div>
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
