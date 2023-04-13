import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/home/Home";
import Coursehome from "./Components/allcourses/Coursehome";
import Profile from "./Components/team/Profile";
import { RequireAuth } from "./Components/middleware/RequireAuth";
import Contribute from "./Components/contact/Contribute";
import Login from "./Components/Login/Login";
import Lessons from "./Components/allcourses/Lessons";

import { Amplify, Storage } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import "./ui-components/index";

import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
Amplify.configure(awsExports);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Home />} />
        <Route
          path="/learn"
          element={
            <RequireAuth>
              <Coursehome />
            </RequireAuth>
          }
        />
        <Route
          path="/lessons"
          element={
            <RequireAuth>
              <Lessons />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/contribute"
          element={
            <RequireAuth>
              <Contribute />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

function App({ signOut, user }) {
  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    console.log(result);
  };

  return (
    <>
      {/* <Heading level={3}>
          Hello {loginStatus ? user.username + "!" : "Guest!"}
        </Heading>
        <div>
          <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
        </div>
        <button onClick={uploadFile}>Upload file</button>
        <Text>{fileStatus ? "File uploaded successfully" : ""}</Text>
        <button onClick={() => setShowAuthentication(!showAuthentication)}>
          Close dialog
        </button> */}
      <Authenticator.Provider>
        <AppRoutes />
      </Authenticator.Provider>
    </>
  );
}

export default App;
