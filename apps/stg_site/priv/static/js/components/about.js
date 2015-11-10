import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'About';
    }
    render() {
      L('render About')
      let { userID } = this.props.params
      let { query } = this.props.location
      let age = query && query.showAge ? '33' : ''

      return (
        <div className="User">
          <h1>User id: {userID}</h1>
          {age}
        </div>
      )
    }
}

export default About;