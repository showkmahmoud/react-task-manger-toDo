import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import signUp from "./pages/signup/signUp";
import Home from "./pages/Home/Home";
import NavComp from "./core/nav/nav";
import notFound from "./pages/Home/not-found/notFound";

function App() {
  return (
    <Router >
      <NavComp/>
       <div className="container">
        <Routes>
        <Route index Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signUp" Component={signUp} />
        <Route path="*" Component={notFound} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
