import React from 'react'
import TodoItem from './TodoItem'
import api from '../utils/api'

const TodoBoard = ({ todoList, handleData }) => {
  const updateTask = async (id, task, isCompleted) => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        task,
        isCompleted: !isCompleted,
      })
      if (response.status === 200) {
        handleData()
        return
      }
      throw new Error('할일 업데이트 실패')
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTask = async id => {
    try {
      const response = await api.delete(`/tasks/${id}`)
      if (response.status === 200) {
        handleData()
        return
      }
      throw new Error('할일 삭제 실패')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map(item => (
          <TodoItem
            key={item._id}
            item={item}
            handleUpdate={updateTask}
            handleDelete={deleteTask}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  )
}

export default TodoBoard
