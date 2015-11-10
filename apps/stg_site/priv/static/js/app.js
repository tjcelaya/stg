require('./util')
import React from 'react'
window.React = React; // for dev tools
import { render } from 'react-dom'
require('react-tap-event-plugin')();
import { Router, Route } from 'react-router'
import { createHistory, useBasename } from 'history'
const history = useBasename(createHistory)({
  basename: '/'
})
import Root from './components/root'
import Home from './components/home';
import About from './components/about';

render((
  <Router history={history}>
    <Route path="/" component={Root}>
      <Route path="about" component={About} />
      <Route path="about/:userID" component={About} />
      <Route path='home' component={Home} />
    </Route>
  </Router>
), _$('app'));
