import React,{ memo } from 'react';
import './logo.css';
import TLogo from '../../../assets/images/logo.JPG';
import {NavLink} from "react-router-dom";

const Logo = (props)=>{
    return(
            <div className="Logo">
                <NavLink to="/">
                <img src={TLogo} alt="logo" />
                </NavLink>
            </div>
    )
}
export default memo(Logo);