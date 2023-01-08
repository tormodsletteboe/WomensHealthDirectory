import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import {useState} from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';


function Nav() {

  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  //Toggle between showing and hiding the navigation menu links when 
  //the user clicks on the hamburger menu / bar icon
  const handleClick = () => {
    let nav = document.getElementById("myLinks");
    // setOpen(!open);
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } 
    else {
      nav.style.display = "block";
    }
  };

  //close navigation bar if user clicks outside of the navigation bar
  const handleClickAway = () => {
    let nav = document.getElementById("myLinks");
    nav.style.display = "none";
    setOpen(false);
  };

  const handleJoin = () => {
    console.log("in handleJoin");
    history.push("/membership");
  };

  return (
    <>
    <ClickAwayListener onClickAway={handleClickAway}>
    <div className="topnav">
      <Link className="navTitle" to="/home">
        <h3>The Vifi</h3>
      </Link>
      {/* Navigation links (hidden by default) */}
      <div id="myLinks">
        <Link className="navLink" to="/home">
          Home
        </Link>

        <Link className="navLink" to="/about">
          About
        </Link>

        <Link className="navLink" to="/preventativecare">
          Preventative Care
        </Link>

        <Link className="navLink" to="/resources">
          Resources
        </Link>

        {!user.id && (
          // If user is not logged in, show membership link on nav bar
        <Link className="navLink" to="/membership">
          Membership
        </Link>
        )}

        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
      </div>

      {/* "Hamburger menu" / "Bar icon" to toggle the navigation links */}
      <div className="icon">
        <ReorderIcon
          size="small"
          sx={{ fontSize: "2rem" }}
          style={{ color: "#171717" }}
          onClick={handleClick}
        ></ReorderIcon>
      </div>
      <div className="join">


      {!user.id && (
          // If there's no user, show join button
          <Button
          variant="contained"
          style={{ backgroundColor: "#8EBBA7"}}
          onClick={handleJoin}
        >
          Join
        </Button>
       )}

       {/* If a user is logged in, show the logout button */}
       {user.id && (
          <>
            <LogOutButton className="logout" />
          </>
        )}

      </div>
    </div>
    </ClickAwayListener>
    </>
  );
}


export default Nav;
