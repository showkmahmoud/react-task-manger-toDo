import React from 'react'
import { onAddTask, onGetAllTasks } from '../../shared/functions/tasks'

const Home = () => {
  const addTask = () =>{
    const task = {
      title:'task 1',
      status:'done'
  }
    onAddTask(task)
  }
  const getTasks = () =>{
    onGetAllTasks()
  }
  return (
    <div className='container mt-5 pt-5'>
      <button onClick={addTask}>add</button>
      <button onClick={getTasks}>Get</button>

    </div>
  )
}

export default Home