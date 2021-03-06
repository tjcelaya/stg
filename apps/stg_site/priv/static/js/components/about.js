import React, { Component } from 'react'
import { connect } from 'react-redux'

// as an example, we can connect this non-root component to the redux store and have it
// consume the store's time with a different value
class About extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'About';
    }
    render() {
      // this amounts to
      // let id = this.props.params.id
      // let query = this.props.location.query
      // let aboutTime = this.props.thetime
      //
      let {
        params: { id },
        location: { query },
        thetime: aboutTime
      } = this.props
      let age = query && query.showAge ? '33' : ''

      return (
        <div className="User container">
          <h1>User id: {id}</h1>
          {aboutTime}
        </div>
      )
    }
}
About = connect((state) => ({ thetime: state.time }))(About)


export default About;
