import React from 'react'
import Helmet from 'react-helmet'
import Page from './../../components/LayoutComponents/Page'
import EmailUnsubscribe from './EmailUnsubscribe/'

class EmailUnsubscribePage extends React.Component {
  render() {
    const { match, ...props } = this.props
    return (
      <Page {...props}>
        <Helmet title="Email Unsubscribe" />
        <EmailUnsubscribe match={match} />
      </Page>
    )
  }
}

export default EmailUnsubscribePage
