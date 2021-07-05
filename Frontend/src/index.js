import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";




ReactDOM.render(
  <Router>
    {/* <Welcome /> */}
    <Route exact path="/" >
    <Welcome/>
    </Route >
    <Switch>
    <Route path="/login" >
    <Login/>
    </Route >
    <Route path="/register" >
    <Register/>
    </Route >
    <Route path="/users" >
    <App/>
    </Route >
    </Switch>
    
  </Router>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Welcome/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );