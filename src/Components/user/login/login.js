import React, {useEffect, useContext} from "react";

//import {AppContext} from '../../context/AppContext/AppContext';

function Login() {
    //const {dispatch} = useContext(AppContext);
    fetch('http://localhost:3000/users', {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Host': 'hiteb24.com',
                                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                                    'Access-Control-Allow-Origin': '*',

                                },
                                body: JSON.stringify({
                                      "id": 2,
                                            "name": "maryam2",
                                            "password": "1233"
                                                }),
                                method: 'POST',
                                mode: 'cors'
                            })
                                .then(res => res.json())
                                .then(responseJson => {
                                    alert(1)
                                })
                                .catch(err => {
                                })
    return (
        <div>
        </div>
    );
}

export default Login;
