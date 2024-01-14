import React, { FC, PropsWithChildren, useState } from "react";
import { Alert, FormGroup, Input, Label } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import './Login.css'
import { onCheckUserEmail, onCheckUserName } from "../../shared/functions/auth";
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
    console.log(status)
    setShowNotification({
      message: message,
      status: status,
      show: true,
    });
    console.log(showNotification)
  };
  // Define your validation schema using Yup:
  const validationSchema :any = Yup.object().shape({
    userName: Yup.string()
      .required("User name is required")
      .test(
        "unique-username",
        "Username is not available",
        async function (value) {
          if (value) {
            try {
              // Make an Axios request to check the availability of the username
              const response = await onCheckUserName(formik.values.userName);
              // Assuming the response contains a boolean field 'available'
              onShowNotification("success", response.message);
              return response.data.available;
            } catch (error) {
              onShowNotification("danger", 'User is Registered Before');
              console.error(error);
              return false; // If there is an error, consider the username as not available
            }
          }
          return true; // If the value is empty, don't perform validation
        }
      ),
    userEmail: Yup.string()
      .email("this mail is not valid")
      .required("Email is required")
      .test(
        "User is not registered",
        "Username is not available",
        async function (value) {
          if (value) {
            try {
              // Make an Axios request to check the availability of the username
              const response = await onCheckUserEmail(formik.values.userEmail);
              // Assuming the response contains a boolean field 'available'
              console.log(response);
              return response.data.available;
            } catch (error) {
              console.error(error);
              return false; // If there is an error, consider the username as not available
            }
          }
          return true; // If the value is empty, don't perform validation
        }
      ),
  });
  // take from me => initialValue, validationSchema and the onsubmit function
  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit(values) {
      // Handle form submission logic here
      console.log(values);
    },
  });

  return (
    <>
      {showNotification.show && (
        <Alert
        variant={showNotification.status}
          onClose={() =>
            setShowNotification({ message: "", status: "", show: false })
          }
          className="custom-alert"
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
        </FormGroup>
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
        <button className="d-block btn btn-success ms-auto " type="submit">
          submit
        </button>
      </form>
    </>
  );
};

export default Login;
