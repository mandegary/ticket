import React, {useState, useEffect, useContext} from 'react';
import './signIn.css';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {NavLink, Redirect} from "react-router-dom";
import {AuthContext} from "../../../context/Auth/authContext";

const SignIn = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {dispatch} = useContext(AuthContext);
    const usernameHandler = (event) => {
        setErrorMessage('');
        setUsername(event.target.value);
    }
    const passwordHandler = (event) => {
        setErrorMessage('');
        setPassword(event.target.value)
    }
    const validate = () => {
        if (username == '') {
            setErrorMessage('Username can not be empty.');
            return false;
        } else if (password == '') {
            setErrorMessage('Password can not be empty.');
            return false;
        } else if (password.length < 5) {
            setErrorMessage('Password is incorrect.');
            return false;
        }
        setErrorMessage('');
        return true;
    }
    const loginHandler = (event) => {
        if (validate()) {
            if (username == "tcard" && password == "11111111"){
                dispatch({
                    type: 'login', payload:
                        {
                            name: "tcard",
                            family: "tcard",
                            meliCode:"1111111111"
                            //userImg: image,
                        }
                });
                setIsLoggedIn(true)
            }

            else setErrorMessage("usernamre or password is incorrect.")
        }
        //else alert("signIn Fail")
    }

    return (
        isLoggedIn ?
            <Redirect to="/"/> :
            <Container fluid="md">
                <Row>
                    <Col md={{span: 6, offset: 3}} className="signIn">
                        {errorMessage != "" ? <p className="error">{errorMessage}</p> : null}
                        <Form>
                            <Form.Group controlId="formBasicUserName">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control type="user" placeholder="" value={username} onChange={usernameHandler}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="" value={password}
                                              onChange={passwordHandler}/>
                            </Form.Group>
                            <Button variant="primary" onClick={loginHandler}>
                                Login
                            </Button>
                            <NavLink to="/register" className="signUpLnk">
                                <span>SignUp</span>
                            </NavLink>
                        </Form>
                    </Col>
                </Row>
            </Container>
    )
}
export default SignIn;