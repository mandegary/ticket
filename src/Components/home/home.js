import React, {useEffect} from "react";
import "./home.css"
import {Grid,Paper} from '@material-ui/core';
import {Link} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../UI/loader/loader"
const HomePage = (props) => {

    const [postHolder, setPostHolder] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [dataLngth, setDataLngth] = React.useState(100);
    const [loading, setLoading] = React.useState(true);
    let posts= JSON.parse(localStorage.getItem('posts')) != null ? JSON.parse(localStorage.getItem('posts')) : []
    console.log(JSON.parse(localStorage.getItem('users')))
    let users= JSON.parse(localStorage.getItem('users')) != null ? JSON.parse(localStorage.getItem('users')) : [] ;

    useEffect(()=>{
        fetchMoreData();
    },[]);

    const fetchMoreData = () => {
        if (dataLngth>0 && posts!=null && users!=null) {
            setTimeout(() => {
                let x = index
                let newPosts = Object.keys(posts).slice(0, x + 10).map(key => (posts[key]))
                setIndex(x + 10)
                setPostHolder(newPosts)
                setDataLngth(dataLngth - 10)
            },1000);
        }
        else setLoading(false)
    }

    return (
        (posts!=null && users!=null) &&
        <React.Fragment>
            <div className="home">
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={8}>
                            <InfiniteScroll
                                dataLength={dataLngth}
                                next={fetchMoreData}
                                hasMore={true}
                                loader={loading ? <Loader/> : null}
                                >
                                {postHolder.map((post, index) => (
                                    <Paper key={index}>
                                        <h3>
                                        <Link to={`/post/`+post.id} target="_blank">
                                            {post.title}
                                        </Link>
                                        </h3>
                                        <p><span>author :</span> {users.find(x => x.id === post.userId).name}</p>
                                    </Paper>
                                ))}
                            </InfiniteScroll>
                            {/*{posts.length>0 && Object.entries(posts).slice(10).map(post => (
                                <Grid key={post.id} item>
                                    <Paper>
                                        <Link to={`/post/`+post.id} >
                                            <h3>{post.title}</h3>
                                        </Link>
                                        <p>{users.find(x => x.id === post.userId).name}</p>
                                    </Paper>
                                </Grid>
                            ))}*/}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}
export default HomePage