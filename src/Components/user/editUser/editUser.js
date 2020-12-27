import React, {useState, useEffect, useContext} from 'react';
import './editUser.css';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import Buton from '@material-ui/core/Button';
import {AuthContext} from "../../../context/Auth/authContext";
import {Redirect} from "react-router-dom";

const EditUser = (props) => {
    let userInfo=JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState(userInfo.name);
    const [family, setFamily] = useState(userInfo.family)
    const [meliCode, setMeliCode] = useState(userInfo.meliCode)
    const [file, setFile] = useState("");
    const [img, setImg] = useState("");
    const [fileUploaded, setFileUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditted, setIsEditted] = useState(false);
    const {dispatch} = useContext(AuthContext);

    const nameHandler = (event) => {
        setErrorMessage('');
        setName(event.target.value);
    }
    const familyHandler = (event) => {
        setErrorMessage('');
        setFamily(event.target.value)
    }
    const meliCodeHandler = (event) => {
        setErrorMessage('');
        setMeliCode(event.target.value)
    }
    let fileObj = [];
    let fileArray = [];
    function uploadFile(event) {
        fileObj.push(event.target.files)
        fileArray.push(fileObj[0]);
        const [{size, name, type}] = fileArray[0];
        if (type != "image/png" && type != "image/jpeg" && type != "image/jpg") {
            setErrorMessage("فقط مجاز به آپلود عکس می باشید.");
        }
        if (size < 20971520) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setFile(event.target.files[0])
            setFileUploaded(true)
        } else {
            setErrorMessage("حجم تصویر باید کم تر از 3مگابایت باشد.");
        }
    }
    const validate = () => {
        if (name == '') {
            setErrorMessage('Name can not be empty.');
            return false;
        } else if (family == '') {
            setErrorMessage('Family can not be empty.');
            return false;
        } else if (meliCode == '') {
            setErrorMessage('MeliCode can not be empty.');
            return false;
        } else if (meliCode.length < 10) {
            setErrorMessage('MeliCode is incorrect');
            return false;
        }
        setErrorMessage('');
        return true;
    }
    const editHandler = (event) => {
        if(validate())
        {
            dispatch({
                type: 'login', payload:
                    {
                        name: name,
                        family: family,
                        userImg: img,
                        meliCode:meliCode
                    }
            });
            setIsEditted(true)
        }
    }

    return (
        <Container fluid="md">
            <Row>
                <Col md={{ span: 6, offset: 3}} className="editUser">
                    {errorMessage != "" ? <p className="error">{errorMessage}</p> : null}
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="user" placeholder="" value={name} onChange={nameHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicFamily">
                            <Form.Label>Family</Form.Label>
                            <Form.Control placeholder="" value={family} onChange={familyHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicMeliCode">
                            <Form.Label>MeliCode</Form.Label>
                            <Form.Control placeholder="" value={meliCode} onChange={meliCodeHandler} maxLength={10}/>
                        </Form.Group>
                        <Form.Row>
                            <div className="uploadContainer">
                                <label htmlFor="contained-button-file" className="button-file">
                                    <Buton variant="contained"
                                           color="default" component="span" >
                                        Upload Your Avatar
                                    </Buton>
                                </label>
                                <img src={img} className="avatar"/>
                                <input
                                    accept="image/*"
                                    className=""
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={uploadFile}
                                />
                            </div>
                        </Form.Row>

                        <Button variant="primary" onClick={editHandler}>
                            Edit
                        </Button>
                        {isEditted ? <span className="edited">DONE!</span>:null}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default EditUser;