import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import HomeNavbar from "./HomeNavbar";
import Home from "./Home";

class AppMainRouter extends Component {
      render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<><HomeNavbar source='signin'/><Signin/></>} />
          <Route exact path="/signup" element={<><HomeNavbar  source='signup' /><Signup/></>} />
          <Route exact path="/home" element={<><HomeNavbar  source='home' /><Home/></>} />
        </Routes>
      </Router>
    );
  }
}

export default AppMainRouter;
