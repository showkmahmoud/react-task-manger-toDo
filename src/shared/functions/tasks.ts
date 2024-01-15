import axios from "axios"
import { ITask } from "../interface/Task"
import { APIName, api } from "../API/API"
import { LOCAL_STORAGE_TOKEN } from "../enums/localStorageToken"

export const addTask = (task:ITask) =>{
    task = {
        title:'task 1',
        status:'done'
    }
    task.Authorization = localStorage.getItem(LOCAL_STORAGE_TOKEN.userToken) ? localStorage.getItem(LOCAL_STORAGE_TOKEN.userToken) : ''
    return axios.post(`${api}${APIName.addTask}`,task)
} 