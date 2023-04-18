import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/home/Home";
import Coursehome from "./Components/allcourses/Coursehome";
import Profile from "./Components/team/Profile";
import { RequireAuth } from "./Components/middleware/RequireAuth";
import Contribute from "./Components/contact/Contribute";
import Login from "./Components/Login/Login";
import Lessons from "./Components/allcourses/Lessons";
import WebcamVideo from "./Components/allcourses/WebCamVideo";
import { Amplify } from "aws-amplify";
import QuizzesHome from "./Components/allcourses/QuizzesHome";
import Quizzes from "./Components/allcourses/Quizzes";
import "@aws-amplify/ui-react/styles.css";
import "./ui-components/index";

import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
Amplify.configure(awsExports);


const AppRoutes = () => {
  console.log(process.env.REACT_APP_CDN_URL);
  console.log(process.env.REACT_APP_EC2_URL);
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
              <Lessons CDN_URL={process.env.REACT_APP_CDN_URL} />
            </RequireAuth>
          }
        />
        <Route
          path="/quizzeshome"
          element={
            <RequireAuth>
              <QuizzesHome />
            </RequireAuth>
          }
        />
        <Route
          path="/quizzes"
          element={
            <RequireAuth>
              <Quizzes EC2_URL={process.env.REACT_APP_EC2_URL}/>
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
        <Route path="/record-video" element={<WebcamVideo />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <>
      <Authenticator.Provider>
        <AppRoutes />
      </Authenticator.Provider>
    </>
  );
}

export default App;
