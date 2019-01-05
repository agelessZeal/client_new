import React from 'react';
import moment from 'moment'
import {
  DatePicker,
  Button,
  message,
  Select,
} from 'antd'

import pageData from '../../pageData/'

const { Option, OptGroup } = Select;




const {RangePicker} = DatePicker

let allFilters = pageData.filteringOptions.map( (option, i) =>
    <OptGroup key={i} label={option.title}>
      {
        option.keys.map((op, j) =>
          <Option key={op.value} value={op.value}>{op.title}</Option>
        )
      }
    </OptGroup>
  )

export default class DatePickerMonthSelectionAndOrderFilter extends React.Component {
  state = {
    mode: ['month', 'month'],
    value: [],
    filter_items: [],
  };
  makeApiCall = () => {
    const {fetchOrderAnalysis, userId} = this.props;
    const {value, filter_items} = this.state;
    if (value.length == 2) {
      let start_date = value[0].format('YYYY-MM')
      let end_date = value[1].format('YYYY-MM')
      // let param = `?start_date=${start}&end_date=${end}`
      let payload = {
        start_date,
        end_date,
        filter_items,
        userId,
      }
      fetchOrderAnalysis(payload);
    }else {
      fetchOrderAnalysis({
        filter_items,
        userId,
      });
      // message.warning('Please select start and end month')
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

  filterItemChange = values => {
    this.setState({ filter_items: values });
  }

  render() {
    const { value, mode, filter_items} = this.state;
    const {title} =  this.props;
    return (
      <div>
        <h2>{title}</h2>
        <div>
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

