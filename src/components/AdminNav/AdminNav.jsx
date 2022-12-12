import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import './AdminNav';
import { useSelector } from "react-redux";

function AdminNav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/admin_home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && user.access_level ==1 && (
          <>
            <Link className="navLink" to="/admin_preventative_care">
              Preventative Care
            </Link>

            <Link className="navLink" to="/admin_resources">
              Resources
            </Link>

            <Link className="navLink" to="/admin">
             Home
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default AdminNav;
