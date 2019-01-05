import React, { Component } from 'react';

import {
  Row,
  Col,
  Button,
  Card,
  Icon,
  DatePicker,
  message,
} from 'antd'
import moment from 'moment'

const RangePicker = DatePicker.RangePicker;

export default class DashboardGlobalFilter extends Component {
  state = {
    date_start: null,
    date_end: null,
  }

  onDatePickerChange = (date, dateString) => {
      if(dateString && dateString.length){
          this.setState({ date_start: dateString[0], date_end: dateString[1] });
      }
  }

  onClickFilterSearch = e => {
      const {apiFn, userId} = this.props
      const {date_start, date_end} = this.state;
      if (date_start && date_end ) {
        apiFn({date_start, date_end, userId})
      } else {
        message.warning('Please Select start and end date first')
      }
  }

  render() {
    return (
      <div className="mb-4">
        <Card title='Filter'>
          <RangePicker
              className="mr-2"
              ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')], 'Last 3 Months': [moment().subtract(3, 'months'), moment()], 'Last 6 Months': [moment().subtract(6, 'months'), moment()] , 'Last 1 Year': [moment().subtract(1, 'year'), moment()] }}
              format="YYYY/MM/DD"
              onChange={this.onDatePickerChange}
          />
          <Button type="primary" onClick={this.onClickFilterSearch}>Search</Button>
        </Card>
      </div>
    );
  }
}
