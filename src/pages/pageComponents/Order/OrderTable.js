import React, { Component } from 'react'
import {
  Table,
} from 'antd'

import * as Functions from '../../pageData/Functions.js'
import ids from 'short-id'
import SendMailToOrdererModal from '../../pageComponents/Order/SendMailToOrdererModal'

const defaultPagination = {
  pageSizeOptions: ['50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
}
export default class OrderTable extends Component {
  state = {
    pager: { ...defaultPagination },
  }
  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager }
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize
        pager.pageSize = pagination.pageSize
        pager.current = 1
      } else {
        pager.current = pagination.current
      }
      this.setState({
        pager: pager,
      })
    }
  }
  render() {

    const {pager} = this.state
    const columns = [
      {
        title: <div style={{minWidth: 50}} >Type</div>,
        dataIndex: 'FulfillmentChannel',
        key: ids.generate(),
          className: 'order_type',
        render: text => (
          <div className={'b_type ' + text}>
            {text}
          </div>
        ),
      },
      {
          title: <div style={{minWidth: 100}} >Order Date</div>,
          dataIndex: 'PurchaseDate',
          key: ids.generate(),
          className: 'order_date',
          render: text => <span>{Functions.formateDate(text)}</span>,
      },
      {
        title: <div style={{minWidth: 80}}>Order ID</div>,
        dataIndex: 'AmazonOrderId',
        key: ids.generate(),
        sorter: (a, b) => a.AmazonOrderId - b.AmazonOrderId,
          render: order_id => <a href={'https://sellercentral.amazon.com/hz/orders/details?_encoding=UTF8&orderId=' + order_id} target={'_blank'}>{order_id}</a>
      },
      {
        title: <div style={{minWidth: 80}}>Buyer</div>,
        dataIndex: 'BuyerName',
        key: ids.generate(),
      },
      {
        title: <div style={{minWidth: 200}}>Product Details</div>,
        dataIndex: 'orderItem',
        key: ids.generate(),
        className: 'product_details',
        render: (text, row) => text.map((tx, i)=> {

          let product_details = <div className="d-flex align-items-center justify-content-center" key={i}>
            <div>
              <div className="title">{tx && tx.title? Functions.textTruncate(tx.title, 60) :''}</div>
              <div>
                <span className="qty"><b>QTY:</b> {tx.qty}</span><span className="price"><b>PRICE:</b> {tx.price}</span>
              </div>

              <div className="asin"><b>ASIN:</b> {tx.asin}</div>
              <div className="sku"><b>SKU:</b> {tx.sku}</div>
            </div>
          </div>
          let html = <div className="d-flex align-items-center justify-content-center" key={i}>
            <div>
              <div className="title">{tx && tx.title? tx.title :''}</div>
              <div>
                <span className="qty"><b>QTY:</b> {tx.qty}</span><span className="price"><b>PRICE:</b> {tx.price}</span>
              </div>

              <div className="asin"><b>ASIN:</b> {tx.asin}</div>
              <div className="sku"><b>SKU:</b> {tx.sku}</div>
            </div>
          </div>

          return Functions.generatePopoverAlreadyTruncate(product_details, html)

        })
      },
      {
        title: <div style={{minWidth: 60}}>Status</div>,
        dataIndex: 'OrderStatus',
        key: ids.generate(),
        className: 'order_status',
        sorter: (a, b) => a.OrderStatus - b.OrderStatus,
      },
      {
        title: <div style={{minWidth: 100}}> Number of email sent</div>,
        dataIndex: 'number_of_email_sent',
        key: ids.generate(),
        className: 'number_of_email_sent',
      },
      {
        title: <div style={{minWidth: 100}} >Action</div>,
        dataIndex: "AmazonOrderId",
        key: ids.generate(),
        render: (amazonOrderId, rowData) => <SendMailToOrdererModal
          templates={this.props.templates}
          buyerEmail={rowData.BuyerEmail}
          rowData={rowData}
          userId={this.props.userId}
          sendMailToOrderer={this.props.sendMailToOrderer}
          orders={this.props.orders}
          orderId={amazonOrderId} />
      },
    ]
    return (
      <div>
          <Table
            columns={columns}
            scroll={{ x: 1000 }}
            dataSource={this.props.orders}
            rowKey={record => ids.generate()}
            pagination={pager}
            onChange={this.handleTableChange}
            loading={this.props.loading}
          />

      </div>
    )
  }
}
