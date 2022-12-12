import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import ReorderIcon from '@mui/icons-material/Reorder';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import {useEffect, useState, useRef} from 'react';


function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = e => {
     // If the menu is open and the clicked target is not within the menu,
      // then close the menu
  if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
    setIsMenuOpen(false)
  }
}

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
    }, [isMenuOpen])
  
   //Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
    const onClickHandler = () => {
      let x = document.getElementById("myLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }

  const handleJoin = () => {
    console.log('in handleJoin');
    history.push('/membership');
  }

  return (
    <div className="topnav">
      <Link className="navTitle" to="/home">
        <h4>Women's Health Directory</h4>
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

        <Link className="navLink" to="/membership">
          Membership
        </Link>



        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <LogOutButton className="logout" />
          </>
        )}

      </div>
      {/* "Hamburger menu" / "Bar icon" to toggle the navigation links */}
      <div className="icon">
        <ReorderIcon size="small" sx={({ fontSize: "2rem"})} style={{color: "white"}} onClick={onClickHandler}></ReorderIcon>
      </div>
      <div className="join">
      <Button variant="contained" style={{backgroundColor:"#8EBBA7", color: 'white'}} onClick={handleJoin}>Join</Button>
      </div>
    
    </div>

  );

}

export default Nav;