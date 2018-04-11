import React, {Component} from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Artists from './Artists'
import Home from './Home'
// import {Albums} from './Albums'


const Main = () => (
  <main>
    <Router>
      <Switch>
        <Route path='/artists' component={Artists}/>
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  </main>
)

export default Main;
