import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { route, signOut } = useAuthenticator((context) => [
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
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            {/* <li><Link to='/'>Home</Link></li> */}
            <li>
              <Link to="/learn">Learn</Link>
            </li>
            <li>
              <Link to="/contribute">Contribute</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <Button
              onClick={() => logOut()}
              variation="menu"
              style={{ color: "white" }}
            >
              Logout
            </Button>
          </ul>

          <Button
            onClick={() => setClick(!click)}
            variation="menu"
            style={{ color: "white" }}
          >
            {click ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
