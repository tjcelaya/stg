import React from 'react'
import { MenuItem, LeftNav, Mixins, Styles } from 'material-ui'

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Disabled',
         disabled: true
      },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://www.google.com',
         text: 'Disabled Link',
         disabled: true
      },
    ];
  }
  render() {
    return <LeftNav ref="leftNav" menuItems={this.menuItems} />
  }
}

export default RootContainer