import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const { signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  const logOut = () => {
    signOut();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <Head />
      <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <nav className="flexSB">
          <div style={{ flexGrow: 1 }}>
            <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
              <li>
                <Link to="/learn" className={isActive("/learn") ? "active" : ""} style={{ textDecoration: 'none' }}>
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/quizzeshome" className={isActive("/quizzeshome") ? "active" : ""} style={{ textDecoration: 'none' }}>
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/contribute" className={isActive("/contribute") ? "active" : ""} style={{ textDecoration: 'none' }}>
                  Contribute
                </Link>
              </li>
              <li>
                <Link to="/profile" className={isActive("/profile") ? "active" : ""} style={{ textDecoration: 'none' }}>
                  Profile
                </Link>
              </li>
              <li onClick={logOut} >
                <Link style={{ textDecoration: 'none' }}>Logout</Link>
              </li>
            </ul>
          </div>
          <div className="flexSB">

          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
