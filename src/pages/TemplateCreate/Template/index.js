import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import cookie from "react-cookie";
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import * as Functions from '../../pageData/Functions.js'

import {
  Table,
  Button,
  Input,
  message,
  DatePicker,
  Select,
  Steps,
  Form,
  Dropdown,
  Modal,
  Row,
  Col,
  TimePicker,
  Upload,
  Icon,
  Spin,
} from "antd";
import { fetchTemplates, tCreationSubmit, tModifySubmit, tDeleteSubmit } from "./../../../ducks/template";
import {getUser} from '../../../ducks/dashboard'
import { fetchOrders } from "./../../../ducks/order";
import { fetchProducts } from "./../../../ducks/product";
import pageData from '../../pageData'
import "./style.scss";

// Editor Draft js
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomOptionsForDraftEditor from '../../pageComponents/Template/CustomOptionsForDraftEditor'

const Step = Steps.Step;


const RangePicker = DatePicker.RangePicker;
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;

const spinStyle = {
  textAlign: `center`,
  background: `rgba(0,0,0,0.05)`,
  borderRadius: 4,
  marginBottom: 20,
  padding: `30px 50px`,
  margin: `20px 0`,
}

const editorWrapperStyle = {
  fontSize: 16,
  lineHeight: 1,
}

const steps = [{
  title: "Template"
}, {
  title: "Campaign"
}];


const defaultPagination = {
  pageSizeOptions: ["20", "50", "100"],
  showSizeChanger: true,
  current: 1,
  size: "small",
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
};


const children = [];
let optionKeys = [
  { key: "AFN", value: "AFN" },
  { key: "MFN", value: "MFN" },
  { key: "Shipped", value: "Shipped" },
  { key: "Pending", value: "Pending" },
  { key: "Unshipped", value: "Unshipped" },
  { key: "Delivered", value: "Delivered" },
  { key: "Canceled", value: "Canceled" },
  {key: "Returned", value: "Returned"}
];
for (let i = 0; i < optionKeys.length; i++) {
  children.push(<Option key={optionKeys[i].key}>{optionKeys[i].value}</Option>);
}


const mapStateToProps = (state, props) => ({
  templates: state.template.templates,
  orders: state.order.orders,
  products: state.product.products,
  ordersLoader: state.order.ordersLoader,
});


const mapDispatchToProps = (dispatch, props) => ({
  user: getUser(),
  fetchTemplates: userId => dispatch(fetchTemplates(userId)),
  fetchOrders: userId => dispatch(fetchOrders(userId)),
  fetchProducts: userId => dispatch(fetchProducts(userId)),
  templateCreateSubmit: values => dispatch(tCreationSubmit(values)),
  templateModifySubmit: values => dispatch(tModifySubmit(values)),
  deleteModifySubmit: id => dispatch(tDeleteSubmit(id)),
});


@connect(mapStateToProps, mapDispatchToProps)


class TemplateComponents extends React.Component {

