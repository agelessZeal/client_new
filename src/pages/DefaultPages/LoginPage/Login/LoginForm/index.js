import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submit } from '../../../../../ducks/login'
import { Link } from "react-router-dom";
import { Form, Input, Button , Checkbox } from 'antd'
import { notification } from 'antd'

const FormItem = Form.Item;

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class LoginForm extends React.Component {
  static defaultProps = {};

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props;
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submit(values))
        }
      })
    }
  };

  render() {
  const { getFieldDecorator } = this.props.form
    const { form, isSubmitForm } = this.props;
    if(this.props.isSubmitForm){
      console.log(this.props);
    }

    return <div className="cat__pages__login__block__form">
      <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
        <FormItem label="Email">
          {form.getFieldDecorator('username', {
            initialValue: '',
            rules: [
              {type: 'email', message: 'The input is not a valid e-mail address'},
              {required: true, message: 'Please input your e-mail address'},
            ],
          })(<Input size="default"/>)}
        </FormItem>
        <FormItem label="Password">
          {form.getFieldDecorator('password', {
            initialValue: '',
            rules: [{required: true, message: 'Please input your password'}],
          })(<Input size="default" type="password"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a
              className="login-form-forgot pull-right text-primary"
              style={{lineHeight: '36px'}}
              href="#forgot"
          >
            Forgot password?
          </a>
        </FormItem>
        <div className="form-actions">
          <Button
              type="primary"
              className="width-140"
              htmlType="submit"
              loading={isSubmitForm}>
            Login
          </Button>
          <Link to="/auth/register" className="width-100 ant-btn width-140 ant-btn-primary float-right" style={{lineHeight: '30px'}}>Sign Up</Link>

        </div>
      </Form>
    </div>
  }
}

export default LoginForm
