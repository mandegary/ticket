import React, {useEffect, useContext} from "react";
import axios from "axios";
import {AppContext} from '../../context/AppContext/AppContext';

function Data() {
    const {dispatch} = useContext(AppContext);
    //useEffect(() => {

    axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(responseJson => {
            dispatch({
                type: 'posts', payload:
                    {
                        posts: responseJson.data,
                    }
            });
        })
    axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(responseJson => {
            dispatch({
                type: 'users', payload:
                    {
                        users: responseJson.data,
                    }
            });
        })
    axios.get(`https://jsonplaceholder.typicode.com/comments`)
        .then(responseJson => {
            dispatch({
                type: 'comments', payload:
                    {
                        comments: responseJson.data,
                    }
            });
        })

    //}, []);
    return (
        <div>

        </div>
    );
}

export default Data;
