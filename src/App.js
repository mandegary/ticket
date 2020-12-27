import * as React from 'react';
import {Suspense} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './App.css';
import AuthContextProvider from './context/Auth/authContext';
/*import Loader from './Components/UI/loader/loader';*/
import SignIn from './Components/user/signIn/signIn';
import SignUp from './Components/user/signUp/SignUp';
import EditUser from './Components/user/editUser/editUser';
import Giphy from './Components/gipgy/giphy';
import Todo from './Components/todo/todo';
import Toolbar from './containers/Header/Toolbar/Toolbar';
import Footer from './containers/Footer/footer/footer';
import Loader from "./Components/UI/loader/loader";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>
                    <header className="App-header header">
                        <Toolbar/>
                    </header>
                    <div className="main">
                        <Suspense fallback={<div className="pageLoader"><Loader/></div>}>
                        <Switch>
                            <Route path="/" exact component={Giphy}/>
                            <Route path="/signIn" exact component={SignIn}/>
                            <Route path="/register" exact component={SignUp}/>
                            <Route path="/edit" exact component={EditUser}/>
                            <Route path="/todo" exact component={Todo}/>
                        </Switch>
                        </Suspense>
                    </div>
                    <footer className="App-footer footer">
                        <Footer/>
                    </footer>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
