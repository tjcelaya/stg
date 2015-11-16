import { GUID } from './util'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'

import store from './store'; window.store = store;
import socket from './socket'
import Root from './components/root'
import About from './components/about'
import Map from './components/map'

let history = require('history/lib/createBrowserHistory')();

syncReduxAndRouter(history, store);

let ch = socket.channel('time', { id: GUID })
ch.on('set', (m) => {
  store.dispatch({ type: 'SET_TIME', ...m })
})
// ch.join()
//   .receive('ok', r => { console.log('joined!', r) })
//   .receive('error', r => { console.log('error joining!', r) })

render((
  <Provider store={store}>
    <Router>
      <Route path='/' component={Root}>
        <Route path='about(/:id)' component={About} />
        <Route path='map' component={Map} />
        {/*
        <Route path='parent' component={Parent}>
          <Route path='child' component={Child} />
          <Route path='child/:id' component={Child} />
        </Route>
        */}
      </Route>
    </Router>
  </Provider>
), _$('app'));