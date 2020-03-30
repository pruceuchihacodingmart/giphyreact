import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import SearchBar from './SearchBar';

const PrivateRoute=({path,component: Component,...rest})=>{


    return (JSON.parse(localStorage.getItem('loginstatus'))===true)?
            <Component {...rest}/>
            :

            <Router>
                <Switch>
                    <Route exact path="/" component={SearchBar} />
                    <Redirect to='/'/>
                </Switch>
            </Router>
    
}
export default PrivateRoute;