import React from 'react'
import {
  Rate,
  Card,
  Row,
  Col,
  Popover,
} from 'antd'

import cookie from "react-cookie"
import moment from 'moment'
import connect from "react-redux/es/connect/connect"
import { getUser, resendWelcomeMail, fetchDashboardDataSummary } from './../../../../ducks/dashboard'
import {fetchFeedbackAnalysis, fetchRecentFeedback} from '../../../../ducks/feedback'
import {fetchEmailUnsubscribeAnalysis} from '../../../../ducks/template'
import {fetchTopTenProduct} from '../../../../ducks/product.js'
import {fetchOrderAnalysis} from '../../../../ducks/order'
import './style.scss'
import dummy from './dummydata.js'
import DashboardFeedbackChart from '../../../pageComponents/Dashboard/DashboardFeedbackChart'
import DashboardEmailUnsubscribeChart from '../../../pageComponents/Dashboard/DashboardEmailUnsubscribeChart'
import DashboardOrderChart from '../../../pageComponents/Dashboard/DashboardOrderChart'
import DashboardTopTenProduct from '../../../pageComponents/Dashboard/DashboardTopTenProduct'
import DashboardGlobalFilter from '../../../pageComponents/Dashboard/DashboardGlobalFilter'
import DashboardRecentFeedback from '../../../pageComponents/Dashboard/DashboardRecentFeedback'
import DashboardSummary from '../../../pageComponents/Dashboard/DashboardSummary'


const mapStateToProps = (state, props) => ({
  feedbackAnalysis: state.feedback.feedbackAnalysis,
  orderAnalysis: state.order.orderAnalysis,
  feedbackAnalysisLoader: state.feedback.feedbackAnalysisLoader,
  orderAnalysisLoader: state.order.orderAnalysisLoader,
  emailUnsubscribeAnalysis: state.template.emailUnsubscribeAnalysis,
  emailUnsubscribeAnalysisLoader: state.template.emailUnsubscribeAnalysisLoader,
  topTenProduct: state.product.topTenProduct,
  recentFeedback: state.feedback.recentFeedback,
  dashboardDataSummary: state.dashboard.dashboardDataSummary,
  dashboardDataSummaryLoader: state.dashboard.dashboardDataSummaryLoader,
  // user: state.user.profile,


})

const mapDispatchToProps = (dispatch, props) => ({
    user: getUser(),
    resendWelcomeMail: () => dispatch(resendWelcomeMail()),
    fetchFeedbackAnalysis: (param) =>  dispatch(fetchFeedbackAnalysis(param)),
    fetchOrderAnalysis: (param) => dispatch(fetchOrderAnalysis(param)),
    fetchEmailUnsubscribeAnalysis: (userId, param) => dispatch(fetchEmailUnsubscribeAnalysis(userId, param)),
    fetchRecentFeedback: userId => dispatch(fetchRecentFeedback(userId)),
    fetchTopTenProduct: payload => dispatch(fetchTopTenProduct(payload)),
    fetchDashboardDataSummary: payload => dispatch(fetchDashboardDataSummary(payload)),
})

@connect(mapStateToProps, mapDispatchToProps)

class DashboardAlpha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isUser: false,
          feedbackAnalysisDate: [],
          orderAnalysisDate: [],
          mode: ['month', 'month'],

        };
    }

    componentDidMount () {
      let {
        fetchFeedbackAnalysis,
        fetchOrderAnalysis,
        fetchEmailUnsubscribeAnalysis,
        fetchTopTenProduct,
        fetchDashboardDataSummary,
        fetchRecentFeedback,
        user:{_id: userId}
      }  = this.props

      fetchFeedbackAnalysis({userId})
      fetchOrderAnalysis({userId})
      fetchRecentFeedback(userId)
      fetchEmailUnsubscribeAnalysis(userId)
      fetchTopTenProduct({userId})
      fetchDashboardDataSummary({userId})
    }

    sendWelcomeMailAgain = () =>{
        this.props.resendWelcomeMail();
    }

    ConfirmEmailMessage = (props) => {
        const user = props.isUser;
        if(!user.confirmEmail){
            return (
                <div className="confirm_mail_notification align-items-center" >
                    <h3 className="align-content-center">Hi there, welcome to Saller Capital</h3>
                    <p>Let's get started</p>
                    <p>We have sent you a welcome email to <a href="mailto:email@customer.com"></a> with an activation link to verify your email address on file with us. </p>
                    <p>Please check your inbox and click on the active account link or button.</p>
                    <p>If you don't see the email in your inbox, please also try looking in the spam folder</p>
                    <a className="btn btn-primary" href="#/profile">Edit Account Profile</a> &nbsp; <span className="btn btn-primary" onClick={this.sendWelcomeMailAgain}>Resend Welcome Email</span>
                </div>
            );
        }
        return ('');
    }



  render() {
    let {topTenProduct: products, user: {_id: userId}} = this.props
    const {recentFeedback} = this.props
    let {
      feedbackAnalysis,
      orderAnalysis,
      emailUnsubscribeAnalysis,
      emailUnsubscribeAnalysisLoader,
      feedbackAnalysisLoader,
      user,
      orderAnalysisLoader,
    } = this.props
    // let {user} = this.state;

    //   if (this.props.user) {
    //       user = this.props.user;
    //   }


    return (
      <div>
        <this.ConfirmEmailMessage isUser={user} />
        <DashboardGlobalFilter apiFn={this.props.fetchDashboardDataSummary} userId={user._id} />
        <DashboardSummary summary={this.props.dashboardDataSummary} loading={this.props.dashboardDataSummaryLoader} />

       <DashboardOrderChart
        orderAnalysis={orderAnalysis}
        fetchOrderAnalysis={this.props.fetchOrderAnalysis}
        orderAnalysisLoader={orderAnalysisLoader}
        user={user}
        />

        <DashboardFeedbackChart
          fetchFeedbackAnalysis={this.props.fetchFeedbackAnalysis}
          userId={userId}
          analysisData={feedbackAnalysis}
          analysisLoader={feedbackAnalysisLoader}
         />

        <DashboardEmailUnsubscribeChart
          analysisData={emailUnsubscribeAnalysis}
          analysisLoader={emailUnsubscribeAnalysisLoader}
          fetchEmailUnsubscribeAnalysis={this.props.fetchEmailUnsubscribeAnalysis}
          user={user}
         />

        <DashboardRecentFeedback
          feedbacks={recentFeedback}
        />

        <DashboardTopTenProduct
          products={products}
          fetchTopTenProduct={this.props.fetchTopTenProduct}
          user={user}
         />

      </div>
    )
  }
}

export default DashboardAlpha
