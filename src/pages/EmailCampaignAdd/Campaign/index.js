import React, { Component }  from 'react'
import moment from 'moment'
import {Table, Icon, Input, Button, DatePicker, Select, Radio, Form, Dropdown, Modal, Col, TimePicker} from 'antd'
import { connect } from 'react-redux'
import { fetchCampaigns, cCreationSubmit, cModifySubmit, cDeleteSubmit, sendTestMail } from './../../../ducks/campaign'
import './style.scss'

// Editor Draft js
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import CustomOption from './CustomOption'



const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;



const defaultPagination = {
  pageSizeOptions: ['20', '50', '100'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
}


const children = [];
let optionKeys = [{key: "AFN", value: "AFN"},{key: "MFN", value: "MFN"},{key: "Shipped", value: "Shipped"},
    {key: "Pending", value: "Pending"},{key: "Unshipped", value: "Unshipped"},
    {key: "Delivered", value: "Delivered"},{key: "Canceled", value: "Canceled"},{key: "Returned", value: "Returned"}];
for ( let i = 0; i < optionKeys.length; i++ ) {
    children.push(<Option key={optionKeys[i].key}>{optionKeys[i].value}</Option>);
}



const mapStateToProps = (state, props) => ({
    campaigns: state.campaign.campaigns
})


const mapDispatchToProps = (dispatch, props) => ({
    fetchCampaigns: dispatch(fetchCampaigns()),
    campaignCreateSubmit: values => dispatch(cCreationSubmit(values)),
    campaignModifySubmit: values => dispatch(cModifySubmit(values)),
    deleteCampaignModifySubmit: id => dispatch(cDeleteSubmit(id)),
    sendTestMail: campaignID => dispatch(sendTestMail(campaignID)),
})



@connect(mapStateToProps, mapDispatchToProps)




class EmailCampaignComponents extends React.Component {

  state = {
    tableData: [],
    data: [],
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
      loading: true,
      createCampaignVisible: false,
      confirmLoadingCCampaign: false,
      editorState: EditorState.createEmpty(),
      modifyCampaign: '',
      deteteCampaignId: '',
      showCampaignPreview: false,
      campaignBody: '',
      campaignTitle: '',
      campaignID: '',
      channels: [{name: 'One', value: 'one'}, {name: 'Two', value: 'two'}]
  }

    showCreateCampaign = () => {
        const { form } = this.props
        this.setState({
            createCampaignVisible: true,
            modifyCampaign: '',
            editorState: EditorState.createEmpty()
        });
        form.setFieldsValue({name: '', channel:'', message:'', send_day:'', send_time:moment('00:00:00', 'HH:mm a'), send_after:'', minimum_item_condition:'', fulfillment_type:'' });
    }

    handleCCampaignOk = () => {
        this.setState({
            confirmLoadingCCampaign: true,
        });
        setTimeout(() => {
            this.setState({
                createCampaignVisible: false,
                confirmLoadingCCampaign: false,
                modifyCampaign: ''
            });
        }, 1000);
    }


    handleCCampaignCancel = () => {
        this.setState({
            createCampaignVisible: false,
            showCampaignPreview: false
        });
    }

    sendTestMail = (id) => {
      this.props.sendTestMail(id);
    }

    previewCampaign = (id) =>{
      const campaignData = this.props.campaigns.filter((temp) => temp['_id'] === id)[0];

      this.setState({
          campaignBody : campaignData.message,
          campaignTitle: campaignData.name,
          campaignID: campaignData['_id']
      })
      this.setState({
          showCampaignPreview: true
      })
    }

    deleteCampaign = (id) => {
        this.setState({
            deteteCampaignId: id
        })
        let self = this;
        confirm({
            title: 'Do you Want to delete the campaign?',
            content: 'You are about to delete campaign, please make sure !',
            okText: 'Yes',
            onOk() {
                self.props.deleteCampaignModifySubmit(id);
                self.setState({
                    data : self.state.data.filter(camp=>camp.id !== id)
                })
            },
            onCancel() {

            },
        });
    }




    submitCreateCampaign = (e) => {
        e.preventDefault()
        const { form, dispatch } = this.props
        const {modifyCampaign} = this.state
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.message = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
                if(!modifyCampaign){
                    this.props.campaignCreateSubmit(values);
                }else{
                    values.id = modifyCampaign;
                    this.props.campaignModifySubmit(values);
                }
                this.handleCCampaignOk();
            }
        })
    }

    onDatePickerChange = (date, dateString) => {
        if(dateString && dateString.length){
            this.setState({ date_start: dateString[0], date_end: dateString[1] });
        }
    }

    filterItemChange = values => {
        this.setState({ filter_items: values });
    }



    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

    editCampaignModal = (id) => {
        const { form } = this.props
        const campaignData = this.props.campaigns.filter((temp) => temp['_id'] === id)[0];
        this.setState({ modifyCampaign: id });
        if(typeof campaignData === 'object' && Object.keys(campaignData).length){
            const {name, channel, message, send_day, send_time, send_after, minimum_item_condition, fulfillment_type } = campaignData;
            form.setFieldsValue({name, channel, send_day, send_time: moment(send_time, 'HH:mm a'), send_after, minimum_item_condition, fulfillment_type });
            const contentBlock = htmlToDraft(campaignData.message);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            });
            form.setFieldsValue({message});
        }
        this.setState({
            createCampaignVisible: true,
        });
    }

  onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    let reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          let match = record.name.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
              name: (
              <span>
                {record.name
                  .split(reg)
                  .map(
                    (text, i) =>
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager }
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize
        pager.pageSize = pagination.pageSize
        pager.current = 1
      } else {
        pager.current = pagination.current
      }
      this.setState({
        pager: pager,
      })
    }
  }

  render() {

    let { pager, data, tableData, createCampaignVisible, channels, confirmLoadingCCampaign, editorState, showCampaignPreview, campaignTitle, campaignBody, campaignID } = this.state;
    let campaigns;
    let { getFieldDecorator } = this.props.form


      if (this.props.campaigns && this.props.campaigns.length) {
          data = this.props.campaigns;
          tableData = this.props.campaigns;
          this.state.loading = false;
      }else{
          let self = this;
          setTimeout(function () {
              // self.state.loading = false
              self.setState({
                  loading: false
              });
          }, 2000)
      }
      const formItemLayout = {
          labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
          },
          wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
          },
      };
    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Channel',
            dataIndex: 'channel',
            key: 'channel',

        },
        {
            title: 'Send Day',
            dataIndex: 'send_day',
            key: 'send_day',
        },
        {
            title: 'Send After',
            dataIndex: 'send_after',
            key: 'send_after'
        },
        {
            title: 'Fulfillment Type',
            dataIndex: 'fulfillment_type',
            key: 'fulfillment_type'
        },
      {
        title: 'Action',
        key: 'action',
          dataIndex: '_id',
          render: (id) => (
              <span>
            <a href="javascript: void(0);" className="mr-2" onClick={()=> this.editCampaignModal(id)}>
              <i className="icmn-pencil mr-1" /> Edit
            </a>&nbsp;
            <a href="javascript: void(0);" onClick={()=> this.previewCampaign(id)}>
              <i className="icmn-enlarge mr-1" /> Preview
            </a> &nbsp;
            <a href="javascript: void(0);" onClick={()=> this.deleteCampaign(id)}>
              <i className="icmn-cross mr-1" /> Remove
            </a>
          </span>
          ),
      },
    ]

      const channelOptions = channels.map(ch => <Option key={ch.value}>{ch.name}</Option>)

      const sendDateArray = [{name: 'Immediately', value: 0}, {name: '1 Day', value: 1}, {name: '2 Days', value: 2}, {name: '3 Days', value: 3},
          {name: '4 Days', value: 4},{name: '5 Days', value: 5},{name: '6 Days', value: 6},{name: '7 Days', value: 7},{name: '8 Days', value: 8},
          {name: '9 Days', value: 9},{name: '10 Days', value: 10},{name: '11 Days', value: 11},{name: '12 Days', value: 12},{name: '13 Days', value: 13},
          {name: '14 Days', value: 14},{name: '15 Days', value: 15},{name: '16 Days', value: 16},{name: '17 Days', value: 17},{name: '18 Days', value: 18},
          {name: '19 Days', value: 19},{name: '20 Days', value: 20},{name: '21 Days', value: 21},{name: '4 Weeks', value: 28},{name: '5 Weeks', value: 35},
          {name: '6 Weeks', value: 42},{name: '7 Weeks', value: 49},{name: '8 Weeks', value: 56},{name: '9 Weeks', value: 63},{name: '10 Weeks', value: 70}
      ]
      const sendDateOptions = sendDateArray.map(sd=><Option key={sd.value}>{sd.name}</Option>)

      const whenOrderIsArray = [{name: 'Order Confirmed', value: 'confirmed'}, {name: 'Order Dispatched', value: 'dispatched'},
          {name: 'Order Delivered', value: 'delivered'}, {name: 'Positive Feedback Left', value: 'positive_feedback_left'}]
      const whenOrderIsOptions = whenOrderIsArray.map(oi=><Option key={oi.value}>{oi.name}</Option>)

      const numGen30 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
      const includePastOrders = numGen30.map(po => <Option key={po}>{po?po:0}</Option>)

      const minItemCondArr = ['All', 'New', 'Used Refurbished', 'Collectible Acceptable', 'Collectible Good', 'Collectible Very Good',
      'Collectible Llike New', 'Used Acceptable', 'Used Good', 'Used Very Good', 'Used Like New']
      const minItemCondOptions = minItemCondArr.map((ic, i) => <Option key={i}>{ic}</Option>)

      const fulfilmentTypeArr = ['FBA and Merchant Fulfilled', 'FBA only', 'Merchant Fulfilled Only']
      const fulfilmentTypeOptions = fulfilmentTypeArr.map((fft, i) => <Option key={i}>{fft}</Option>)

    return (

      <div className="card">
        <div className="card-header">
            <div className="create-campaign">
                <Button type="primary" onClick={this.showCreateCampaign}>
                    Add Campaign
                </Button>
                <div>
                    <Modal title="Add a new campaign"
                           visible={createCampaignVisible}
                           onOk={this.submitCreateCampaign}
                           className={"centered"}
                           maskClosable={false}
                           confirmLoading={confirmLoadingCCampaign}
                           onCancel={this.handleCCampaignCancel} width="790px">

                        <Form layout="horizontal" onSubmit={this.submitCreateCampaign} className="create_campaign">
                            <FormItem>
                                <label className="form-label mb-0">Name your campaign:</label>
                                {getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{ required: false }],
                                })(<Input placeholder="Campaign name" />)}
                            </FormItem>

                            <FormItem>
                                <label className="form-label mb-0">Choose A Channel:</label>
                                {getFieldDecorator('channel', {
                                    initialValue: '',
                                    rules: [{ required: false }],
                                })(<Select style={{ width: 90 }}>
                                    {channelOptions}
                                    </Select>)}
                            </FormItem>

                            <FormItem>
                                <label className="form-label mb-0">Message</label>

                                {getFieldDecorator('message', {
                                    initialValue: '',
                                    rules: [{ required: false }],
                                })(<Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbarCustomButtons={[<CustomOption />]}
                                />)}

                            </FormItem>


                            <FormItem
                                label="Choose when to send :"
                                {...formItemLayout}
                            >
                                <Col span={6}>
                                <FormItem>
                                &nbsp;{getFieldDecorator('send_day', {
                                initialValue: '',
                                rules: [{ required: false }],
                            })(<Select style={{ width: 120 }}>
                                {sendDateOptions}
                            </Select>)}
                                </FormItem>
                                </Col>
                                <Col span={1}> &nbsp; at</Col>
                                <Col span={6}>
                                <FormItem>
                                {getFieldDecorator('send_time', {
                                rules: [{ required: false }],
                                initialValue: moment('00:00:00', 'HH:mm a') ,
                            })(<TimePicker use12Hours defaultOpenValue={moment('00:00:00', 'HH:mm a')} format="h:mm a" style={{ width: 110 }} />)}
                                </FormItem></Col>
                                <Col span={2}>after</Col>
                                <Col span={9}>
                                <FormItem>
                                {getFieldDecorator('send_after', {
                                initialValue: '',
                                rules: [{ required: false }],
                            })(<Select>
                                {whenOrderIsOptions}
                            </Select>)}
                                </FormItem>
                                </Col>
                            </FormItem>



                            <FormItem>
                                <label className="form-label mb-0">Minimum Item Condition:</label>
                                {getFieldDecorator('minimum_item_condition', {
                                    initialValue: '',
                                    rules: [{ required: false }],
                                })(<Select style={{ width: 180 }}>
                                    {minItemCondOptions}
                                </Select>)}
                            </FormItem>

                            <FormItem>
                                <label className="form-label mb-0">Fulfillment type:</label>
                                {getFieldDecorator('fulfillment_type', {
                                    initialValue: '',
                                    rules: [{ required: false }],
                                })(<Select style={{ width: 180 }}>
                                    {fulfilmentTypeOptions}
                                </Select>)}
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
                <div>
                    <Modal title={campaignTitle}
                           visible={showCampaignPreview}
                           // onOk={this.submitCreateCampaign}
                           className={"centered"}
                           maskClosable={false}
                           onCancel={this.handleCCampaignCancel} width="790px"
                           footer={[
                               <Button key='sendTestMail' icon='mail' onClick={()=> this.sendTestMail(campaignID)}>Send Test Mail</Button>,
                               <Button key='backToCampaign' onClick={this.handleCCampaignCancel}>Return</Button>,
                           ]}>
                        <div dangerouslySetInnerHTML={{ __html: campaignBody }}></div>
                    </Modal>
                </div>
            </div>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={data}
            rowKey={record => record.key}
            pagination={pager}
            onChange={this.handleTableChange}
            loading={this.state.loading}
          />
        </div>
      </div>
    )
  }
}

// export default campaigns
const EmailCampaign = Form.create()(EmailCampaignComponents)
export default EmailCampaign;