import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { MenuItem, LeftNav, Mixins, Styles } from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import StaticContainer from 'react-static-container'

// if you want to get fancy and use destructuring at the same time, this could be
// @connect(({ time }) => ({ time }))
// but we've chosen to pull props out of state to be explicit

class RouterTransitionGroup extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      previousPathname: null
    }
  }

  render() {
    const { children, ...props } = this.props

    return (
      <ReactCSSTransitionGroup {...props}>
        <div
          key={this.props.routing.segments[0]}
          style={{position: 'relative'}}
        >
          <div style={{position: 'absolute'}} className='full-width'>
            {/*absolute positioning loses default*/}
            {children}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }

  componentDidUpdate() {
    if (this.state.previousPathname) {
      console.log('blanking')
      this.setState({ previousPathname: null })
    }
  }
}

RouterTransitionGroup = connect(_.identity)(RouterTransitionGroup)

// @connect(state => ({ time: state.time }))
class Root extends Component {
  _handleMenuToggle() {
    store.dispatch({ type: 'MENU_TOGGLE', menuOpen: !this.props.menuOpen })
  }
  render() {
    window.rootProps = this.props
    return (
      <div>
        <LeftNav
            ref="leftNav"
            docked={this.props.menuOpen}
            disableSwipeToOpen={true}
            style={{paddingTop: '2em'}}
            >
          <MenuItem index={0}>{this.props.time}</MenuItem>
          <MenuItem index={1}>
            <Link to='/' activeClassName='active'>Root</Link>
          </MenuItem>
          <MenuItem index={2}>
            <Link to='/about' activeClassName='active'>About</Link>
          </MenuItem>
          <MenuItem index={3}>
            <Link to='/about/12' activeClassName='active'>About 12</Link>
          </MenuItem>
          <MenuItem index={4}>
            <Link to='/map' activeClassName='active'>Map</Link>
          </MenuItem>
        </LeftNav>
        <button
              onClick={this._handleMenuToggle.bind(this)}
              className='menu-toggle button-primary'
            >toggle menu</button>
        <div className='alert'>Path: {this.props.routing.segments.join(' | ')}</div>
        <div className='alert'>Message: {this.props.message}</div>
        <RouterTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.props.children || <h2>Nothing yet</h2>}
        </RouterTransitionGroup>
      </div>
    )
  }
}
Root = connect(_.identity)(Root)

export default Root;
