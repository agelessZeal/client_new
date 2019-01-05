import React from 'react'
import { Button } from 'antd'
import ProfileMenu from './ProfileMenu'
import HomeMenu from './HomeMenu'
import './style.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className="topbar">
        <div className="topbar__left">

        </div>
        <div className="topbar__right">
          {/*<HomeMenu />*/}
          <ProfileMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
