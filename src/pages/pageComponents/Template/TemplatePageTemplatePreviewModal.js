import React, {Component} from 'react';
import {
  Modal,
  Input,
  Button
} from 'antd';
// import ids from 'short-id'
import {SERVER_STATIC_URL} from '../../../ducks/types'
import * as Functions from '../../pageData/Functions.js'

export default class TemplatePageTemplatePreviewModal extends Component {
  state = {
    userEmail: '',
    emailError: false,
    showTemplatePreview: false,
  }
  handleCTemplateCancel = () => {
    this.setState({
      showTemplatePreview: false
    });
  }

  validateEmail = (email)  => {
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email);
  }
  sendTestMail = () => {
    const {userEmail}  = this.state
    const {templateId: id} = this.props
    let payload = {
      "id": id,
      "email": userEmail
    }
    if (this.validateEmail(userEmail)) {
      this.setState({emailError: false})
      this.props.sendTestMail(payload)
      this.handleCTemplateCancel()
    } else {
      this.setState({emailError: true})
    }
  }
  previewTemplate = () => {
    this.setState({
      showTemplatePreview: true
    })
  }
  render () {
    const {
      templates,
      templateId,
      orderId,
    } = this.props;
    const {
      showTemplatePreview,
      emailError,
    } = this.state
    const templateData = templates.filter((temp) => temp["_id"] === templateId)[0];
    const emailTemplate = Functions.generateEmailTemplateFromDatabaseData(templateData)
    let item = this.props.orders.find(order => order.AmazonOrderId === orderId)
    let htmlPreview = Functions.generateTemplatePreviewHtml(emailTemplate, {item})
    let htmlText = () => ({ __html: htmlPreview })
    const templateTitle = templateData.template_name
    return(
    <div className='d-inline m-2'>
      <a onClick={this.previewTemplate} href="javascript: void(0);">
        <i className="icmn-enlarge mr-1"/>
         Preview
      </a> &nbsp;
      <Modal title={templateTitle}
             visible={showTemplatePreview}
        // onOk={this.submitCreateTemplate}
             className={"centered"}
             maskClosable={false}
             onCancel={this.handleCTemplateCancel} width="790px"
             footer={[
                <div key="hello world 2" className='d-flex justify-content-between align-items-start'>
                  <div className="d-inline-block">
                    <Input
                      onChange={(e) => this.setState({userEmail: e.target.value})}
                      className="d-inline mr-2"
                      placeholder="Enter your email address" />
                    {
                      emailError ?
                        <label className='text-danger'>Please add a valid email address</label> : null
                    }
                  </div>
                  <div>
                    <Button key='sendTestMail' icon='mail' onClick={this.sendTestMail}>Send Test
                      Mail</Button>
                    <Button key='backToTemplate' onClick={this.handleCTemplateCancel}>Return</Button>
                  </div>
                </div>
             ]}>

        <div dangerouslySetInnerHTML={htmlText()}></div>

      </Modal>
    </div>
    )
  }
}

