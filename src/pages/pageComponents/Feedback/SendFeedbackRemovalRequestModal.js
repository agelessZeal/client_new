import React, {Component} from 'react';
import 'draft-js/dist/Draft.css'
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

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

// import './SendRemovalRequestModal.scss'

const editorWrapperStyle = {
  fontSize: 16,
  lineHeight: 1,
}
const {Item: FormItem} = Form;
const {Option} = Select;
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Monaco", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },

};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
class SendFeedbackRemovalRequestModal extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    editorOutput: '',
    showSendRemovalModal: false,
    recipient: '',
    subject: '',
    subjectError: false,
    editorOutputError: false,
    recipientError: false,
    selectedTemplate: null,
    loading: false,

  }

  inputValidation = (key1, key2) => {
    let error = false;
    if (key1.length < 1) {
      this.setState({ [key2]: true });
      error = true;
    } else {
      this.setState({ [key2]: false });
      error = false;
    }
    return error;
  };
  _handleOnChange = (key, value) => {
    this.setState({ [key]: value });
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
    const {
      subject,
      editorOutput,
      recipient,
    } = this.state
    const {feedback, userId} = this.props;
    let error = false;
    error = this.inputValidation(subject, "subjectError")
    error = this.inputValidation(editorOutput, "editorOutputError")
    error = this.inputValidation(recipient, 'recipientError')
    if (!error) {
      this.setState({loading: true})
      let payload = {
        userId,
        feedback_id: feedback.id,
        email_subject: subject,
        email_message: editorOutput,
        buyer_email: recipient,
      }
      console.log('payload', payload)
      this.props.removeFeedbackRequest(payload)

      setTimeout(() =>{
        this.setState({
          loading: false,
          showSendRemovalModal: false,
        })
        message.success('Email send successfully')
      }, 500)

    }else {
      console.log('error')
    }
  }
  onEditorStateChange = (editorState) => {
    let editorOutput = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({editorState, editorOutput})
  }
  myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }
  handleTemplateChange = (value, option) => {
    const {templates} = this.props;
    const template = templates.find(template => template._id == value);
    if (template) {
      const contentBlock = htmlToDraft(template.email_message);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
        editorOutput: template.email_message,
        subject: template.email_subject,
      })
    }





  }
  render () {
    const {
      showSendRemovalModal,
      recipient,
      subject,
      subjectError,
      editorState,
      editorOutput,
      editorOutputError,
      recipientError,

    } = this.state

    const {templates} = this.props;

    let templateOptions = templates.map(template => <Option key={template._id} value={template._id}>{template.template_name}</Option>)

    return(
    <div className='d-inline m-2'>
      <Button
        type="primary"
        onClick={this.showSendRemovalModalFn}> Send Removal Request
      </Button>
      <Modal
        title={null}
        style={{ top: 5 }}
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
             <h2 className='text-center' >Ask Buyer to Remove Feedback</h2>
             <p>Here's a tried and tested message that you can send to your buyer If you've resolved the issues that lead to negative feedback being posted inItially. We've Incuded product detalls and link form buyer to follow to make process easy for them. </p>

             <div>
              <FormItem>
                  <label htmlFor="templateChoice">Select a Template</label>
                 <Select
                  placeholder="Select a template"
                  notFoundContent="You doesn't have template with remove_feedback_request type"
                  id="templateChoice"
                  onChange={this.handleTemplateChange}
                  style={{minWidth: 400, marginLeft: 20}}
                 >
                 {templateOptions}
                 </Select>

              </FormItem>
             </div>

             <Card>

             <FormItem>
                <Input
                  onChange={e => this._handleOnChange("recipient", e.target.value)}
                  value={recipient} placeholder="Recipient"/>
                {
                  recipientError ?
                    <label className="form-label text-danger">Recipient field can't be empty</label> : null
                }
             </FormItem>
             <FormItem>
                <Input
                  onChange={e => this._handleOnChange("subject", e.target.value)}
                  value={subject} placeholder="Email Subject"/>
                {
                  subjectError ?
                    <label className="form-label text-danger">Subject field can't be empty</label> : null
                }

             </FormItem>
             <FormItem>
                <div style={editorWrapperStyle}>
                    <Editor
                      editorState={editorState}
                      customStyleMap={styleMap}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      spellCheck={true}
                      placeholder="Write Your Email Message"
                      onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                {
                  editorOutputError ?
                    <label className="form-label text-danger">Email body can't be empty</label> : null
                }
             </FormItem>



             </Card>
           </div>

      </Modal>
    </div>
    )
  }
}


export default SendFeedbackRemovalRequestModal;
