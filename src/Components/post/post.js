import React, {useEffect} from "react";
import "./post.css"
import {Grid,Paper} from '@material-ui/core';
import {
    Link,
    useParams
} from "react-router-dom";
import axios from "axios";
import Comments from "../comments/comments"
const Post = (props) => {

    let posts= JSON.parse(localStorage.getItem('posts'));
    let commentsHolder= JSON.parse(localStorage.getItem('comments'));
    let { id } = useParams();
    let comments = commentsHolder.filter(item => item.postId == id)

    return (
        <React.Fragment>
            <div className="post">
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={8}>
                            <Paper>
                                <h1>
                                    {posts.find(x => x.id == id).title}
                                </h1>
                                <p>
                                    {posts.find(x => x.id == id).body}
                                </p>
                                <Comments comments={comments}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}
export default Post