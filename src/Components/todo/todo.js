import React, {useState,useEffect} from "react";
import "./todo.css"
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {Redirect} from "react-router-dom";

const Todo = (props) => {
    let tasks = ["Task 1", "Task 2"];
    const [task, setTask] = useState('');
    const [auth, setAuth] = useState(false);
    const [todoHolder, setTodoHolder] = useState(tasks);
    const [errorMessage, setErrorMessage] = useState('');
    const taskHandler = (event) => {
        setErrorMessage('');
        setTask(event.target.value);
    }
    const addTask = () => {
        if (task != "") {
            let _array = []
            _array.push(task)
            setTask("")
            setTodoHolder(todoHolder.concat(_array))
        } else setErrorMessage("please enter task title!")
    }
    const removeTask = (item) => {
        let _array = todoHolder;
        let index = _array.indexOf(item);
        if (index !== -1) {
            let x=_array.filter(e => e !==item)
            setTodoHolder(x)
        }
    }
    return (
        <div className="todoListMain">
            <Container fluid="md">
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Form.Group controlId="formBasicQuery">
                                <Form.Control type="text" placeholder="new task title" value={task}
                                              onChange={taskHandler}/>
                            </Form.Group>
                            <Button variant="primary" onClick={addTask}>
                                Add New Task
                            </Button>
                            {errorMessage != "" ? <span className="error">{errorMessage}</span> : null}
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <ul className="todoList">
                            {
                                todoHolder.length > 0 ?
                                    todoHolder.map((t, index) => (
                                        <li key={index}>{t}<span onClick={() => removeTask(t)}>x</span></li>
                                    ))
                                    : <li>No Task...</li>
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Todo;
