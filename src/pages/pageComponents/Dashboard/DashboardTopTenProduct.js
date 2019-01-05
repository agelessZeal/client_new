import React, { Component } from 'react'
import {
  Rate,
  Select,
  Popover,
  Button,
} from 'antd'
import * as Functions from '../../pageData/Functions.js'




const { Option, OptGroup } = Select

export default class DashboardTopTenProduct extends Component {
  state = {
    filterItems: ''
  }
  filterItemChange = values => {
    this.setState({ filterItems: values })
  }
  makeApiCall = () => {
    const {fetchTopTenProduct, user:{_id:userId}} = this.props
    const {filterItems} = this.state
    let payload = {userId}
    if (filterItems === 'order') {
      payload = {
        order: true,
        userId
      }
    } else if (filterItems === 'rating') {
      payload = {
        rating: true,
        userId
      }
    }
    fetchTopTenProduct(payload)
  }
  _generateFilter = () => {
    let filteringOptions = [
      {
        title: 'Filter by',
        keys: [
          {
            title: 'Order',
            value: 'order',
          },
          {
            title: 'Rating',
            value: 'rating',
          },

        ]
      }
    ]
    let allFilters = filteringOptions.map((option, i) =>
      <OptGroup key={i} label={option.title}>
        {
          option.keys.map((op, j) =>
            <Option key={op.value} value={op.value}>{op.title}</Option>
          )
        }
      </OptGroup>
    )
    return <Select
        size="default"
        placeholder="Please select fields to filter"
        onChange={this.filterItemChange}
        style={{minWidth: 200}}>
        {allFilters}
    </Select>
  };
  render() {
    const {products} = this.props
    let table = <table className="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Asin</th>
          <th>Price</th>
          <th>Order Count</th>
          <th style={{minWidth: 160}}>Rating</th>
        </tr>
      </thead>
      <tbody>
      {
        products.map((product, key) => <tr key={key}>
          <td>{Functions.generatePopover(product.item_name, 100)}</td>
          <td>{product.asin1}</td>
          <td>${product.price}</td>
          <td>{product.order_count}</td>
          <td>
            <div>{Functions.genRating(product.rating)}</div>
          </td>
        </tr>)
      }
      </tbody>
    </table>
    return <div className="card">
      <div className="card-header">
        <h2>Top ten products</h2>
        <div className="d-flex">
          <div className="mr-2">
            {this._generateFilter()}
          </div>
          <Button onClick={() => this.makeApiCall()} > Filter </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">{table}</div>
      </div>
    </div>
  }
}
