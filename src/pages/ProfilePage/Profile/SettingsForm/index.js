import React from 'react'
import { Form, Icon, Input, Button, Upload } from 'antd'
import { fetchUser } from './../../../../ducks/index'
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import {setLoading} from "../../../../ducks/app";
import { notification } from 'antd'
// import { REDUCER } from './../../../../ducks/register'
import { REDUCER, submit } from './../../../../ducks/profile'

const FormItem = Form.Item




const mapStateToProps = (state, props) => ({
    isSubmitForm: state.app.submitForms[REDUCER],
    profile: state.user.profile
})



@connect(mapStateToProps, {fetchUser, submit})

@Form.create()
class SettingsFormComponents extends React.Component {

    handleSubmit = e => {
        e.preventDefault()
        const { form, dispatch } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.password || values.confirmpassword){
                    if(values.password !== values.confirmpassword){
                        notification.open({
                            type: 'error',
                            message: 'Please match with confirm password !',
                            description: '',
                        })
                        return;
                    }
                }
                if(values.confirmpassword){delete values.confirmpassword}
                this.props.submit(values)
                notification.open({
                    type: 'success',
                    message: 'Setting Saved!',
                    description:
                        'Your input information has been saved !',
                })
                // dispatch(submit(values))
                console.log('Received values of form: ', values)
            }
        })
    }

    componentWillMount() {
        // Fetch user data prior to component mounting
        const userId = cookie.load('uid');
        this.props.fetchUser(userId);
    }
  state = {
        profile: {},
  }

  render() {
      setLoading(true);
    let { getFieldDecorator } = this.props.form
      let {profile} = this.state

      if(Object.keys(this.props.profile).length){
          setLoading(false);
          this.setState({profile:this.props.profile});
          // this.state.profile = this.props.profile;
      }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h5 className="text-black mt-4">
          <strong>Personal Information</strong>
        </h5>
        <div className="row">
            <div className="col-lg-6">
                <FormItem>
                    <label className="form-label mb-0">First Name</label>
                    {getFieldDecorator('firstName', {
                        initialValue: this.state.profile.firstName,
                        rules: [{ required: false }],
                    })(<Input placeholder="First name" />)}
                </FormItem>
            </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">Last Name</label>
              {getFieldDecorator('lastName', {
                  initialValue: this.state.profile.lastName,
                rules: [{ required: false }],
              })(<Input placeholder="Last name" />)}
            </FormItem>
          </div>
        </div>
          <div className="row">
              <div className="col-lg-6">
                  <FormItem>
                      <label className="form-label mb-0">Email</label>
                      {getFieldDecorator('email', {
                          initialValue: this.state.profile.email,
                          rules: [{ required: false }],
                      })(<Input placeholder="Email" />)}
                  </FormItem>
              </div>
          </div>
        <h5 className="text-black mt-4">
          <strong>New Password</strong>
        </h5>
        <div className="row">
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">Password</label>
              {getFieldDecorator('password')(<Input type="password" placeholder="New password" />)}
            </FormItem>
          </div>
          <div className="col-lg-6">
            <FormItem>
              <label className="form-label mb-0">Confirm Password</label>
              {getFieldDecorator('confirmpassword')(<Input type="password" placeholder="Confirm password" />)}
            </FormItem>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h5 className="text-black mt-4 mb-3">
              <strong>Profile Avatar</strong>
            </h5>
            <Upload>
              <Button size="small">
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </div>
        </div>
        <div className="form-actions">
          <Button style={{ width: 150 }} type="primary" htmlType="submit" className="mr-3">
            Submit
          </Button>
          <Button htmlType="submit">Cancel</Button>
        </div>
      </Form>
    )
  }
}

// function mapStateToProps(state) {
//     return {
//         profile: state.user.profile
//     };
// }

// export default connect(mapStateToProps, {fetchUser})(SettingsForm);
// export default SettingsForm;


const SettingsForm = Form.create()(SettingsFormComponents)
export default SettingsForm
