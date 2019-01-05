import React, {Component} from 'react';
import 'draft-js/dist/Draft.css'
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {SERVER_STATIC_URL} from '../../../ducks/types.js'
import * as Functions from '../../pageData/Functions.js'

import {
  Modal,
  Input,
  message,
  Button,
  Card,
  Row,
  Col,
  Form,
  Select,

} from 'antd';

const {Item: FormItem} = Form;
const {Option} = Select;

export default class SendMailToOrdererModal extends Component {
  state = {
    showSendRemovalModal: false,
    template: null,
    loading: false,
    buyerEmail: '',
    orderHasTemplate: false,
  }

  componentDidMount = () => {
    const {templates, orderId} = this.props;
    const template = templates.find(template => template.order_id === orderId);
    if (template) {
      this.setState({
        template: template,
        orderHasTemplate: true,
      })
    }
  }


  closeSendRemovalModal = () => {
    this.setState({
      showSendRemovalModal: false
    });
  }

  showSendRemovalModalFn = () => {
    this.setState({
      showSendRemovalModal: true
    })
  }
  sendMessage = () => {
    this.setState({loading: true})
    const {template} = this.state
    const {orderId, sendMailToOrderer, buyerEmail, userId} = this.props
    if (template) {
      let emailTemplate = Functions.generateEmailTemplateFromDatabaseData(template, buyerEmail)
      let htmlPreview = Functions.generateTemplatePreviewHtml(emailTemplate, {item: this.props.rowData})


      let payload = {
        templateId: template._id,
        orderId,
        userId,
        messageBody: htmlPreview,
      }
      sendMailToOrderer(payload)
    }else {
      return message.error('Please Select a Template first')
    }
    setTimeout(() => {
      this.setState({
        loading: false,
        showSendRemovalModal: false
      })
    }, 500)
    message.success('Email sent successfully');

  }
  handleTemplateChange = (value, option) => {
    const {templates} = this.props;
    const template = templates.find(template => template._id === value);
    if (template) {
      this.setState({template})
    }
  }
  _generateTemplateChoice = () => {
    const {buyerEmail, templates} = this.props;
    let templateOptions = templates.map(template => <Option key={template._id} value={template._id}>{template.template_name}</Option>)
     return <div>
      <FormItem>
          <label htmlFor="templateChoice">Select a Template to send to buyer</label>
         <Select
          placeholder="Select a template"
          id="templateChoice"
          onChange={this.handleTemplateChange}
          style={{width: 300, marginLeft: 20}}
         >
         {templateOptions}
         </Select>

      </FormItem>
     </div>

  }
  _generateBuyerEmailField = () => {
      const {buyerEmail} = this.props
      return <FormItem>
          <label>Buyer Email</label>
          <Input
            style={{width: 300, marginLeft: 20}}
            value={buyerEmail}
            disabled />
      </FormItem>
  }
  render () {
    const {
      showSendRemovalModal,
      template,
      orderHasTemplate,
    } = this.state
    const {buyerEmail, templates} = this.props;
    let templateOptions = templates.map(template => <Option key={template._id} value={template._id}>{template.template_name}</Option>)
    let emailTemplate = '';
    if (template) {
      emailTemplate = Functions.generateEmailTemplateFromDatabaseData(template, buyerEmail)
    }
    // let item = this.props.orders.find(order => order.AmazonOrderId == this.props.orderId)
    let htmlPreview = Functions.generateTemplatePreviewHtml(emailTemplate, {item: this.props.rowData})
    let htmlText = () => ({ __html: htmlPreview })

    return(
    <div className='d-inline m-2'>
      <Button
        type="primary"
        onClick={this.showSendRemovalModalFn}> Send Mail to Orderer
      </Button>
      <Modal title={null}
        style={{ top: 30 }}
        visible={showSendRemovalModal}
        className={"centered"}
        maskClosable={false}
        onCancel={this.closeSendRemovalModal} width="900px"
        footer={[
          <div key="20840938-somerandomvalue">
            <div>
              <Button
                 type='primary'
                 icon='mail'
                 onClick={this.sendMessage}
                 loading={this.state.loading}
                >
                 Send Message
              </Button>
              <Button
                key='backToTemplate'
                icon='close'
                onClick={this.closeSendRemovalModal}
                >
                Return
              </Button>
            </div>
          </div>
        ]}>
         <div>
           <h2 className='text-center' >Send Email to Buyer</h2>

           {
            orderHasTemplate ? null : this._generateTemplateChoice()
           }
           {
            this._generateBuyerEmailField()
           }


            {
             emailTemplate?  <div dangerouslySetInnerHTML={htmlText()}></div> : <div>You havn't selected any template</div>
            }

         </div>
      </Modal>
    </div>
    )
  }
}


