import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/Home/Home";
import NavComp from "./core/nav/nav";
import notFound from "./pages/Home/not-found/notFound";
import SignUp from "./pages/signup/signUp";

function App() {
  return (
    <Router >
      <NavComp/>
       <div className="container">
        <Routes>
        <Route path="/home" Component={Home} />
        <Route index path="/" Component={Login} />
        <Route path="/signUp" Component={SignUp} />
        <Route path="*" Component={notFound} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
