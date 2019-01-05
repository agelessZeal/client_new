import React, {Component} from 'react';
import {
  Modal,
  Input,
  Button
} from 'antd';
// import ids from 'short-id'
import {SERVER_STATIC_URL} from '../../../ducks/types.js'
import * as Functions from '../../pageData/Functions.js'

export default class TemplateModifyPreviewModal extends Component {
  state = {
    userEmail: '',
    emailError: false,
    showTemplatePreview: false,
    attachmentPreview: '',
    email_attachment: '',
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

    let {templateData, template_output} = this.props;
    let emailTemplate = this.generateEmailTemplate(templateData, template_output)
    let item = this.props.orders.find(order => order.AmazonOrderId === templateData.order_id)
    let htmlPreview = Functions.generateTemplatePreviewHtml(emailTemplate, {item})
    // let htmlText = () => ({ __html: htmlPreview })



    const {userEmail}  = this.state
    let payload = {
      "email": userEmail,
      "subject": templateData.email_subject,
      "messageBody": htmlPreview
    }
    // console.log('payload', payload)
    if (this.validateEmail(userEmail)) {
      this.setState({emailError: false})
      this.props.sendTestMailForTemplateEdit(payload)
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


  generateEmailTemplate (templateData, template_output) {
    var logo = "https://reviewkick.s3.amazonaws.com/uploads/ckeditor/pictures/15/content_amazon-logo.png";
    if(templateData.logo){
      logo = SERVER_STATIC_URL + templateData.logo;
    }
    var email_attachment = '';
    if(templateData.email_attachment){

      var attachment = SERVER_STATIC_URL + templateData.email_attachment;
      var attachment_name = templateData.email_attachment.split('/')[2];
      email_attachment = `There is an attachment with this email. Click this link to view the attachment.
                            <a href="${attachment}" target="_blank">${attachment_name}</a>
                        `;
    }
    let email_unsubscribes = '#'
    let htmlBody = `
          <table bgcolor="#f2f2f2" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td align="center" style="padding: 30px 34%;">
                  <img class="fr-fic" src="${logo}" style="display: block; height: 77.3333px; margin: 5px auto; vertical-align: top; width: 160px;">
                </td>
              </tr>
              <tr>
                <td class="template_area" style="padding: 5px;">
                  ${template_output}
                </td>
              </tr>
              <tr>
                <td align="center">&nbsp;</td>
              </tr>
              <tr>
                <td style="padding: 15px 5px;">${email_attachment}</td>
              </tr>
              <tr>
                <td style="text-align:center; padding: 15px 5px;">
                <p>You're receiving this email because we think you should need this, </p>
                <p>AND you subscribed to hear from us. If our feedbacks aren’t sparking joy,</p>
                <p>we’ll understand if you <a href="${email_unsubscribes}">unsubscribe</a>.</p></td>
              </tr>

            </tbody>
          </table>
      `;
    return htmlBody;
  }
  render () {
    console.log('this.props inside TemplateModifyPreviewModal', this.props)
    const {showTemplatePreview} = this.state
    const {template_name, template_output, templateData} = this.props
    let emailTemplate = this.generateEmailTemplate(templateData, template_output)
    let item = this.props.orders.find(order => order.AmazonOrderId === templateData.order_id)
    let htmlPreview = Functions.generateTemplatePreviewHtml(emailTemplate, {item})
    let htmlText = () => ({ __html: htmlPreview })
    return(
    <div className='d-inline m-2'>
      <Button
        type="primary"
        onClick={this.previewTemplate}>PreviewTemplate
      </Button>
      <Modal title={template_name}
             visible={showTemplatePreview}
        // onOk={this.submitCreateTemplate}
             className={"centered"}
             maskClosable={false}
             onCancel={this.handleCTemplateCancel} width="790px"
             footer={[
                <div key="hello world 2" className='d-flex justify-content-between align-items-start'>
                  <div className="d-inline-block">
                    <Input onChange={(e) => this.setState({userEmail: e.target.value})} className="d-inline mr-2" placeholder="Enter your email address" />
                    {
                      this.state.emailError ?
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


