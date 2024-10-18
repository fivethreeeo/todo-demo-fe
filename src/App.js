import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from './utils/api'
import TodoBoard from './components/TodoBoard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

function App() {
  const [todoList, setTodoList] = useState([])
  const [todoValue, setTodoValue] = useState('')

  const getTasks = async () => {
    const response = await api.get('/tasks')
    setTodoList(response.data.data)
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isCompleted: false,
      })
      if (response.status === 200) {
        setTodoValue('')
        getTasks()
        return
      }
      throw new Error('할일 추가 실패')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <Container>
      <Row className='add-item-row'>
        <Col xs={12} sm={10}>
          <input
            type='text'
            placeholder='할일을 입력하세요'
            className='input-box'
            value={todoValue}
            onChange={event => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className='button-add' onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} handleData={getTasks} />
    </Container>
  )
}

export default App
