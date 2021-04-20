import React, {useEffect} from "react";
import "./comments.css"
import {Grid, Paper , Avatar} from '@material-ui/core';
import {
    Link,
    useParams
} from "react-router-dom";
import axios from "axios";

const Comments = (props) => {

    return (
        <React.Fragment>
            <div className="comments">
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={8}>
                            <paper className="commentsHead" >
                                COMMENTS
                            </paper>
                        </Grid>
                        <Grid container justify="center" spacing={8}>
                            <Paper>
                                {props.comments.map((comment, index) => (
                                    <div className="comment" >
                                        <div>
                                            <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs3QUdwghxw8G2I4aMAPGTy_reMYno68K8DQ&usqp=CAU" />
                                            <h5>
                                                {comment.name}
                                            </h5>
                                        </div>
                                        <p>
                                            {comment.body}
                                        </p>
                                    </div>
                                ))}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}
export default Comments