import React from 'react';
import moment from 'moment'
import {
  DatePicker,
  Button,
} from 'antd'
const {RangePicker} = DatePicker

export default class DatePickerMonthSelectionFDEUnsubscribe extends React.Component {
  state = {
    mode: ['month', 'month'],
    value: [],
  };
  makeApiCall = () => {
    const {fetchEmailUnsubscribeAnalysis, user: {_id: userId}} = this.props;
    const {value} = this.state;
    if (value.length == 2) {
      // fetchEmailUnsubscribeAnalysis()
      let start = value[0].format('YYYY-MM')
      let end = value[1].format('YYYY-MM')
      let param = `&start_date=${start}&end_date=${end}`
      fetchEmailUnsubscribeAnalysis(userId, param);
    }else {
      fetchEmailUnsubscribeAnalysis(userId);
    }
  }

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }

  render() {
    const { value, mode, filter_items} = this.state;
    const {title} =  this.props;
    return (
      <div>
        <h2>{title}</h2>
        <div className="d-flex">
          <RangePicker
            placeholder={['Start month', 'End month']}
            ranges={{ 'This Month': [moment().subtract(31, 'days'), moment()], 'Last 3 Months': [moment().subtract(3, 'months'), moment()], 'Last 6 Months': [moment().subtract(6, 'months'), moment()] , 'Last 1 Year': [moment().subtract(1, 'year'), moment()] }}
            format="YYYY-MM"
            value={value}
            mode={mode}
            onPanelChange={this.handlePanelChange}
            onChange={(date, dateString) => this.setState({value: date})}
          />
          <Button
          className='ml-2'
          onClick={() => this.makeApiCall()}
          >
          Fetch
          </Button>
        </div>
      </div>
    );

  }
}

