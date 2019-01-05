import React, { Component } from 'react';
import * as Functions from '../../pageData/Functions.js'
import ids from 'short-id'
import {
  Rate,
  Table,
  Popover,
} from 'antd'


const defaultPagination = {
  pageSizeOptions: ["50", "100", "250"],
  showSizeChanger: true,
  current: 1,
  size: "small",
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
};


export default class ProductTable extends Component {
  state = {
    pager: { ...defaultPagination },
  }
  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager };
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize;
        pager.pageSize = pagination.pageSize;
        pager.current = 1;
      } else {
        pager.current = pagination.current;
      }
      this.setState({
        pager: pager
      });
    }
  }

  render() {
    let { pager} = this.state;
    let imageStyle = {
      maxWidth: 100,
      maxHeight: 100,
      width: 'auto',
      height: 'auto',
    }
    const columns = [
      {
        title: "ASIN",
        dataIndex: "asin1",
        key: "asin1",
        render: text => <div style={{width: 100}}>{text}</div>,
        // sorter: (a, b) => a.asin1 - b.asin1
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: text => <div style={{width: 50}}>{text}</div>,
        // sorter: (a, b) => a.status - b.status
      },
      {
        title: "Open Date",
        dataIndex: "open_date",
        key: "open_date",
        render: text => <div style={{width: 100}}>{Functions.formateDate(text)}</div>,
        // sorter: (a, b) => a.open_date - b.open_date
      },
      {
        title: "Title",
        dataIndex: "item_name",
        key: "item_name",
        // sorter: (a, b) => a.item_name - b.item_name,
        render: (text, row) =>
        <div style={{width: 300}}>
          <div className="d-flex">
            <img className="mr-2" style={imageStyle} src={row.image_url} alt=""/>
            <span className="product_title">{Functions.generatePopover(text, 130)} </span>
          </div>
        </div>
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        className: "rating_data",
        render: text => (
          <div style={{width: 145}} className="rating_star">
            {Functions.genRating(text)}
          </div>)
      },
      {
        title: "Pen Name",
        dataIndex: "pen_name",
        key: "pen_name",
        className: "pen_name_data",
        render: text => <div style={{width: 100}}>{text}</div>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
        render: text => <div style={{width: 100}}>{text ? `$${text}`: ''}</div>,

      },

    ];
    return (
      <div>
       <Table
          columns={columns}
          dataSource={this.props.products}
          rowKey={record => ids.generate()}
          pagination={pager}
          onChange={this.handleTableChange}
          loading={this.props.loading}
          scroll={{ x: 1000 }}
          />
      </div>
    );
  }
}
