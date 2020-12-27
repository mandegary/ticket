import React, {useState, useEffect, useContext} from 'react';
import Button from "react-bootstrap/Button";
import './signIn.css';
import {AuthContext} from '../../../context/Auth/authContext';
/*import {NavLink, withRouter} from 'react-router-dom';*/
import Form from 'react-bootstrap/Form'
import Link from 'next/link'
import Router, {useRouter, withRouter} from 'next/router'
import {
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
} from 'react-google-recaptcha-v3';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
import {Col} from "react-bootstrap";
import Loader from "../../UI/loader/loader";
//import CheckSquare from "../../../assets/images/checksquare.svg"
import jalaali from "jalaali-js";
const theme = createMuiTheme({
    direction: 'rtl',
});

const SignIn = (props) => {
    const router = useRouter()
    const [captchaValue, setCaptchaValue] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState("none");
    const [showSignInForm, setShowSignInForm] = useState("");
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [token, setToken] = React.useState("");
    const [isSignIn, setIsSignIn] = useState(false);

    //const token = executeRecaptcha("login_page");
    let link;
    if (typeof window !== 'undefined')
    link = window.location.href;
    let returnUrl = "";
    const {dispatch} = useContext(AuthContext);
    //let userForm = require('../../../assets/images/userForm.jpg');
    let url = process.env.url;
    let latinToPersianMap = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
    let latinNumbers = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];
    const latinToPersian = (string) => {
        let result = string;
        for (let index = 0; index < 10; index++) {
            result = result.replace(latinNumbers[index], latinToPersianMap[index]);
        }
        return result;
    }
    const validate = () => {
        if (username === '') {
            setErrorMessage('نام کاربری نباید خالی باشد.');
            return false;
        } /*else if (!username.includes('@') || !username.includes('.')) {
            //setErrorMessage('نام کاربری را به درستی وارد کنید.');
            //return false;
        }*/ else if (password === '') {
            setErrorMessage('رمز عبور نباید خالی باشد.');
            return false;
        } else if (password.length < 5) {
            setErrorMessage('رمز عبور اشتباه است.');
            return false;
        }
        setErrorMessage('');
        return true;
    }
    async function loginHandler  () {
        if (!executeRecaptcha) {
            return;
        }
        const result = await executeRecaptcha("login_page");
        setToken(result);
        let remember_Me = false;
        if (rememberMe)
            remember_Me = true
        else remember_Me = false
        setErrorMessage('');
        const validateResult = validate();
        if (validateResult) {
            setLoading(true)
            const abortController = new AbortController()
            const promise = window
                .fetch(url + 'api/front/v1/login', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Host': 'hiteb24.com',
                        'dataType': 'jsonp',   //you may use jsonp for cross origin request
                        //Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
                        'Access-Control-Allow-Headers':'*',
                        'Access-Control-Request-Headers':'x-csrf-token,authorization,content-type,accept,origin,x-requested-with,access-control-allow-origin"',
                        'Access-Control-Allow-Origin': '*',
                    },
                    method: 'POST',
                    mode: 'cors',
                    signal: abortController.signal,
                    body: JSON.stringify({
                        mobile: username,
                        password: password,
                        remember_me: remember_Me,
                        recaptcha: result
                    })
                })
                .then(res => res.json())
                .then(responseJson => {
                    if ( responseJson.status === "ok") {
                        let token = responseJson.access_token;
                        //let _date="";
                        /*if(responseJson.user.brith!=null) {
                            if(responseJson.user.brith!=null){
                                let birth = responseJson.user.brith.split("-");//parseInt
                                _date = jalaali.toJalaali(parseInt(birth[0]), parseInt(birth[1]), parseInt(birth[2]))
                                console.log(_date)
                            }

                        }*/
                        dispatch({
                            type: 'login', payload:
                                {
                                    token: token,
                                    name: responseJson.user.name,
                                    family: responseJson.user.family,
                                    mobile: responseJson.user.mobile,
                                    city_id: responseJson.user.city_id,
                                    wallet: responseJson.user.wallet,
                                    userImg: responseJson.user.image200,
                                    /*agreement : responseJson.user.agreement,
                                    gender:responseJson.user.gender==null? 0 :responseJson.user.gender,
                                    meli:responseJson.user.meli,
                                    birth:_date*/
                                }
                        });
                        setIsSignIn(true)
                        setErrorMessage('');
                        setWelcomeMessage("کاربر عزیز خوش آمدید.")

                        setTimeout(function () {
                            props.modalClosed(responseJson.user.agreement);
                            setErrorMessage('');
                            setIsSignIn(false)
                            setWelcomeMessage("")
                            setErrorMessage("")
                        }, 2000);
                        setLoading(false);
                    } else if (responseJson.status === "error") {
                        setLoading(false);
                        setErrorMessage(responseJson.message)
                    } else {
                        setLoading(false);
                        setErrorMessage("لطفا مجددا تلاش کنید.")
                    }

                    returnUrl = link.split("=");
                    returnUrl = returnUrl[1]
                    if (returnUrl != "" && returnUrl != undefined)
                    {
                        window.location.replace(returnUrl)
                        /*router.push({
                            pathname: returnUrl,
                        },{
                            pathname: returnUrl,
                        }, { shallow: true });*/
                        //props.returnFunc();
                        console.log(router)
                        console.log(returnUrl)
                        //alert(router.query.returnUrl)
                        //window.location.replace(returnUrl)
                        //router.push("/")
                    }

                    else if (props.returnUrl != ""&& props.returnUrl != undefined)
                        router.push(props.returnUrl)
                    router.push(props.returnUrl);
                    /*else
                        window.location.href = "/"*/
                })
                .catch(err => {
                    setLoading(false);
                    setErrorMessage("لطفا مجددا تلاش کنید.")
                })
            // Cancel the request if it takes more than 5 seconds
            setTimeout(() => abortController.abort(), process.env.delayFetch)
        }
    }
    const usernameHandler = (event) => {
        setUsername(latinToPersian(event.target.value));
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const rememberMeHandler = (event) => {
        setRememberMe(event.target.value)
    }
    const changePassword = () => {
        /*checkCodeHandler();
        setShowOtpModal(true);*/
        setShowSignInForm("none");
        setShowResetPasswordForm("flex");
    }
    const ENTER_KEY = 13
    const handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            loginHandler();
        }
    }
    return (
        <React.Fragment>
            {/*<GoogleReCaptcha reCaptchaKey="6LdCKrMZAAAAAC5E4coUn0vqt3S9zFDG1PH33UVY"
                onVerify={token => {
                    alert(token)
                }}
            />*/}
            <MuiThemeProvider theme={theme}>
                <div className="signInForm" style={{display: showSignInForm}}>
                    <Col xl={5} lg={5} md={12} sm={12} xs={12}>
                        <div className="signIn">
                            <div className="titr">
                                <div><span><h5>ورود به حساب کاربری</h5></span></div>
                            </div>
                            {welcomeMessage != ""
                                ?
                                <div className="successLogin">
                                    <img src="../../../assets/images/checksquare.svg"/>
                                    <p className="welcomeMessage">{welcomeMessage}</p>
                                    <span className="loadingDots">درحال ورود به پنل کاربری</span>

                                </div>

                                :
                                null
                            }
                            {errorMessage != ""
                                ?
                                <p className="error">{errorMessage}</p>
                                :
                                null
                            }
                            {
                                !isSignIn?
                                    <React.Fragment>
                                        <div dir="rtl">
                                            <TextField id="outlined-basic" label="شماره موبایل" variant="outlined" value={username}
                                                       onChange={usernameHandler} onKeyDown={handleKeyDown}/>
                                            <TextField id="outlined-basic" label="رمز عبور" variant="outlined" type="password"
                                                       value={password} onKeyDown={handleKeyDown} onChange={passwordHandler}/>
                                        </div>
                                        <div className="login-more">
                                        <a href="" onClick={props.resetPass}>رمز عبور خود را فراموش کرده ام!</a>
                                        <Form.Check inline label="مرا بخاطر بسپار" type="checkbox" value={rememberMe}
                                                    onChange={rememberMeHandler} id="inline-checkbox"/>
                                        </div>

                                        {loading ?
                                            <div className="loginSpinner">
                                                <Loader/>
                                            </div>
                                            :
                                            <React.Fragment>
                                                <Button variant="primary" onClick={() =>loginHandler()}>ورود</Button>
                                                <Button variant="variant" onClick={() =>props.show()}>ثبت نام</Button>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                    :null
                            }
                        </div>
                    </Col>
                    <Col xl={7} lg={7} md={12} sm={12} xs={12}>
                        <img className="userForm" src="http://cdn.hiteb24.com/storage/static/auth/auth-1.jpg"/>
                    </Col>
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    )
}
export default SignIn;