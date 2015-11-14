import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { MenuItem, LeftNav, Mixins, Styles } from 'material-ui';

@connect((state) => ({}))
class Root extends Component {
  render() {
      debugger;
    return (
      <div>
        <LeftNav ref="leftNav">
          <MenuItem index='0'>{this.props.now}</MenuItem>
          <MenuItem index='1'><Link to='/' activeClassName='active'>Root</Link></MenuItem>
          <MenuItem index='2'><Link to='/about' activeClassName='active'>About</Link></MenuItem>
        </LeftNav>
        <div>{this.props.children || <h2>Nothing yet</h2>}</div>
      </div>
    )
  }
}

export default Root;
