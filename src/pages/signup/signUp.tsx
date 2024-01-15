import React, { FC, PropsWithChildren, useState } from "react";
import { Alert, FormGroup, Input, Label } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signUp.css";
import {
  onCheckUserEmail,
  onCheckUserName,
  onRegister,
} from "../../shared/functions/auth";
import { useNavigate } from "react-router-dom";

const SignUp: FC<PropsWithChildren<any>> = () => {
  // initialNotification
  const initialNotification = {
    status: "",
    message: "",
    show: false,
  };
  const [showNotification, setShowNotification] = useState(initialNotification);
  const navigate = useNavigate();
  const onShowNotification = (status: string, message: string,show?:boolean) => {
    setShowNotification({
      message: message,
      status: status,
      show: show ? show : (status ? true : false),
    });
  };
  const [suggetionNames, setSuggetionNames] = useState([]);

  // Define your validation schema using Yup:
  const validationSchema: any = Yup.object().shape({
    userName: Yup.string()
      .required("User name is required")
      .test(
        "unique-username",
        "Username is not available",
        async function (value) {
          if (value !== formik.values.userName) {
            try {
              const response = await onCheckUserName(value);
              // Assuming the response contains a boolean field 'available'
              if (response.data.available) {
                onShowNotification("", "");
                setSuggetionNames([]);
                return true; // Username is available
              }
            } catch (error:any) {
              // Handle unexpected error during validation
              onShowNotification("danger", "User is Registered Before");
              setSuggetionNames(error.response.data.suggestedUsernames);
            return false;
            }
          }
          return true; // If the value is empty, don't perform validation
        }
      ),
    userEmail: Yup.string()
      .email("this mail is not valid")
      .required("Email is required")
      .test(
        "email-Unique",
        "Email is not available",
        async function (value) {
          if (value !== formik.values.userEmail) {
            try {
              const response = await onCheckUserEmail(value);
              // Assuming the response contains a boolean field 'available'
              if (response.data.available) {
                onShowNotification("", "");
                return true; 
              }
            } catch (error:any) {
              // Handle unexpected error during validation
              onShowNotification("danger", error.response.data.message);
            return false;
            }
          }
          return true; // If the value is empty, don't perform validation
        }
      ),
    password: Yup.string().required("password is required"),
    fName: Yup.string().required("First Name is required"),
    lName: Yup.string().required("Last Name is required"),
  });
  const onSubmit = async (values: {
    fName: string;
    lName: string;
    userEmail: string;
    userName: string;
    password: string;
  }) => {
    try {
      // Make API request using Axios (replace the URL with your API endpoint)
      const response = await onRegister({
        userName: values.userName,
        password: values.password,
        email: values.userEmail,
        fName: values.fName,
        lName: values.lName,
      });
      // Handle the API response as needed
      // Assume there is a success condition in your API response
      if (response.data.success) {
        // Show success notification
        onShowNotification("success", response.data.message,true);
        navigate("/");
      } else {
        // Handle API response errors, if any
        // You might want to set specific errors in the form for user feedback
        onShowNotification(
          "danger",
          "Error during Register. Please try again."
        );
      }
    } catch (error) {
      // Handle API request error
      onShowNotification("danger", "Error during Register. Please try again.");
    }
  };

  // take from me => initialValue, validationSchema and the onsubmit function
  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
      password: "",
      fName: "",
      lName: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: onSubmit,
  });

  return (
    <>
      {/* notification */}
      {showNotification.show && 
      (
        
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
      <form className="px-4 py-5 mt-5" onSubmit={formik.handleSubmit}>
        {/* user name */}
        <FormGroup>
          <Label for="UserName" className="text-capitalize ">
            user name
          </Label>
          <Input
            id="UserName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className="error-message text-danger">
              {formik.errors.userName}
            </div>
          )}
          {suggetionNames && (
              suggetionNames.map((item, index) => (
                <div onClick={()=>formik.setFieldValue("userName", item)} key={index} className="error-message text-danger">
                you can use: 
                <span className="suggest-name">{item}</span>
                
              </div>
              
              ))
          )}
        </FormGroup>
        {/* User Email */}
        <FormGroup>
          <Label for="UserEmail" className="text-capitalize ">
            Email
          </Label>
          <Input
            id="UserEmail"
            name="userEmail"
            value={formik.values.userEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
          {formik.touched.userEmail && formik.errors.userEmail && (
            <div className="error-message text-danger">
              {formik.errors.userEmail}
            </div>
          )}
        </FormGroup>
        {/* Password */}
        <FormGroup>
          <Label for="password" className="text-capitalize ">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message text-danger">
              {formik.errors.password}
            </div>
          )}
        </FormGroup>
        {/* First Name */}
        <FormGroup>
          <Label for="fName" className="text-capitalize ">
            First Name
          </Label>
          <Input
            id="fName"
            name="fName"
            value={formik.values.fName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
          {formik.touched.fName && formik.errors.fName && (
            <div className="error-message text-danger">
              {formik.errors.fName}
            </div>
          )}
        </FormGroup>
        {/* Last Name */}
        <FormGroup>
          <Label for="lName" className="text-capitalize ">
            Last Name
          </Label>
          <Input
            id="lName"
            name="lName"
            value={formik.values.lName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
          {formik.touched.lName && formik.errors.lName && (
            <div className="error-message text-danger">
              {formik.errors.lName}
            </div>
          )}
        </FormGroup>
        <button className="d-block btn btn-success ms-auto " type="submit">
          submit
        </button>
      </form>
    </>
  );
};

export default SignUp;
