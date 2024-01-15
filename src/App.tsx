import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/Home/Home";
import NavComp from "./core/nav/nav";
import notFound from "./pages/Home/not-found/notFound";
import SignUp from "./pages/signup/signUp";
import { Alert } from "reactstrap";

function App() {
    // initialNotification
    const initialNotification = {
      status: "",
      message: "",
      show: false,
    };
    const [showNotification, setShowNotification] = useState(initialNotification);
    const onShowNotification = (useData:any) => {
      setShowNotification({
        message: useData.message,
        status: useData.status,
        show: true,
      });
    };
    
  return (
    <Router >
        {showNotification.show && (
        <Alert
        onClose={() =>
          setShowNotification({ message: "", status: "", show: false })
        }
        className={
          showNotification.status === "danger"
            ? "alert custom-alert alert-danger"
            : "alert custom-alert alert-success"
        }
        dismissible={showNotification.show.toString()}
      >
        {showNotification.message}
      </Alert>
      )}
      <NavComp/>
       <div className="container">
        <Routes>
        <Route path="/home" Component={Home} />
        <Route index path="/"
         element={<Login onSubmitForm={onShowNotification} />}/>
        <Route path="/signUp" 
         element={<SignUp onSubmitForm={onShowNotification} />}/>
        <Route path="*" Component={notFound} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
