import React, {useState, useEffect, useContext} from 'react';
import './SignUp.css';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import  {AuthContext} from '../../../context/Auth/authContext';


const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('');
    const [family, setFamily] = useState('')
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {dispatch} = useContext(AuthContext);

    const usernameHandler = (event) => {
        setErrorMessage('');
        setUsername(event.target.value);
    }
    const passwordHandler = (event) => {
        setErrorMessage('');
        setPassword(event.target.value)
    }
    const passwordConfirmationHandler = (event) => {
        setErrorMessage('');
        setPasswordConfirmation(event.target.value)
    }
    const nameHandler = (event) => {
        setErrorMessage('');
        setName(event.target.value);
    }
    const familyHandler = (event) => {
        setErrorMessage('');
        setFamily(event.target.value)
    }
    const validate = () => {
        if (username == '') {
            setErrorMessage('Username can not be empty.');
            return false;
        } else if (password == '') {
            setErrorMessage('Password can not be empty.');
            return false;
        }  else if (password.length < 5) {
            setErrorMessage('Password is incorrect');
            return false;
        }else if (passwordConfirmation == '') {
            setErrorMessage('Confirm password can not be empty.');
            return false;
        } else if (password != passwordConfirmation||passwordConfirmation.length < 5) {
            setErrorMessage('Confirm password is incorrect');
            return false;
        } else if (name == '') {
            setErrorMessage('Name can not be empty.');
            return false;
        } else if (family == '') {
            setErrorMessage('Family can not be empty.');
            return false;
        }
        setErrorMessage('');
        return true;
    }
    const signUpHandler = (event) => {
        if(validate())
        {
            dispatch({
                type: 'login', payload:
                    {
                        name: name,
                        family: family,
                        //userImg: image,
                    }
            });
            props.history.push("/")
        }
        //else alert("signIn Fail")
    }

    return (
        <Container fluid="md">
            <Row>
                <Col md={{ span: 6, offset: 3}} className="signIn">
                    {errorMessage != "" ? <p className="error">{errorMessage}</p> : null}
                    <Form>

                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="user" placeholder="" value={username} onChange={usernameHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="" value={password} onChange={passwordHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPasswordConfirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" placeholder="" value={passwordConfirmation} onChange={passwordConfirmationHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="user" placeholder="" value={name} onChange={nameHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicFamily">
                            <Form.Label>Family</Form.Label>
                            <Form.Control placeholder="" value={family} onChange={familyHandler} />
                        </Form.Group>

                        <Button variant="primary" onClick={signUpHandler}>
                            SignUp
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default SignUp;