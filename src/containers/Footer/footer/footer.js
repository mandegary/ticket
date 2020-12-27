import React,{ Fragment } from 'react';
import "./footer.css";
import {Container, Row, Col } from "react-bootstrap";

const Footer = ()=>{
    return (
        <Fragment>
        <footer className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="copyRight col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 footer-section">
            <Container>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className="copyRight-sec">
            <span className="copyRightTxt">
                All Rights Reserved.
            </span>
                    </Col>

                </Row>
            </Container>
            </div>
        </div>
        </footer>
        </Fragment>
    );
}
export default Footer