  /**
   * [companyLogoFilePreview have to assign before state since our state depend on its ]
   * @type {String}
   */
  companyLogoFilePreview = "https://reviewkick.s3.amazonaws.com/uploads/ckeditor/pictures/15/content_amazon-logo.png"
  state = {
    tableData: [],
    data: [],
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    loading: true,
    createTemplateVisible: false,
    editorState: EditorState.createEmpty(),
    modifyTemplate: "",
    deteteTemplateId: "",
    showTemplatePreview: false,
    templateTitle: "",
    template_output: "",
    messageBody: '',
    orders: [],
    orderItem: {},
    selectedOrderId: "",
    redirectToTemplates: false,
    submitApiCall: false,
    current: 0,

    template_name: "",
    template_subject: "",
    template_type: "General",
    template_status: "active",
    send_time: "00:00",
    send_day: "Immediately",
    send_after: "delivered",
    minimum_item_condition: "All",
    fulfillment_type: "FBA and Merchant Fulfilled",

    template_name_error: false,
    template_subject_error: false,
    template_output_error: false,

    companyLogoFile: [],
    companyLogoFilePreview: this.companyLogoFilePreview,
    attachments: [],
    exclude_orders: [],
    include_products: '',
    include_products_type: 'asin',
    exclude_products: '',
    exclude_products_type: 'asin',
  }
  handleLogoChange = (event) => {
    // if (event.target.files[0]) {
    //     this.setState({
    //       companyLogoFilePreview: URL.createObjectURL(event.target.files[0]),
    //       companyLogoFile: event.target.files[0]
    //     })
    // }
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        companyLogoFile: file,
        companyLogoFilePreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  componentDidMount() {
    const {fetchProducts, fetchOrders, fetchTemplates, user: {_id: userId}} = this.props
    fetchOrders(userId)
    fetchProducts(userId)
    fetchTemplates(userId)
  }

  inputValidation = (key1, key2) => {
    let error = false;
    if (!key1) {
      console.log('content in ', key2, key1)
      this.setState({ [key2]: true });
      error = true;
    } else {
      this.setState({ [key2]: false });
      error = false;
    }
    return error;
  };


  next = () => {
    let {
      template_name,
      template_subject,
      template_output
    } = this.state;
    template_output = template_output.replace(/<(?:.|\n)*?>/gm, '');
    let template_name_error = this.inputValidation(template_name, "template_name_error");
    let template_subject_error = this.inputValidation(template_subject, "template_subject_error");
    let template_output_error = this.inputValidation(template_output, "template_output_error");

    if (template_output.length < 2) {
      this.setState({
        template_output_error: true,
      })
      template_output_error = true;
    }

    let error = template_name_error || template_subject_error || template_output_error;

    if (!error) {
      const current = this.state.current + 1;
      this.setState({ current });
    }else {
      return;
      // const current = this.state.current + 1;
      // this.setState({ current });
    }
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  submitCreateTemplate = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    const { modifyTemplate } = this.state;
    const self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.body = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        if (!modifyTemplate) {
          this.props.templateCreateSubmit(values);
        } else {
          values.id = modifyTemplate;
          this.props.templateModifySubmit(values);
        }
      } else {
        console.log(err);
      }
      setTimeout(function() {
        self.setState({
          redirectToTemplates: true
        });
      }, 500);
    });
  }

  changeStatus = (val) => {
    console.log(val);
  }

  generateAmazonButton = (text, link) => {
      let amazon_button_outer = `
          background: #f0c14b;
          border-color: #a88734 #9c7e31 #846a29;
          color: #111;
          display: inline-block;
          margin: 6px 3px;
      `
      let amazon_button_inner = `
        background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
        box-shadow: 0 1px 0 rgba(255,255,255,.4) inset;
        padding: 6px 8px;
      `
      let amazon_button_inner_a = `
        color: #111;
      `
      return `<span style="${amazon_button_outer}">
          <span style="${amazon_button_inner}" >
              <a target='_blank' style="${amazon_button_inner_a}" href="${link}">${text}</a>
          </span>
      </span>`
  }
  generateAmazonButton2 = (text, link) => {
      let amazon_button_outer = {
          background: '#f0c14b',
          borderColor: `#a88734 #9c7e31 #846a29`,
          color: `#111`,
      }
      let amazon_button_inner = {
        background: `linear-gradient(to bottom,#f7dfa5,#f0c14b)`,
        boxShadow: `0 1px 0 rgba(255,255,255,.4) inset`,
        padding: `.75em 1.5em`,
        height: `100%`,
        display: `block`,
        position: `relative`,
        overflow: `hidden`,
      }
      let amazon_button_inner_a = {
        fontSize: `1.5em`,
        color: `#111`,
      }
      return <span style={amazon_button_outer}>
          <span style={amazon_button_inner} >
              <a style={amazon_button_inner_a} href={link}>{text}</a>
          </span>
      </span>
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    let messageBody = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let item = this.state.orderItem;
    if (!(typeof item === "object" && Object.keys(item).length)) {
      item = this.props.orders[0];
      this.setState({
        orderItem: item,
        selectedOrderId: item.AmazonOrderId
      });
    }


    let htmlPreview = Functions.generateTemplatePreviewHtml(messageBody, {item})

    this.setState({
      template_output: htmlPreview,
      messageBody,
    });
  }

  replaceWithOtherText = (item, value) => {
    switch (value) {
      case 'buyer-name':
        return item.BuyerName
      case 'product-name':
        return item.orderItem.title
      case 'product-qty':
        return item.orderItem.reduce(((cumulative, current) => cumulative + current.qty), 0)
      default:
        return this.generateAmazonButton('amazon', 'http://www.amazon.co.uk')
    }
  }

  changeOrderTemplatePreview = (selValue) => {
    const self = this;
    const selectedOrder = this.props.orders.filter(or => or.AmazonOrderId === selValue);
    this.setState({
      orderItem: selectedOrder.length ? selectedOrder[0] : {},
      selectedOrderId: selValue
    });

    setTimeout(function() {
      self.onEditorStateChange(self.state.editorState);
    });
  }

  _handleOnChange = (key, value) => {
    this.setState({ [key]: value });
  }

  _submitTemplateCreationDetails = () => {
    const { templateCreateSubmit } = this.props;
    const {
      template_name,
      template_subject,
      template_output,
      messageBody,
      template_type,
      template_status,
      send_day,
      send_time,
      send_after,
      selectedOrderId,
      minimum_item_condition,
      fulfillment_type,
      attachments,
      companyLogoFile,
      exclude_orders,
      include_products,
      include_products_type,
      exclude_products,
      exclude_products_type,
    } = this.state;

    const formData = new FormData();
    attachments.forEach((file) => {
      formData.append("email_attachment", file);
    });
    companyLogoFile.forEach((file) => {
      formData.append("logo", file);
    });
    formData.append("exclude_orders", exclude_orders);
    formData.append("include_products", include_products);
    formData.append("include_products_type", include_products_type);
    formData.append("exclude_products", exclude_products);
    formData.append("exclude_products_type", exclude_products_type);
    formData.append("user_id", this.props.user._id);
    formData.append("template_name", template_name);
    formData.append("email_subject", template_subject);
    formData.append("template_type", template_type);
    formData.append("template_status", template_status);
    formData.append("email_message", messageBody);
    formData.append("order_id", selectedOrderId);
    formData.append("send_day", send_day);
    formData.append("send_time", send_time);
    formData.append("send_after", send_after);
    formData.append("minimum_item_condition", minimum_item_condition);
    formData.append("fulfillment_type", fulfillment_type);

    // console log form data
    for (var pair of formData.entries()) {
      console.log('formdata_' + pair[0]+ ', ' + pair[1]);
    }
    // return;


    // let payload = {
    //   user_id: this.props.user._id,
    //   template_name,
    //   email_subject: template_subject,
    //   template_type,
    //   template_status,
    //   email_message: template_output,
    //   order_id: selectedOrderId,
    //   send_day,
    //   send_time,
    //   send_after,
    //   minimum_item_condition,
    //   fulfillment_type
    // };

    templateCreateSubmit(formData);
    message.info("creating template for you");
    this.setState({submitApiCall: true})
    setTimeout(() => this.setState({ redirectToTemplates: true }), 3500)
  };

  imageName = (pathName) => {
    let arr = pathName.split('/');
    return arr[arr.length - 1]
  }
  _uploadFiles = (text, state_key, logoPreview = false) => {
    const initFile = this.state[state_key][0];
    let defaultFileList = []
    if (initFile) {
     defaultFileList = [{
        uid: '1',
        name: this.imageName(URL.createObjectURL(initFile)),
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: URL.createObjectURL(initFile),
      }]
    }
    const props = {
      multiple: false,
      onRemove: (file) => {
        this.setState((state) => {
          const uploadState = state[state_key]
          const index = uploadState.indexOf(file);
          const newUploads = uploadState.slice();
          newUploads.splice(index, 1);
          if (logoPreview) {
            return {
              [state_key]: newUploads,
              companyLogoFilePreview: this.companyLogoFilePreview // back to amazon logo
            }

          } else {
            return {
              [state_key]: newUploads
            };
          }
        });
      },
      beforeUpload: (file) => {
        if (logoPreview) {
          let supportedFormat = [
            'image/jpeg',
            'image/png',
            'image/gif',
          ]
          const isPic = supportedFormat.includes(file.type)
          if (!isPic) {
            message.error('You can only upload JPG file!');
          }else {
            let reader = new FileReader();
            reader.onloadend = () => {
              this.setState({
                companyLogoFile: [file],
                companyLogoFilePreview: reader.result
              });
            };
            reader.readAsDataURL(file);
          }


        }else {
          this.setState({[state_key]: [file] });
        }
        return false;
      },
      fileList: this.state[state_key]
    };
    return <div className="my-2">
      <Upload {...props}>
        <Button className='my-2'>
          <Icon type="upload"/> {text}
        </Button>
      </Upload>
    </div>;
  }


  excludeOrderChange = (values, option) => {
    this.setState({ exclude_orders: values });
  };
  includeProductChange = (values, option) => {
    this.setState({ include_products: values });
  };

  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    let {
      editorState,
      template_output,
      selectedOrderId,
      redirectToTemplates,
      current,
      companyLogoFilePreview,
      submitApiCall,
    } = this.state;
    let {
      template_name,
      template_subject,
      template_type,
      template_status,
      send_day,
      send_time,
      send_after,
      minimum_item_condition,
      fulfillment_type,

      template_name_error,
      template_subject_error,
      template_output_error

    } = this.state;
    let htmlText = () => ({ __html: template_output });

    let templates;
    let { getFieldDecorator } = this.props.form;
    const formHalfArea = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };

    let orders = [], orderOption = [];

    if (redirectToTemplates) {
      return <Redirect to='/templates'/>;
    }

    if (this.props.orders && this.props.orders.length) {
      orders = this.props.orders.map((or) => {
        return { value: or.AmazonOrderId, name: or.AmazonOrderId  };
        // + ": " + or.orderItem[0].title
      });
      orderOption = orders.map(ch => <Option key={ch.value}>{ch.name}</Option>);
    }
    let products=[], productOption = [];
    if (this.props.products && this.props.products.length) {
      products = this.props.products.map((product) => {
        return { value: product.asin1, name: Functions.textTruncate(product.item_name, 100) };
      });
      productOption = products.map(ch => <Option key={ch.value} value={ch.value}>{ch.name}</Option>);
    }

    const styleArr = [{ value: 1, name: "Default" }, { value: 2, name: "Blue" }, { value: 3, name: "Gray" }, {
      value: 4,
      name: "Green"
    }];
    const styleOption = styleArr.map(ch => <Option key={ch.value}>{ch.name}</Option>);


    const typeArr = [
      { value: 1, name: "General", slug: "general" },
      { value: 2, name: "Feedback Request", slug: "feedback_request" },
      {value: 3, name: "Feedback Repair", slug: "feedback_repair"},
      { value: 4, name: "Reviews", slug: "reviews" },
      { value: 7, name: "Review Repair", slug: "review_repair" },
      {value: 5, name: "Shipping Info", slug: "shipping_info"},
      { value: 6, name: "Product Info", slug: "product_info" },
      { value: 7, name: "Remove feedback request", slug: "remove_feedback_request" },
    ];
    const typeOption = typeArr.map(ch => <Option value={ch.slug} key={ch.value}>{ch.name}</Option>);


    const tdStyle1 = { padding: "30px 0 0 0" };
    // display:block; height:77.3333px; margin:5px auto; vertical-align:top; width:160px
    const tdStyle2 = {
      display: "block",
      height: "77.3333px",
      margin: "5px auto",
      verticalAlign: "top",
      width: "160px"
    };
    const tdStyle3 = { padding: 5 };

    const sendDateArray = [{ name: "Immediately", value: 0 }, { name: "1 Day", value: 1 }, {
      name: "2 Days",
      value: 2
    }, { name: "3 Days", value: 3 },
      { name: "4 Days", value: 4 }, { name: "5 Days", value: 5 }, { name: "6 Days", value: 6 }, {
        name: "7 Days",
        value: 7
      }, { name: "8 Days", value: 8 },
      { name: "9 Days", value: 9 }, { name: "10 Days", value: 10 }, { name: "11 Days", value: 11 }, {
        name: "12 Days",
        value: 12
      }, { name: "13 Days", value: 13 },
      { name: "14 Days", value: 14 }, { name: "15 Days", value: 15 }, { name: "16 Days", value: 16 }, {
        name: "17 Days",
        value: 17
      }, { name: "18 Days", value: 18 },
      { name: "19 Days", value: 19 }, { name: "20 Days", value: 20 }, { name: "21 Days", value: 21 }, {
        name: "4 Weeks",
        value: 28
      }, { name: "5 Weeks", value: 35 },
      { name: "6 Weeks", value: 42 }, { name: "7 Weeks", value: 49 }, { name: "8 Weeks", value: 56 }, {
        name: "9 Weeks",
        value: 63
      }, { name: "10 Weeks", value: 70 }
    ];

    const sendDateOptions = sendDateArray.map(sd => <Option value={sd.name} key={sd.value}>{sd.name}</Option>);

    const whenOrderIsOptions = pageData.orderOptionKeys.map(oi => <Option value={oi.value} key={oi.value}>{oi.title}</Option>);

    const minItemCondArr = ["All", "New", "Used Refurbished", "Collectible Acceptable", "Collectible Good", "Collectible Very Good",
      "Collectible Llike New", "Used Acceptable", "Used Good", "Used Very Good", "Used Like New"];
    const minItemCondOptions = minItemCondArr.map((ic, i) => <Option value={ic} key={i}>{ic}</Option>);

    const fulfilmentTypeArr = ["FBA and Merchant Fulfilled", "FBA only", "Merchant Fulfilled Only"];
    const fulfilmentTypeOptions = fulfilmentTypeArr.map((fft, i) => <Option value={fft} key={i}>{fft}</Option>);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };


    let excludeOrderskeysOptions = pageData.excludeOrderKeys.map((option, i) =>
      <OptGroup key={i} label={option.title}>
        {
          option.keys.map((op, j) =>
            <Option key={op.value} >{op.label}</Option>
          )
        }
      </OptGroup>
    );


    let stepsContent;

    if (current === 0) {
      stepsContent = (
        <Row>
          <Col span={11}>
            <Form layout="horizontal" onSubmit={this.submitCreateTemplate} className="create_template">
              <FormItem>
                <label className="form-label mb-0">Template Name:</label>
                <Input
                  onChange={e => this._handleOnChange("template_name", e.target.value)}
                  value={template_name} placeholder="Template name"/>
                {
                  template_name_error ?
                    <label className="form-label text-danger">Template Name can't be empty</label> : null
                }

              </FormItem>

              <FormItem>
                <label className="form-label mb-0">Email Subject:</label>

                <Input
                  value={template_subject}
                  onChange={e => this._handleOnChange("template_subject", e.target.value)}
                  placeholder="Email Subject"/>
                {
                  template_subject_error ?
                    <label className="form-label text-danger">Template email Subject can't be empty</label> : null
                }
              </FormItem>


              <FormItem>
                <Row>
                  <Col span={11}>
                    <FormItem>
                      <label className="form-label mb-0">Type:</label>
                      <Select value={template_type} onChange={value => this._handleOnChange("template_type", value)}>
                        {typeOption}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={11}>
                    <FormItem>
                      <label className="form-label mb-0">Status:</label>
                      <Select value={template_status}
                              onChange={value => this._handleOnChange("template_status", value)}>
                        <Option value="active">Active</Option>
                        <Option value="inActive">Inactive</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>

              <br/>

              {this._uploadFiles('Select Attachments', 'attachments')}

              <br/>

              <FormItem>
                <label className="form-label mb-0">Message</label>
                <div style={editorWrapperStyle}>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarCustomButtons={[<CustomOptionsForDraftEditor/>]}
                  />
                </div>
                {
                  template_output_error ?
                    <label className="form-label text-danger">Email body can't be empty</label> : null
                }

              </FormItem>

            </Form>
            {
              // <div className="btn btn-primary" onClick={this.submitCreateTemplate}>Create</div>
            }
          </Col>
          <Col span={10} offset={1}>
            <div className="template_preview">
              <div className="card">
                <div className="card-header">
                  <span>Live Email Preview</span> <span>View as: </span>Order #:<Select value={selectedOrderId}
                                                                                        style={{ width: "100%" }}
                                                                                        onChange={this.changeOrderTemplatePreview}>{orderOption}</Select>
                </div>
                <div className="card-body template_p_container">
                  <div className="m-2">
                    {this._uploadFiles('Upload Company logo', 'companyLogoFile', true)}
                  </div>

                  <table bgcolor="#f2f2f2" border="0" cellPadding="0" cellSpacing="0"
                         width="100%">
                    <tbody>
                    <tr>
                      <td align="center" style={tdStyle1}><img
                        className="fr-fic"
                        src={companyLogoFilePreview}
                        style={tdStyle2}/>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdStyle3} className="template_area"
                          dangerouslySetInnerHTML={htmlText()}></td>
                    </tr>
                    <tr>
                      <td align="center">&nbsp;</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    } else {
      stepsContent = (
        <div className={"campaign_data"}>
          <Form layout="horizontal" className="create_campaign">


            <FormItem
              label="Choose when to send :"
              {...formItemLayout}>
              <Col span={6}>
                <FormItem>
                  &nbsp;
                  <Select onChange={value => this._handleOnChange("send_day", value)} value={send_day}
                          style={{ width: 120 }}>
                    {sendDateOptions}
                  </Select>
                </FormItem>
              </Col>
              <Col span={1}> &nbsp; at</Col>
              <Col span={6}>
                <FormItem>
                  <TimePicker
                    onChange={(time, timestring) => this._handleOnChange("send_time", timestring)}
                    defaultOpenValue={moment("00:00", "HH:mm")}
                    defaultValue={moment(send_time, "HH:mm")}
                    format="HH:mm"
                    style={{ width: 110 }}
                  />
                </FormItem>
              </Col>
              <Col span={2}>after</Col>
              <Col span={9}>
                <FormItem>
                  <Select
                    value={send_after}
                    onChange={value => this._handleOnChange("send_after", value)}
                  >
                    {whenOrderIsOptions}
                  </Select>
                </FormItem>
              </Col>
            </FormItem>
            <FormItem>
              <Row>
                <Col span={4}>
                  <label className="form-label mb-0">Exclude Orders</label>
                </Col>
                <Col span={20}>
                  <Select
                    mode="multiple"
                    size="default"
                    placeholder="Please Select Exclusions"
                    onChange={this.excludeOrderChange}
                    style={{ width: "100%" }}>
                    {excludeOrderskeysOptions}
                  </Select>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Row>
                <Col span={4}>
                  <label className="form-label mb-0">Choose include products type</label>
                </Col>
                <Col span={20}>
                  <Select
                    size="default"
                    value={this.state.include_products_type}
                    placeholder="Please Select product type "
                    onChange={value => this.setState({include_products_type: value})}
                    style={{ width: "100%" }}>
                      <Option value="asin">ASIN</Option>
                      <Option value="sku">SKU</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Row>
                <Col span={24}>
                  <label className="form-label mb-0">Include Products {`(Comma separated ${this.state.include_products_type === 'asin' ? 'ASIN' : 'SKU' } NO)`}</label>
                </Col>
                <Col span={24}>
                  <Input.TextArea
                    autosize={{ minRows: 2, maxRows: 8 }}
                    placeholder={`Add comma separated ${this.state.include_products_type === 'asin' ? 'ASIN' : 'SKU' } NO of products`}
                    value={this.state.include_products}
                    onChange={ e => { return this.setState({include_products: e.target.value}) } }
                    />
                </Col>
              </Row>
            </FormItem>
{/*exclude */}
            <FormItem>
              <Row>
                <Col span={4}>
                  <label className="form-label mb-0">Choose exclude products type</label>
                </Col>
                <Col span={20}>
                  <Select
                      size="default"
                      value={this.state.exclude_products_type}
                      placeholder="Please Select product type "
                      onChange={value => this.setState({exclude_products_type: value})}
                      style={{ width: "100%" }}>
                    <Option value="asin">ASIN</Option>
                    <Option value="sku">SKU</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Row>
                <Col span={24}>
                  <label className="form-label mb-0">Exclude Products {`(Comma separated ${this.state.exclude_products_type === 'asin' ? 'ASIN' : 'SKU' } NO)`}</label>
                </Col>
                <Col span={24}>
                  <Input.TextArea
                      autosize={{ minRows: 2, maxRows: 8 }}
                      placeholder={`Add comma separated ${this.state.exclude_products_type === 'asin' ? 'ASIN' : 'SKU' } NO of products`}
                      value={this.state.exclude_products}
                      onChange={ e => { return this.setState({exclude_products: e.target.value}) } }
                  />
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <label className="form-label mb-0">Minimum Item Condition:</label>
              <Select
                style={{ width: 180 }}
                value={minimum_item_condition}
                onChange={value => this._handleOnChange("minimum_item_condition", value)}
              >
                {minItemCondOptions}
              </Select>

            </FormItem>

            <FormItem>
              <label className="form-label mb-0">Fulfillment type:</label>
              <Select
                value={fulfillment_type}
                onChange={value => this._handleOnChange("fulfillment_type", value)}
                style={{ width: 180 }}>
                {fulfilmentTypeOptions}
              </Select>
            </FormItem>
          </Form>
        </div>
      );
    }

    return (

      <div className="card">
        <div className="card-body">
          <Steps current={current}>
            <Step key="Template" title="Template"/>
            <Step key="Campaign" title="Campaign"/>
          </Steps>

          {
            this.props.ordersLoader ?
            <div style={spinStyle}>
              <Spin tip="Fetching data to create template" />
            </div> :
            <div className="steps-content">
                {stepsContent}
            </div>
          }


          <div className="steps-action">
            {
              current < steps.length - 1
              && <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              current === steps.length - 1
              && <div className='d-inline'>
              {
                submitApiCall ?
                <Spin indicator={antIcon} /> :
                <Button type="primary" onClick={() => this._submitTemplateCreationDetails()}>Done</Button>
              }
              </div>
            }
            {
              current > 0
              && (
                submitApiCall ? null :
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

// export default templates
const Template = Form.create()(TemplateComponents);
export default Template;
