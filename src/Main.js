import React from 'react';
import { Switch, Route } from 'react-router-dom'
import SingleArtist from './SingleArtist';
import Home from './Home'

const homeRoute = (props) => {
  return(
    <Route exact path='/' render={(routerProps) =>
      (<Home artists={props.names} {...routerProps}/>)}/>
    )
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
