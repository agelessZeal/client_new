import React from 'react'
import LoginForm from './LoginForm'
import './style.scss'

class Login extends React.Component {
  state = {
    backgroundImage: 'url(resources/images/login/4.jpg)',
    fullSize: true,
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    const {backgroundImage, fullSize} = this.state;
    return (
      <div
        className={fullSize === false ? 'login' : 'login login--fullscreen'}
        style={{ backgroundImage: backgroundImage }}
      >
        <div className="login__header">
          <div className="row">
            <div className="col-lg-8">
              <div className="login__header__logo">
                <a href="javascript: void(0);">
                  <img
                    src="resources/images/login/logo-inverse.png"
                    alt="Clean UI Admin Template"
                  />
                  </a>
                </div>
              </div>
            </div>
          </div>
        <div className="login__block--extended">
          <div className="row">
            <div className="col-xl-12">
              <div className="login__block__promo text-white text-center">
                <h1 className="mb-3 text-white">
                  <strong>WELCOME TO SELLER CAPITAL</strong>
                </h1>
                <p>Please input following information to login.</p>
              </div>
              <div className="login__block__inner">
                <div className="login__block__form">
                  <h4 className="text-uppercase">
                    <strong>Please log in</strong>
                  </h4>
                  <br />
		          <LoginForm email={this.state.restoredEmail}/>
                </div>
                <div className="login__block__sidebar">
                  <h4 className="login__block__sidebar__title text-white">
                    <strong>Agile Dev Meetup</strong>
                    <br />
                    <span>August 2018</span>
                  </h4>
                  <div className="login__block__sidebar__item">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                  <div className="login__block__sidebar__item">
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                  <div className="login__block__sidebar__place">
                    <i className="icmn-location mr-3" />
                    New York, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login__footer text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li className="active list-inline-item">
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Confidential Information</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Support</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul>
        </div>
        </div>
    )
  }
}
export default Login
