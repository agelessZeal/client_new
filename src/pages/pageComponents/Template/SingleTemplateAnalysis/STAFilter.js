import React from 'react';
import moment from 'moment'
import {
  DatePicker,
  Button,
} from 'antd'
const {RangePicker} = DatePicker

export default class STAFilter extends React.Component {
  state = {
    mode: ['month', 'month'],
    value: [],
  };
  makeApiCall = () => {
    const {fetchSingleTemplateAnalysis, templateId, userId} = this.props;
    const {value} = this.state;
    if (value.length == 2) {
      let start_date = value[0].format('YYYY-MM')
      let end_date = value[1].format('YYYY-MM')
      let payload = {
        templateId,
        start_date,
        end_date,
        userId,
      }
      fetchSingleTemplateAnalysis(payload)
    }else {
      let payload = {templateId, userId}
      fetchSingleTemplateAnalysis(payload)
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

