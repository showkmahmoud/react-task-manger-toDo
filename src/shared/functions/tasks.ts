import axios from "axios"
import { ITask } from "../interface/Task"
import { APIName, api } from "../API/API"
import { LOCAL_STORAGE_TOKEN } from "../enums/localStorageToken"

const getAuthToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN.userToken);
  };
export const onAddTask = (task:ITask) =>{
    return axios.post(`${api}${APIName.addTask}`,task, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ getAuthToken() }`,
        },
      }
    );
} 

export const onGetAllTasks = () =>{
    return axios.get(`${api}${APIName.getAllTasks}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ getAuthToken() }`,
        },
      }
    );
} 