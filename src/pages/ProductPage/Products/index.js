import React from "react";
import {
  Table,
  Icon,
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
  notification,
  Alert,
  Modal,
  Rate,
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import tableData from "./data.json";
import { fetchProducts, requestForUpdateReport, fetchProductFilters } from "./../../../ducks/product";
import {getUser} from '../../../ducks/dashboard'
import { setLoading } from "./../../../ducks/app";
import "./style.scss";
import { REDUCER, submit } from "../../../ducks/profile";
import pageData from "../../pageData";
import ReactSelect from 'react-select'
import Animated from 'react-select/lib/animated';
import ProductTable from '../../pageComponents/Product/ProductTable.js'

const RangePicker = DatePicker.RangePicker;
const { Option, OptGroup } = Select;
const confirm = Modal.confirm;

let fulfillmentNetworkOptions = [
  {
    label: "AFN",
    value: "AFN",
    key: "fulfillment_channel",
  },
  {
    label: "MFN",
    value: "MFN",
    key: "fulfillment_channel",
  }
]
let emailStatusOptions = [
  {
    label: 'Has Sent',
    value:  'Has Sent',
    key: 'email_status',
  },
  {
    label: 'None Sent',
    value:  'none Sent',
    key: 'email_status',
  },
  {
    label: 'Is Queued',
    value:  'is queued',
    key: 'email_status',
  },
  {
    label: 'None Queued',
    value:  'None Queued',
    key: 'email_status',
  },
]
const options = [
  {
    label: 'Fulfillment Network',
    options: fulfillmentNetworkOptions,
  },
  {
    label: 'Email Status',
    options: emailStatusOptions,
  }
]
 let reactSelectForFutureUse = `<div className="filter_area">
            <ReactSelect
              onChange={(selectedOption) => this.setState({selectedOption})}
              isMulti
              value={this.state.selectedOption}
              options={options}
            />
          </div>`



let allFilters = pageData.filteringOptionsProduct.map((option, i) =>
  <OptGroup key={i} label={option.title}>
    {
      option.keys.map((op, j) =>
        <Option key={op.value} value={op.value}>{op.title}</Option>
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
  products: state.product.products,
  user: getUser(),
  productsLoader: state.product.productsLoader,
  totalNegativeReview: state.product.totalNegativeReview,
});

//when click Generate report button.
const mapDispatchToProps = (dispatch, props) => ({
  fetchProducts: userId => dispatch(fetchProducts(userId)),
  getUpdateProduct: userId => {
    console.log("getUpdateProduct");
    // from aws with mws token  ProductController.requestReport in server
    dispatch(requestForUpdateReport(userId));
    setTimeout(function () {
      dispatch(fetchProducts(userId));
    }, 40000);
  },
  fetchProductFilters: filter => dispatch(fetchProductFilters(filter))
});


@connect(mapStateToProps, mapDispatchToProps)

class Orders extends React.Component {

  componentWillMount() {
    // Fetch inbox (conversations involving current user)
    // setLoading(true);
  }
  componentDidMount () {
    const {fetchProducts, user: {_id: userId}} = this.props;
    fetchProducts(userId)
  }

  state = {
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    loading: true,
    selectedOption: null,
    productName: '',
  };

  setUpdatedProduct = (e) => {
    const self = this;
    confirm({
      title: "Are you sure to sent request to get report?",
      content: "It will sent a request to MWS for get products, after getting the product will store on the database",
      onOk() {
        const {getUpdateProduct, user:{_id: userId}} = self.props
        getUpdateProduct(userId);
        setTimeout(function() {
          notification.open({
            message: "Product Report",
            description: "A report requested sent to MWS to get updated products, It will take around few minutes to get update"
          });
        }, 2000);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  onClickFilterSearch = e => {
    const { date_start, date_end, filter_items, productName } = this.state;
    const {user: {_id: userId}} = this.props
    let filter_data = this.props.fetchProductFilters({ date_start, date_end, filter_items, product_name: productName, userId });

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


  _generateNegativeReviewDescription = numberOfNReview =>  numberOfNReview > 1 ? `You have ${numberOfNReview} negative reviews` : `You have ${numberOfNReview} negative review`


  render() {
    console.log('this.props', this.props)
    let { productName } = this.state;

    return (
      <div className="card">
        <div className="card-body">
        {
          this.props.totalNegativeReview ?
          <div className="filter_area mb-2">
            <Alert
              message="Negative Reviews"
              description={this._generateNegativeReviewDescription(this.props.totalNegativeReview)}
              type="error"
              closable
            />
          </div> : null
        }
          <div className="filter_area">
            <div className="filter_submit_btn">
              <Button type="primary" onClick={this.setUpdatedProduct}><i className="icmn-cogs mr-1"/> Generate Report To Get Updated Product</Button>
            </div>
          </div>


          <div className="filter_area d-md-flex">
            <div className="date_picker_area m-2">
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [moment(), moment().endOf("month")],
                  "Last 3 Months": [moment().subtract(3, "months"), moment()],
                  "Last 6 Months": [moment().subtract(6, "months"), moment()],
                  "Last 1 Year": [moment().subtract(1, "year"), moment()]
                }}
                format="YYYY/MM/DD"
                onChange={this.onDatePickerChange}
              />
              <br/>
            </div>
            <div className="filter_selection m-2" style={{ minWidth: 250 }}>
              <Select
                mode="multiple"
                size="default"
                placeholder="Please select fields to filter"
                onChange={this.filterItemChange}
                style={{ width: "100%" }}>
                {allFilters}
              </Select>
            </div>

            <div className="filter_input m-2">
              <Input
                value={productName}
                onChange={(e) => this.setState({productName: e.target.value}) }
                placeholder="Enter Product name to search"
               />
            </div>

            <div className="filter_submit_btn m-2">
              <Button type="primary" onClick={this.onClickFilterSearch}>Search</Button>
            </div>
          </div>

          <ProductTable
            products={this.props.products}
            loading={this.props.productsLoader}
           />
        </div>
      </div>
    );
  }
}


export default Orders;
