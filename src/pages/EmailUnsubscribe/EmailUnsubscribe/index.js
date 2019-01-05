import React from 'react'
import {
  Card
} from 'antd'
import './style.scss'

class EmailUnsubscribe extends React.Component {
  state = {}

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__header">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-login__header__logo">
                <a href="javascript: void(0);">
                  <img src="resources/images/login/logo.png" alt="Clean UI Admin Template" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <Card title={
              <h1 className='mb-2' style={{fontWeight: 'bold'}}>Unsubscribe Successful</h1>
            }>
              <h3 >You will no longer receive emails from us</h3>
            </Card>
          </div>
        </div>

      </div>
    )
  }
}

export default EmailUnsubscribe;
