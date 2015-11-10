import React from 'react';
import mui from 'material-ui';
import { Link } from 'react-router';

let { MenuItem, LeftNav, Mixins, Styles } = require('material-ui');

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
          <MenuItem index={1}><Link to='/about' activeClassName='active'>Bob</Link></MenuItem>
          <MenuItem index={2}><Link to='/about/2'  activeClassName='active'>Bob With Query Params</Link></MenuItem>
          <MenuItem index={3}><Link to='/about' query={{ showAge: true }} activeClassName='active'>Bob With Query Params</Link></MenuItem>
          <MenuItem index={4}><Link to='/home' activeClassName='active'>Sally</Link></MenuItem>
        </LeftNav>
        <div>{this.props.children || <h2>Nothing yet</h2>}</div>
      </div>
    )
  }
}

export default Root;
