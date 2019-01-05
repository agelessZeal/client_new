import React from 'react'
import Page from './../../components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Campaign from './Campaign'

class EmailCampaign extends React.Component {
    static defaultProps = {
        pathName: 'Campaign',
        roles: ['agent', 'administrator'],
    }

    render() {
        const props = this.props
        return (
            <Page {...props}>
                <Helmet title="Email Campaign" />
                <Campaign />
            </Page>
        )
    }
}

export default EmailCampaign
