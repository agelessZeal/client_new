import React, { Component } from 'react';
import * as Functions from '../../pageData/Functions.js'
import ids from 'short-id'
import SendFeedbackRemovalRequestModal from '../../pageComponents/Feedback/SendFeedbackRemovalRequestModal.js'
import {
  Table,

} from 'antd'

const defaultPagination = {
  pageSizeOptions: ["50", "100", "250"],
  showSizeChanger: true,
  current: 1,
  size: "small",
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
};

export default class FeedbackTable extends Component {
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
  generateUniqueFeedback = (arr) => {
    let newArr = [];
    arr.forEach(objRegular => {
      let isFound = newArr.find(objNew => objNew.feedback.title == objRegular.feedback.title)
      if (!isFound) {
        newArr.push(objRegular);
      }
    })
    return newArr;
  }


  render() {
    const {pager} = this.state;
    let feedbacks = this.generateUniqueFeedback(this.props.feedbacks)
    const columns = [
      {
        title: "Number",
        dataIndex: "order_id",
        key: "order_id",
        className: "order_id",
        render: text => (<div style={{minWidth: 150}}>
              {(text)}
        </div>)
      },
      {
        title: "Product Info",
        dataIndex: "product_info",
        key: "product_info",
        className: "product_info",
        render: text => (<div style={{minWidth: 250}} className="product_details">
          <span className={"product_title"}>{Functions.generatePopover(text.title, 100)}</span>
        </div>)
      },
      {
        title: "Review Date",
        dataIndex: "date",
        key: "date",
        className: "feedback_date",
        sorter: (a, b) => {
          let c = new Date(a.date)
          let d = new Date(b.date)
          return d-c;
        },
        render: text => <div style={{minWidth: 100}}>{Functions.formateDate(text)}</div>
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        className: "author",
        render: text => <div style={{minWidth: 100}}>{text}</div>
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        className: "rating_data",
        render: text => (
          <div style={{minWidth: 140}} className="rating_star">{Functions.genRating(text)}</div>)
      },
      {
        title: "Review Details",
        dataIndex: "feedback",
        key: "feedback",
        className: "feedback_details",
        render: text => {
          let {title, details} = text;

          let content = <div>
            <h3>{title}</h3>
            <p>{details}</p>
          </div>

          let titleDetails = `- ${title} - ${details}`;
          return <div style={{minWidth: 250}} className="feedback_details">{Functions.generatePopover(titleDetails, 100, content)}</div>
        }
      },
      {
        title: <div style={{minWidth: 120}}>Removal feedback request sent</div>,
        dataIndex: "feedback",
        key: ids.generate(),
        render: feedback => {
          const {remove_request} = feedback;
          return Number(remove_request) === 0 ? <span className='text-danger'>---</span> : <span className='text-success'>Sent</span>
        }
      },
      {
        title: "Action",
        dataIndex: "feedback",
        key: ids.generate(),
        render: (feedback, rowData) => <SendFeedbackRemovalRequestModal
          templates={this.props.templates.filter(template => template.template_type === 'remove_feedback_request')}
          rowData={rowData}
          userId={this.props.userId}
          removeFeedbackRequest={this.props.removeFeedbackRequest}
          feedback={feedback} />
      },
    ]
    return (
      <div>
          <Table
            columns={columns}
            dataSource={feedbacks}
            rowKey={record => ids.generate()}
            pagination={pager}
            onChange={this.handleTableChange}
            loading={this.props.loading}
            scroll={{x: 1000}}
          />
      </div>
    );
  }
}
