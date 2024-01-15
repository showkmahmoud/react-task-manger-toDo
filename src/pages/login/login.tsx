import React, { FC, PropsWithChildren, useState } from "react";
import { Alert, FormGroup, Input, Label } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import {  onLogin,
} from "../../shared/functions/auth";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE_TOKEN } from "../../shared/enums/localStorageToken";
interface ILoginModal {
  onSubmitForm?: any;
}
const Login: FC<PropsWithChildren<ILoginModal>> = ({ onSubmitForm }) => {
  // initialNotification
  const initialNotification = {
    status: "",
    message: "",
    show: false,
  };
  const [showNotification, setShowNotification] = useState(initialNotification);
  const onShowNotification = (status: string, message: string) => {
    setShowNotification({
      message: message,
      status: status,
      show: true,
    });
  };
  const navigate = useNavigate()
  // Define your validation schema using Yup:
  const validationSchema: any = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    password: Yup.string().required("password is required"),
  });
  const onSubmit = async (values: { userName: string; password: string }) => {
    try {
      // Make API request using Axios (replace the URL with your API endpoint)
      const response = await onLogin({
        userName: values.userName,
        password: values.password,
      });
      // Handle the API response as needed
      // Assume there is a success condition in your API response
      if (response.data.success) {
        navigate("/home");
        // Show success notification
        onShowNotification("success", "Login successful!");
        onSubmitForm({
          status:'success',
          message:"Login successful!"
        })
        localStorage.setItem(LOCAL_STORAGE_TOKEN.userToken,response.data.token)
      } else {
        // Handle API response errors, if any
        // You might want to set specific errors in the form for user feedback
        onShowNotification("danger", "Error during login. Please try again.");
      }
    } catch (error) {
      // Handle API request error
      // Show error notification
      onShowNotification("danger", "Error during login. Please try again.");
    }
  };
  // take from me => initialValue, validationSchema and the onsubmit function
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
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

      <form className="px-4 py-5 mt-5" onSubmit={formik.handleSubmit}>
        {/* user name */}
        <FormGroup>
          <Label for="UserName" className="text-capitalize ">
            user name/ email
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
        </FormGroup>
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
        <button className="d-block btn btn-success ms-auto " type="submit">
          submit
        </button>
      </form>
    </>
  );
};

export default Login;
