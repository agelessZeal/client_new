import React, { Component } from "react";
import { Link } from "react-router-dom";
import ids from 'short-id'
import {
  Table,
  Select,
  Button,
  Form,
  Modal,
  Tooltip,
  Icon,
} from "antd";
import { connect } from "react-redux";
import {
  fetchTemplates,
  tCreationSubmit,
  tModifySubmit,
  tDeleteSubmit,
  sendTestMail,
  toggleTemplateStatus,
} from "./../../../ducks/template";
import {fetchOrders} from '../../../ducks/order.js'
import {getUser} from '../../../ducks/dashboard'


import "./style.scss";
import TemplateTable from '../../pageComponents/Template/TemplateTable'


const Option = Select.Option;
const confirm = Modal.confirm;


const defaultPagination = {
  pageSizeOptions: ["20", "50", "100"],
  showSizeChanger: true,
  current: 1,
  size: "small",
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
};


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
  templates: state.template.templates,
  orders: state.order.orders,
  templateLoader: state.template.templateLoader,
  templateStatusLoader: state.template.templateStatusLoader,
});


const mapDispatchToProps = (dispatch, props) => ({
  fetchTemplates: userId => dispatch(fetchTemplates(userId)),
  user: getUser(),
  fetchOrders: userId => dispatch(fetchOrders(userId)),
  templateCreateSubmit: values => dispatch(tCreationSubmit(values)),
  templateModifySubmit: values => dispatch(tModifySubmit(values)),
  deleteModifySubmit: id => dispatch(tDeleteSubmit(id)),
  sendTestMail: templateID => dispatch(sendTestMail(templateID)),
  toggleTemplateStatus: payload => dispatch(toggleTemplateStatus(payload)),
});


@connect(mapStateToProps, mapDispatchToProps)


class TemplateComponents extends React.Component {

  componentDidMount () {
    const {fetchOrders, fetchTemplates, user: {_id: userId}} = this.props
    fetchOrders(userId)
    fetchTemplates(userId)
  }
  state = {
    data: [],
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    createTemplateVisible: false,
    confirmLoadingCTemplate: false,
    deteteTemplateId: "",
    showTemplatePreview: false,
    filter_items: [],
    toggleStatusTemplateId: null,
  };
  render() {

    return (
      <div className="card">
        <div className='card-header'>
          <Button type='primary'>
            <Link to="/templates/create">Create Template</Link>
          </Button>
        </div>
        <div className="card-body">
          <TemplateTable
              orders={this.props.orders}
              user={this.props.user}
              templates={this.props.templates}
              sendTestMail={this.props.sendTestMail}
              templateLoader={this.props.templateLoader}
              toggleTemplateStatus={this.props.toggleTemplateStatus}
              templateStatusLoader={this.props.templateStatusLoader}
           />
        </div>
      </div>
    );
  }
}

// export default templates
const Template = Form.create()(TemplateComponents);
export default Template;
