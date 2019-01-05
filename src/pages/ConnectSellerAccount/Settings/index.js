import React from 'react'
import './style.scss'
import { connect } from 'react-redux'
import { REDUCER, submit } from '../../../ducks/seller'
import { Form, Input, Button} from "antd";

const FormItem = Form.Item;

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
});

@connect(mapStateToProps)
@Form.create()
class Settings extends React.Component {
  static defaultProps = {};

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props;
    console.log(dispatch);
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submit(values))
        }
      })
    }
  };

  render() {
    console.log("I am here !!!")
    const { form, isSubmitForm } = this.props;
    if(this.props.isSubmitForm){
      console.log(this.props);
    }

    return (
      <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <h3>Connect you Amazon account</h3>
          </div>

          <div className={"row"}>
            <div className={"col-lg-12"}>
             <hr/>
            </div>
          </div>

          <div className={"row"}>
           <div className={"col-lg-11 offset-lg-1"}>
              <h3 className={"important"}>
                North American Account-United States, Canada
              </h3>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-lg-1"}>
              <div>
                Step 1
              </div>
            </div>
            <div className={"col-lg-11"}>
             <p>
                <a className={"link"} href={"https://sellercentral.amazon.com/"} target={"_blank"}>Click here</a> to login to your Amazon Marketplasce Web Service(Amazon MWS) account
                 and authorize FeedbackWhiz as a developer.
            </p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-1">
              <div>
                Step 2
              </div>
            </div>
            <div className={"col-lg-11"}>
              <p>For <b>Developer's Name, type: FeedbackWhiz</b></p>
              <p>For <b>Developer ID, type: 4341-3236-3193</b></p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-1">
              <div>
                Step 3
              </div>
            </div>
            <div className={"col-lg-11"}>
              <p>After clicking on next and accepting the Amazon MWS agreement, copy and paste your
              Seller ID and MWS Auth Token from the next screen into here:</p>

              <FormItem label="Seller ID:">
                {form.getFieldDecorator('sellerid', {
                  initialValue: '',
                  rules: [
                    { required: true, message: 'Please input your ID' },
                  ],
                })(<Input type="text" size="default"/>)}
              </FormItem>

              <FormItem label="MWS Auth Token:">
                {form.getFieldDecorator('sellertoken', {
                  initialValue: '',
                  rules: [
                    { required: true, message: 'Please input your token' },
                  ],
                })(<Input type="text" size="default"/>)}
              </FormItem>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-1">
              <div>
                Step 4
              </div>
            </div>
            <div className={"col-lg-11"}>
              <FormItem label="Your registered or approved Amazon Seller email address used to communicate with your buyers:">
                {form.getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    { type: 'email', message: 'The input is not a valid e-mail address' },
                    { required: true, message: 'Please input your e-mail address' },
                  ],
                })(<Input size="default" placeholder={"john@example.com"}/>)}
              </FormItem>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-lg-12"}>
              <hr/>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-lg-8 offset-lg-3"}>
              <Button
                type="primary"
                className="width-150 mr-4"
                htmlType="submit"
                loading={isSubmitForm}>
                Connect
              </Button>
              <Button type="warning"
                      className="width-150 mr-4">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}
export default Settings
