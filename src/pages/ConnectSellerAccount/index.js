import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Settings from './Settings'
import Helmet from 'react-helmet'

class ConnectSellerAccount extends React.Component {
  static defaultProps = {
    pathName: 'SellerAcount',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props;
    console.log(props);
    return (
      <Page {...props}>
        <Helmet title="ConnectSellerAccount" />
        <Settings/>
      </Page>
    )
  }
}

export default ConnectSellerAccount
