import React from 'react'
import Page from './../../components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Template from './Template'

class OrdersPage extends React.Component {
  static defaultProps = {
    pathName: 'Template Create',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Template" />
        <Template />
      </Page>
    )
  }
}

export default OrdersPage
