import React, { Component } from 'react';
import ids from 'short-id'
import TemplatePageTemplatePreviewModal from './TemplatePageTemplatePreviewModal.js'
import ToggleTemplateStatus from './ToggleTemplateStatus'
import SingleTemplateAnalysis from './SingleTemplateAnalysis'
import {
  Icon,
  Tooltip,
  Table,
  Modal,
} from 'antd'

const confirm = Modal.confirm;
const defaultPagination = {
  pageSizeOptions: ["20", "50", "100"],
  showSizeChanger: true,
  current: 1,
  size: "small",
  showTotal: (total: number) => `Total ${total} items`,
  total: 0, pageSize: 50
};

export default class TemplateTable extends Component {
  state = {
    pager: { ...defaultPagination },
    deteteTemplateId: "",
    showTemplatePreview: false,
    filter_items: [],
    toggleStatusTemplateId: null,
  }
  updateToggleStatusTemplateId = id => this.setState({toggleStatusTemplateId: id})
  deleteTemplate = (id) => {
    this.setState({
      deteteTemplateId: id
    });
    let self = this;
    confirm({
      title: "Do you Want to delete the template?",
      content: "You are about to delete template, please make sure !",
      okText: "Yes",
      onOk() {
        self.props.deleteModifySubmit(id);
      },
      onCancel() {

      }
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager };
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize;
        pager.pageSize = pagination.pageSize;
        pager.current = 1;
      } else {
        pager.current = pagination.current;
      }
      this.setState({
        pager: pager
      });
    }
  }
  render() {
    const columns = [
      {
        title: "Template Name",
        dataIndex: "template_name",
        key: ids.generate()
      },
      {
        title: "Email Subject",
        dataIndex: "email_subject",
        key: ids.generate()

      },
      {
        title: "Type",
        dataIndex: "template_type",
        key: ids.generate()
      },
      {
        title: 'Number of email sent',
        dataIndex: 'number_of_email_sent',
        key: ids.generate(),
        className: 'number_of_email_sent',
      },
      {
        title: "Action",
        key:  ids.generate(),
        dataIndex: "_id",
        render: (id, rowData) => (
          <span>
            <a href={"/#/templates/edit/" + id} className="mr-2">
              <i className="icmn-pencil mr-1"/> Edit
            </a>&nbsp;
            <TemplatePageTemplatePreviewModal
              templateId={id}
              orderId={rowData.order_id}
              orders={this.props.orders}
              templates={this.props.templates}
              sendTestMail={this.props.sendTestMail}
             />
            &nbsp;
            <a className='mr-2' href="javascript: void(0);" onClick={() => this.deleteTemplate(id)}>
              <i className="icmn-cross mr-1"/> Remove
            </a>
            &nbsp;
            <SingleTemplateAnalysis
              template={rowData}
              user={this.props.user}
             />
          </span>
        )
      },
      {
        title: "Status",
        dataIndex: "template_status",
        key: ids.generate(),
        render: (text, rowData) => <ToggleTemplateStatus
                                    templateStatusLoader={this.props.templateStatusLoader}
                                    updateToggleStatusTemplateId={this.updateToggleStatusTemplateId}
                                    toggleStatusTemplateId={this.state.toggleStatusTemplateId}
                                    text={text}
                                    rowData={rowData}
                                    toggleTemplateStatus={this.props.toggleTemplateStatus}
                                    />
      },
    ]
    return (
          <Table
            columns={columns}
            dataSource={this.props.templates}
            rowKey={record => ids.generate()}
            pagination={this.state.pager}
            onChange={this.handleTableChange}
            loading={this.props.templateLoader}
          />

    );
  }
}
