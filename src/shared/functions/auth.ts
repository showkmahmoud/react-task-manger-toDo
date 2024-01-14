import axios from "axios";
import { APIName, api } from "../API/API";

export const onCheckUserName = (userName: string): any => {
  return axios.post(`${api}${APIName.checkUserName}`, {
    username: userName,
  });
};

export const onCheckUserEmail = (userEmail: string): any => {
  return axios.post(`${api}${APIName.checkEmail}`, {
    email: userEmail,
  });
};

export const onLogin = (data: { userName: string; password: string }): any => {
  return axios.post(`${api}${APIName.login}`, {
    username: data.userName,
    password: data.password,
  });
};
export const onRegister = (data: {
  userName: string;
  email: string;
  password: string;
  fName: string;
  lName: string;
}): any => {
  return axios.post(`${api}${APIName.login}`, {
    userName: data.userName,
    email: data.email,
    password: data.password,
    fName: data.fName,
    lName: data.lName,
  });
};
