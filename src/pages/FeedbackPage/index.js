import React from 'react'
import Page from './../../components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Feedback from './Feedback'

class OrdersPage extends React.Component {
  static defaultProps = {
    pathName: 'Feedback',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Feedback" />
        <Feedback />
      </Page>
    )
  }
}

export default OrdersPage
