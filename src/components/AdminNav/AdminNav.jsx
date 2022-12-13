import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './AdminNav.css';
import { useSelector } from 'react-redux';

function AdminNav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">The Vifi</h2>
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
        {user.id && (
          <>
            <Link className="navLink" to="/admin">
              Home
            </Link>

            <Link className="navLink" to="/admin_preventativecare">
              Preventative Care
            </Link>

            <Link className="navLink" to="/admin_resources">
              Resources
            </Link>

            <Link className="navLink" to="/adminprevcare">
              Preventative Care
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