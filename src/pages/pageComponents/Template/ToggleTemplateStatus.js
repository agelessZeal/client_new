import React, { Component } from 'react';
import {
  Tooltip,
  Icon,
} from 'antd'

export default class ToggleTemplateStatus extends Component {
  state = {
    id: null,
  }
  toggleStatus = (rowData) => {
    const {_id: id, template_status} = rowData;
    this.props.updateToggleStatusTemplateId(id)
    let toggle_template_status = template_status === 'active' ? "inActive" : 'active';
    let payload = {
      id,
      template_status: toggle_template_status,
    }
    this.props.toggleTemplateStatus(payload)
  }
  render() {
    const {text, rowData, templateStatusLoader, toggleStatusTemplateId} = this.props;
    let status = text === 'active' ?
       <Icon
        type='play-circle'
        style={{fontSize: 25}}
        theme="twoTone"
        twoToneColor="#52c41a"
        /> :

       <Icon
        type='pause-circle'
        style={{fontSize: 25}}
        theme="twoTone"
        twoToneColor="#eb2f96"
        />
    let currentStatus = `currently  ${text}`
    let statusWithEvent =
      <Tooltip
        onClick={() => this.toggleStatus(rowData)}

        placement="top"
        title={currentStatus}>
        <div style={{cursor: 'pointer'}}>
          {status}
        </div>
      </Tooltip>
    let isLoader = (rowData._id == toggleStatusTemplateId) && templateStatusLoader

    let codeBlock = isLoader ?
      <Icon
        style={{fontSize: 25}}
        type='loading' /> : statusWithEvent
    return codeBlock
  }
}
