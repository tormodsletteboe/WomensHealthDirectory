import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./UserVirtualHealth.css";



//test
function UserVirtualHealth() {
  const virtualhealthlinks = useSelector((store) => store.virtualhealth_links);
  const dispatch = useDispatch();

useEffect(()=>{
    dispatch({type: "FETCH_VIRTUALHEALTH_LINKS"});
},[]);



  return (
    <>
      <div className="virtualHealthTitle">
        <h3>Virtual Health</h3>
      </div>
      <ul>
        {virtualhealthlinks.map((virthealthlink) => (
          <li>
           <h2>hello</h2>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserVirtualHealth;
