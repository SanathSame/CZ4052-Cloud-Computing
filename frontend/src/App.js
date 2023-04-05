import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/home/Home";
import Coursehome from "./Components/allcourses/Coursehome";
import Profile from "./Components/team/Profile";
import Contribute from "./Components/contact/Contribute";
import Login from "./Components/Login/Login";

import { Amplify, Storage } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./ui-components/index";

import awsExports from "./aws-exports";
import { useState } from "react";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    console.log(result);
  };

  return (
    <>
      <h1>Hello {user.username}</h1>
      <div>
        <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
      </div>
      <div>
        <button onClick={uploadFile}>Upload file</button>
      </div>
      {fileStatus ? "File uploaded successfully" : ""}
      <button onClick={signOut}>Sign out</button>
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/learn" element={<Coursehome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
