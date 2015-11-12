import React from 'react';
import { Link } from 'react-router';

import { MenuItem, LeftNav, Mixins, Styles } from 'material-ui';

import Home from './home';
import About from './about';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
  }
  render() {
    return (
      <div>
        <LeftNav ref="leftNav">
          <MenuItem index={0}><Link to='/' activeClassName='active'>Root</Link></MenuItem>
          <MenuItem index={1}><Link to='/home' activeClassName='active'>Bob</Link></MenuItem>
          <MenuItem index={2}><Link to='/home/2'  activeClassName='active'>Bob With Query Params</Link></MenuItem>
          <MenuItem index={3}><Link to='/home' query={{ showAge: true }} activeClassName='active'>Bob With Query Params</Link></MenuItem>
          <MenuItem index={4}><Link to='/about' activeClassName='active'>Sally</Link></MenuItem>
        </LeftNav>
        <div>{this.props.children || <h2>Nothing yet</h2>}</div>
      </div>
    )
  }
}

export default Root;
