import * as React from 'react';
import {Suspense} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './App.css';
import AuthContextProvider from './context/AppContext/AppContext';
import Home from "./Components/home/home"
import Data from "./Components/data/data"
import Post from "./Components/post/post"
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>
                    <div className="main">
                        {/*<Suspense fallback={<div className="pageLoader"><Loader/></div>}>*/}
                        <Data/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/post/:id" exact component={Post}/>
                        </Switch>
                        {/*</Suspense>*/}
                    </div>

                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
