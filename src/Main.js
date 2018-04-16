import React, {Component} from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './Login';
import SingleArtist from './SingleArtist';
import Home from './Home'

const homeRoute = (props) => {
  if(!props.user){
    return(
      <Route path='/' render={() => <Login setUser={props.setUser}/>}/>
    )
  } else {
    return(
      <Route exact path='/' render={(routerProps) =>
        (<Home artists={props.names} {...routerProps}/>)}/>
      )
    }
  }

const Main = (props) => {

  return (
    <main>
        <Switch>
          <Route path='/artists/:id' render={(routerProps) => <SingleArtist {...routerProps} {...props}/>}/>
          {homeRoute(props)}
        </Switch>
    </main>
  )
}

export default Main;
