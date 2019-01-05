import React from 'react'
import Page from './../../components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Products from './Products'

class ProductsPage extends React.Component {
  static defaultProps = {
    pathName: 'Products',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Products" />
        <Products />
      </Page>
    )
  }
}

export default ProductsPage
