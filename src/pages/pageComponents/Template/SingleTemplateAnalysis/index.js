import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import STAChart from './STAChart'

import {fetchSingleTemplateAnalysis, resetSingleTemplateAnalysis} from '../../../../ducks/template.js'

import {
  Button,
  Icon,
  Modal
} from 'antd'


const mapStateToProps = (state) => ({
  singleTemplateAnalysis: state.template.singleTemplateAnalysis,
  singleTemplateAnalysisLoader: state.template.singleTemplateAnalysisLoader,
})

const mapDispatchToProps = (dispatch, props) => ({
  fetchSingleTemplateAnalysis: payload => dispatch(fetchSingleTemplateAnalysis(payload)),
  resetSingleTemplateAnalysis: () => dispatch(resetSingleTemplateAnalysis()),
})


@connect(mapStateToProps, mapDispatchToProps)

export default class SingleTemplateAnalysis extends Component {
  state = {
    showModal: false,
  }
  closeModal = () => {
    this.props.resetSingleTemplateAnalysis();
    this.setState({showModal: false})
  }
  showModal = () => {
    const {fetchSingleTemplateAnalysis, template: {_id: templateId}, user: {_id: userId}} = this.props
    fetchSingleTemplateAnalysis({templateId})
    this.setState({showModal: true})
  }


  render() {
    return (

    <div className='d-inline m-2'>
      <a onClick={this.showModal} href="javascript: void(0);">
        <Icon
            type="bar-chart"
            theme="outlined"
            style={{fontSize: 25, color: 'cadetblue'}}
         /> Analytics
      </a> &nbsp;
        <Modal title="Template Analytics"
               visible={this.state.showModal}
          // onOk={this.submitCreateTemplate}
               className={"centered"}

               width="800px"
               style={{ top: 20 }}
               maskClosable={false}
               onCancel={this.closeModal}
               footer={[
                  <div key="hello world 2" className='text-right'>
                      <Button key='closeModal_button' onClick={this.closeModal}>Return</Button>
                  </div>
             ]}>

             <STAChart
              {...this.props}

              />

        </Modal>
    </div>
    );
  }
}

SingleTemplateAnalysis.propTypes = {
  template: PropTypes.object.isRequired,
}



