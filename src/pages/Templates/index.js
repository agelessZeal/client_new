import React from 'react'
import Page from './../../components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Template from './Template'

class OrdersPage extends React.Component {
  static defaultProps = {
    pathName: 'Templates',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Templates" />
        <Template />
      </Page>
    )
  }
}

export default OrdersPage
