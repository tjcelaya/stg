import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { MenuItem, LeftNav, Mixins, Styles } from 'material-ui';

// if you want to get fancy and use destructuring at the same time, this could be
// @connect(({ time }) => ({ time }))
// but we've chosen to pull props out of state to be explicit

@connect((state) => ({ time: state.time }))
class Root extends Component {
  render() {
    // debugger
    return (
      <div>
        <LeftNav ref="leftNav">
          <MenuItem index='0'>{this.props.time}</MenuItem>
          <MenuItem index='1'>
            <Link to='/' activeClassName='active'>Root</Link>
          </MenuItem>
          <MenuItem index='2'>
            <Link to='/about' activeClassName='active'>About</Link>
          </MenuItem>
          <MenuItem index='2'>
            <Link to='/about/12' activeClassName='active'>About 12</Link>
          </MenuItem>
          <MenuItem index='2'>
            <Link to='/map' activeClassName='active'>Map</Link>
          </MenuItem>
        </LeftNav>
        <div>{this.props.children || <h2>Nothing yet</h2>}</div>
      </div>
    )
  }
}

export default Root;
