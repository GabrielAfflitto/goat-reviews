import React, {Component} from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Artists from './Artists'
import Home from './Home'


const Main = (props) => {
  return(
    <main>
      <Router>
        <Switch>
          <Route exact path='/artists' component={Artists}/>
          <Route path='/artists/:id' render={(props) => {
            return (JSON.stringify(props.match.params))
          }}/>
          <Route exact path='/' render={(routerProps) =>
            (<Home artists={props.names} {...routerProps}/>)}/>
        </Switch>
      </Router>
    </main>
  )
}

export default Main;
