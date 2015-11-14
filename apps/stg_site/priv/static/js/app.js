require('./util')
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { Provider, connect } from 'react-redux';

import { Route, Link } from 'react-router';
import { ReduxRouter } from 'redux-router';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import store from './store'

@connect((state) => ({}))
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        <h1>App Container</h1>
          <Link to={'/about/12'}>About</Link>
        <nav>
        </nav>
        {this.props.children || 'whereami'}
      </div>
    );
  }
}

class Parent extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        <h2>Parent</h2>
        {this.props.children}
      </div>
    );
  }
}

class Child extends Component {
  render() {
    const { params: { id }} = this.props;

    return (
      <div>
        <h2>Child</h2>
        {id && <p>{id}</p>}
      </div>
    );
  }
}

import About from './components/about'

render((
  <Provider store={store}>
    <ReduxRouter>
      <Route path='/' component={App}>
        <Route path='about(/:id)' component={About} />
        <Route path='parent' component={Parent}>
          <Route path='child' component={Child} />
          <Route path='child/:id' component={Child} />
        </Route>
      </Route>
    </ReduxRouter>
  </Provider>
), document.getElementById('app'));