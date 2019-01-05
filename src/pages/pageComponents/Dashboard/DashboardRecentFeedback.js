import React, { Component } from 'react';
import {
  Popover,
  Rate,
} from 'antd'
import moment from 'moment'
import * as Functions from '../../pageData/Functions.js'

export default class DashboardRecentFeedback extends Component {

  generateUniqueFeedback = (arr) => {
    let newArr = [];
    arr.forEach(obj => {
      let isFound = newArr.find(objNew => objNew.link == obj.link)
      if (!isFound) {
        newArr.push(obj);
      }
    })
    return newArr;
  }

  generateTdData = (feedback, key) => {
    let content = feedback[key]
    return Functions.generatePopover(content, 100)
  }



  generateRecentFeedback = () => {
      let {feedbacks} = this.props
      if(feedbacks == undefined) return false;
      feedbacks = feedbacks.sort((a, b) => {
      let c = moment(a.date, 'YYYY/MM/dd');
      let d = moment(b.date, 'YYYY/MM/dd');
      return new Date(d) - new Date(c)
    })
    let uniqueFeedbacks = this.generateUniqueFeedback(feedbacks)
    let table = <table className="table">
      <thead>
        <tr>
          <th style={{minWidth: 100}} >Date</th>
          <th>Product</th>
          <th>title</th>
          <th style={{minWidth: 160}}>Rating</th>
          <th>Review</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
      {
        uniqueFeedbacks.map((feedback, key) => <tr key={key}>
          <td>{Functions.formateDate(feedback.date)}</td>
          <td>{this.generateTdData(feedback, 'product_title')}</td>
          <td>{this.generateTdData(feedback, 'comment')}</td>
          <td>
            <div>{Functions.genRating(feedback.rating)}</div>
          </td>
          <td>{this.generateTdData(feedback, 'title')}</td>
          <td>{feedback.author}</td>
        </tr>)
      }
      </tbody>
    </table>
    return <div className="table-responsive">{table}</div>;
  }

  render() {
      return (
        <div className="card">
          <div className="card-header">
            <h2>Most Recent Feedback</h2>
          </div>
          <div className="card-body">
            {this.generateRecentFeedback()}
          </div>
      </div>
      )
  }
}
