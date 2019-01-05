import React from 'react'
import {
  Input,
  Button,
  DatePicker,
  message,
  Select,
} from 'antd'
import moment from 'moment';
import Fuse from 'fuse.js'
import { connect } from 'react-redux'
import tableData from './data.json'
import pageData from '../../pageData'
import ids from 'short-id'
import cookie from "react-cookie";
import {
  fetchOrders,
  fetchFilteredOrders,
  sendMailToOrderer,
} from './../../../ducks/order'
import {setLoading} from './../../../ducks/app'
import { fetchUser } from "./../../../ducks/index";
import {fetchTemplates} from './../../../ducks/template';
import {getUser} from '../../../ducks/dashboard'
import './style.scss'
import OrderTable from '../../pageComponents/Order/OrderTable.js'
const RangePicker = DatePicker.RangePicker;
const { Option, OptGroup } = Select;




let allFilters = pageData.filteringOptions.map( (option, i) =>
    <OptGroup key={i} label={option.title}>
      {
        option.keys.map((op, j) =>
          <Option key={op.value} value={op.value}>{op.title}</Option>
        )
      }
    </OptGroup>
  )

// const children = [];
// let optionKeys = [{key: "AFN", value: "AFN"},{key: "MFN", value: "MFN"},{key: "Shipped", value: "Shipped"},
//     {key: "Pending", value: "Pending"},{key: "Unshipped", value: "Unshipped"},
//     {key: "Delivered", value: "Delivered"},{key: "Canceled", value: "Canceled"},{key: "Returned", value: "Returned"}];
// for ( let i = 0; i < optionKeys.length; i++ ) {
//     children.push(<Option key={optionKeys[i].key}>{optionKeys[i].value}</Option>);
// }

// const orderData = fetchOrders();


const mapStateToProps = (state, props) => ({
  orders: state.order.orders,
  ordersLoader: state.order.ordersLoader,
  orderEmailSentMsg: state.order.orderEmailSentMsg,
  templates: state.template.templates,
})


const mapDispatchToProps = (dispatch, props) => ({
  user: getUser(),
  fetchOrders: userId => dispatch(fetchOrders(userId)),
  fetchTemplates: userId => dispatch(fetchTemplates(userId)),
  fetchUser: uiid => dispatch(fetchUser(uiid)),
  sendMailToOrderer: (values) => dispatch(sendMailToOrderer(values)),
  filterOrder: filter => dispatch(fetchFilteredOrders(filter)),
})



@connect(mapStateToProps, mapDispatchToProps)

class Orders extends React.Component {

  componentDidMount() {
    const {fetchOrders, fetchTemplates, user: {_id: userId}, } = this.props
    fetchOrders(userId);
    fetchTemplates(userId)
  }

  state = {
    orderIdSearchText: '',
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    loading: true,
    emailSendLoader: false,
    emailSendOrderId: '',
  }

    onClickFilterSearch = e => {
        const {date_start, date_end, filter_items} = this.state;
        const {user: {_id: userId}} = this.props;
        console.log('userId', userId)
        let filter_data = this.props.filterOrder({date_start, date_end, filter_items, userId});
        this.setState({ loading: true });
    }

    onDatePickerChange = (date, dateString) => {
        if(dateString && dateString.length){
            this.setState({ date_start: dateString[0], date_end: dateString[1] });
        }
    }

    filterItemChange = values => {
        this.setState({ filter_items: values });
    }


    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    let reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          let match = record.name.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
              name: (
              <span>
                {record.name
                  .split(reg)
                  .map(
                    (text, i) =>
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }


  render() {
    let {
      orderIdSearchText,
      emailSendLoader,
      emailSendOrderId,
    } = this.state;
    let orders = this.props.orders

    if (orderIdSearchText) {
      let fuseOptions = {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "AmazonOrderId"
        ]
      }
      let fuse = new Fuse(orders, fuseOptions); // "list" is the item array
      orders = fuse.search(orderIdSearchText);
    }

    // data = data.filter(o => o.AmazonOrderId.includes(orderIdSearchText))

    return (
      <div className="card">
        <div className="card-header">
            <div className="filter_area">
                <div className="date_picker_area">
                    <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')], 'Last 3 Months': [moment().subtract(3, 'months'), moment()], 'Last 6 Months': [moment().subtract(6, 'months'), moment()] , 'Last 1 Year': [moment().subtract(1, 'year'), moment()] }}
                        format="YYYY/MM/DD"
                        onChange={this.onDatePickerChange}
                    />
                    <br />
                </div>
                <div className="filter_selection">
                    <Select
                        mode="multiple"
                        size="default"
                        placeholder="Please select fields to filter"
                        onChange={this.filterItemChange}
                        style={{ width: '100%' }}>
                        {allFilters}
                    </Select>
                </div>
                <div className="filter_submit_btn">
                    <Button type="primary" onClick={this.onClickFilterSearch}>Search</Button>
                </div>
            </div>
        </div>
        <div className="card-body">
          <div>
            <Input
              value={orderIdSearchText}
              onChange={e => this.setState({orderIdSearchText: e.target.value})}
              className="my-2 col-md-6"
              placeholder='Search by order Id' />
          </div>
          <OrderTable
            orders={orders}
            loading={this.props.ordersLoader}
            userId={this.props.user._id}
            sendMailToOrderer={this.props.sendMailToOrderer}
            templates={this.props.templates}
           />
        </div>
      </div>
    )
  }
}

export default Orders;
