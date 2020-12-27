import React,{ memo, Fragment, useState, useContext, useRef, useEffect } from 'react';
import './Toolbar.css';
import Logo from '../logo/logo';
import {withRouter} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import {Avatar} from '@material-ui/core';
import {AuthContext} from '../../../context/Auth/authContext';
let userImg = require('../../../assets/images/user.svg');

const Toolbar = (props) => {
    const {dispatch} = useContext(AuthContext);
    let userInfo = JSON.parse(localStorage.getItem('user'));
    let auth = false;
    if (userInfo) {
        auth = true;
    }
    const logoutFunc = () => {
        dispatch({type: 'logout'});
        props.history.replace('/');
    }
    return (
        <Container>
                <Row>
                    <Col xl={2} lg={2} md={4} sm={5} className=" logo">
                        <Logo/>
                    </Col>
                    <Col xl={6} lg={6} md={4} sm={2}></Col>
                    <Col xl={4} lg={4} md={4} sm={5} className="">
                        <div className="userLnk">
                            {!auth ?

                                <div className="userLnkLogin">
                                    <NavLink to="/signIn">
                                        <span className="userInfoEditLnk">LOGIN</span>
                                    </NavLink>
                                </div>
                                :
                                <div>
                                    {userInfo.userImg == "" ?
                                        <Avatar src={userImg}/>
                                        :
                                        <Avatar src={userInfo.userImg}/>
                                    }
                                    <span className="welcome">{"Welcome " + userInfo.name + " " + userInfo.family}</span>

                                    <div className="userMenu">
                                        <NavLink to="/edit">
                                                        <span className="userInfoEditLnk">Edit Info</span>
                                                   </NavLink>
                                     <span className="exitLnk" onClick={logoutFunc}>exit</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </Col>
                    </Row>
            </Container>
    );
}
export default withRouter(memo(Toolbar));