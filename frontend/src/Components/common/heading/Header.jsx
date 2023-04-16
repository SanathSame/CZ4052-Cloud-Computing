import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  const logOut = () => {
    signOut();
    navigate("/login");
  };
  return (
    <>
      <Head />
      <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <nav className="flexSB">
          <div style={{ flexGrow: 1 }}>
            <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
              {/* <li><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></li> */}
              <li>
                <Link to="/learn" style={{ textDecoration: 'none' }}>Learn</Link>
              </li>
              <li>
                <Link to="/quizzeshome" style={{ textDecoration: 'none' }}>Quizzes</Link>
              </li>
              <li>
                <Link to="/contribute" style={{ textDecoration: 'none' }}>Contribute</Link>
              </li>
              <li>
                <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>
              </li>
              <li onClick={logOut}>
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
