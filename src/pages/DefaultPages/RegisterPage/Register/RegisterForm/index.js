import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submit } from './../../../../../ducks/register'
import { Form, Input, Icon, Checkbox, Button } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
    // isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class RegisterFormComponent extends React.Component {
  state = {
    confirmDirty: false,
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleSubmit = e => {
    e.preventDefault()
      console.log(this.props);
      const { form, dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(submit(values))
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem validateStatus="">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your First name!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name"/>,
          )}
        </FormItem>
          <FormItem validateStatus="">
              {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: 'Please input your Last name!' }],
              })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name"/>,
              )}
          </FormItem>
          <FormItem validateStatus="">
              {getFieldDecorator('email', {
                  rules: [
                      { type: 'email', message: 'The input is not a valid e-mail address' },
                      { required: true, message: 'Please input your e-mail address' },
                  ],
              })(
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address"/>,
              )}
          </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Input your password"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              onBlur={this.handleConfirmBlur}
              placeholder="Confirm your password"
            />,
          )}
        </FormItem>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" className="width-140">
            Sign Up
          </Button>
          <a href="/#login" className="width-100 ant-btn width-140 ant-btn-primary float-right" style={{lineHeight: '30px'}}>
            Login
          </a>
          {/*<span className="ml-3">*/}
            {/*{getFieldDecorator('mailsubscription', {*/}
              {/*valuePropName: 'checked',*/}
              {/*initialValue: true,*/}
            {/*})(<Checkbox>Mail Subscription</Checkbox>)}*/}
          {/*</span>*/}
        </div>
      </Form>
    )
  }
}

const RegisterForm = Form.create()(RegisterFormComponent)
export default RegisterForm
