import React from "react";
import {
  Table,
  Icon,
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
  Rate,
  Menu,
  Dropdown,
  notification,
  Modal,
  Row,
  Col,
  Alert,
} from "antd";
import cookie from "react-cookie";
import moment from "moment";
import { connect } from "react-redux";
import {
  fetchFeedback,
  requestForUpdateFeedback,
  fetchFeedbackFilters,
  removeFeedbackRequest,
} from "./../../../ducks/feedback";
import { fetchUser } from "./../../../ducks/index";
import {fetchTemplates} from './../../../ducks/template';
import { setLoading } from "./../../../ducks/app";
import "./style.scss";
import { REDUCER, submit } from "../../../ducks/profile";
import {getUser} from '../../../ducks/dashboard.js'
import pageData from "../../pageData";
import ids from 'short-id'
import SendFeedbackRemovalRequestModal from '../../pageComponents/Feedback/SendFeedbackRemovalRequestModal'
import * as Functions from '../../pageData/Functions.js'
import FeedbackTable from '../../pageComponents/Feedback/FeedbackTable.js'

const RangePicker = DatePicker.RangePicker;
const { Option, OptGroup } = Select;
const confirm = Modal.confirm;

let allFilters = pageData.filteringOptionsFeedback.map((option, i) =>
  <OptGroup key={i} label={option.title}>
    {
      option.keys.map((op, j) =>
        <Option key={op.title} value={op.value}>{op.title}</Option>
      )
    }
  </OptGroup>
);

const children = [];
let optionKeys = [{ key: "AFN", value: "AFN" }, { key: "MFN", value: "MFN" }, { key: "Shipped", value: "Shipped" },
  { key: "Pending", value: "Pending" }, { key: "Unshipped", value: "Unshipped" },
  { key: "Delivered", value: "Delivered" }, { key: "Canceled", value: "Canceled" }, {
    key: "Returned",
    value: "Returned"
  }];
for (let i = 0; i < optionKeys.length; i++) {
  children.push(<Option key={optionKeys[i].key}>{optionKeys[i].value}</Option>);
}


const mapStateToProps = (state, props) => ({
  feedbacks: state.feedback.feedbacks,
  feedbacksLoader: state.feedback.feedbacksLoader,
  templates: state.template.templates,
  totalNeutralFeedback: state.feedback.totalNeutralFeedback,
  totalNegativeFeedback: state.feedback.totalNegativeFeedback,
  totalFeedbackRequestRemoval: state.feedback.totalFeedbackRequestRemoval,
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchFeedback: userId => dispatch(fetchFeedback(userId)),
  fetchTemplates: userId => dispatch(fetchTemplates(userId)),
  getUpdateFeedback: (userId) => dispatch(requestForUpdateFeedback(userId)),
  fetchFeedbackFilters: filter => dispatch(fetchFeedbackFilters(filter)),
  removeFeedbackRequest: payload => dispatch(removeFeedbackRequest(payload)),
  user: getUser(),
});

@connect(mapStateToProps, mapDispatchToProps)

export default class Feedback extends React.Component {
  componentDidMount() {
    const {fetchFeedback, fetchTemplates, user: {_id: userId}} = this.props
    fetchFeedback(userId)
    fetchTemplates(userId)

  }

  state = {
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
  };

  onClickFilterSearch = e => {
    const { date_start, date_end, filter_items } = this.state;
    const {user: {_id: userId}} = this.props
    let filter_data = this.props.fetchFeedbackFilters({ date_start, date_end, filter_items, userId });

  };

  onDatePickerChange = (date, dateString) => {
    if (dateString && dateString.length) {
      this.setState({ date_start: dateString[0], date_end: dateString[1] });
    }
  };

  filterItemChange = values => {
    this.setState({ filter_items: values });
  };


  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };

  setFeedbackProduct = (e) => {
    const self = this;
    confirm({
      title: "Are you sure to sent request to get report?",
      content: "It will sent a request to MWS for get product feedback, after getting the feedback will store on the database",
      onOk() {
        const {getUpdateFeedback, user:{_id: userId}} = self.props
        getUpdateFeedback(userId);
        setTimeout(function() {
          notification.open({
            message: "feedback Report",
            description: "A report requested sent to MWS to get updated feedback, It will take around few minutes to get update"
          });
        }, 2000);
      },
      onCancel() {
        // console.log("Cancel");
      }
    });
  };

  _generateDescription = (number, label) =>  number > 1 ? `You have ${number} ${label}s` : `You have ${number} negative ${label}`

  sendRemovalReq = (feedback, rowData) => {
    console.log('rowData', rowData);
    console.log('text', feedback)
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <Row>

          {
            this.props.totalNegativeFeedback ?
            <Col span={8}>
              <div className="filter_area mr-2 my-2">
                <Alert
                  message="Negative Feedback"
                  description={this._generateDescription(this.props.totalNegativeFeedback, 'negative feedback')}
                  type="error"
                  closable
                />
              </div>
            </Col>
            : null
          }
          {
            this.props.totalNeutralFeedback ?
            <Col span={8}>
              <div className="filter_area ml-2 my-2">
                <Alert
                  message="Neutral Feedback"
                  description={this._generateDescription(this.props.totalNeutralFeedback, 'neutral feedback')}
                  type="info"
                  closable
                />
              </div>
            </Col>
            : null
          }
          {
            this.props.totalFeedbackRequestRemoval ?
            <Col span={8}>
              <div className="filter_area ml-2 my-2">
                <Alert
                  message="Feedback Request Removal"
                  description={this._generateDescription(this.props.totalFeedbackRequestRemoval, 'feedback removal request - currently hard coded')}
                  type="warning"
                  closable
                />
              </div>
            </Col>
            : null
          }
          </Row>

          <div className="filter_area">
            <div className="filter_submit_btn">
              <Button type="primary" onClick={this.setFeedbackProduct}><i className="icmn-cogs mr-1"/> Generate Report To Get Updated Feedback</Button>
            </div>
          </div>
          <div className="filter_area d-md-flex">
              <div className="date_picker_area m-2">
                  <RangePicker
                      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')], 'Last 3 Months': [moment().subtract(3, 'months'), moment()], 'Last 6 Months': [moment().subtract(6, 'months'), moment()] , 'Last 1 Year': [moment().subtract(1, 'year'), moment()] }}
                      format="YYYY/MM/DD"
                      onChange={this.onDatePickerChange}
                  />
                  <br />
              </div>
              <div className="filter_selection m-2" style={{minWidth: 250}} >
                  <Select
                      mode="multiple"
                      size="default"
                      placeholder="Please select fields to filter"
                      onChange={this.filterItemChange}
                      style={{ width: '100%' }}>
                      {allFilters}
                  </Select>
              </div>
              <div className="filter_submit_btn m-2">
                  <Button type="primary" onClick={this.onClickFilterSearch}>Search</Button>
              </div>
          </div>

          <FeedbackTable
            feedbacks={this.props.feedbacks}
            loading={this.props.feedbacksLoader}
            templates={this.props.templates}
            userId={this.props.user._id}
            removeFeedbackRequest={this.props.removeFeedbackRequest}
          />
        </div>
      </div>
    );
  }
}

