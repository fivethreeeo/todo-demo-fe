import React from 'react'
import { Col, Row } from 'react-bootstrap'

const TodoItem = ({ item, handleUpdate, handleDelete }) => {
  const { _id, task, isCompleted } = item

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className='todo-content'>{task}</div>
          <div>
            <button className='button-delete' onClick={() => handleDelete(_id)}>
              삭제
            </button>
            <button className='button-delete' onClick={() => handleUpdate(_id, task, isCompleted)}>
              {isCompleted ? '끝남' : '진행중'}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default TodoItem
