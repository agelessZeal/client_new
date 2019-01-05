import React from 'react'
import { Button, Progress, Calendar, Tabs, Upload, Icon, Input, Menu, Dropdown } from 'antd'
import data from './data.json'
import './style.scss'
import Avatar from './../../../components/CleanComponents/Avatar'
import Donut from './../../../components/CleanComponents/Donut'
import Chat from './../../../components/CleanComponents/Chat'
import SettingsForm from './SettingsForm'
import { connect } from 'react-redux';
import {setLoading} from "../../../ducks/app";
import { fetchUser } from './../../../ducks/index'
import cookie from 'react-cookie';

const TabPane = Tabs.TabPane
const { TextArea } = Input

const actions = (
  <Menu>
    <Menu.Item>
      <Icon type="edit" /> Edit Post
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" /> Delete Post
    </Menu.Item>
    <Menu.Item>
      <Icon type="frown-o" /> Mark as a Spam
    </Menu.Item>
  </Menu>
)

class ProfileApp extends React.Component {
    componentWillMount() {
        // Fetch user data prior to component mounting
        const userId = cookie.load('uid');
        this.props.fetchUser(userId);
    }
  state = {
    name: '',
    nickname: '',
    photo: '',
    background: '',
    post: '',
    postsCount: '',
    followersCount: '',
    lastActivity: '',
    status: '',
      profile: {}
  }

  componentWillMount() {
    this.setState({
      name: data.name,
      nickname: data.nickname,
      photo: data.photo,
      background: data.background,
      post: data.post,
      postsCount: data.postsCount,
      followersCount: data.followersCount,
      lastActivity: data.lastActivity,
      status: data.status,
      skills: data.skills,
      coursesEnd: data.coursesEnd,
      adress: data.adress,
      profSkills: data.profSkills,
      lastCompanies: data.lastCompanies,
      personal: data.personal,
      posts: data.posts
    })
  }

  render() {
      setLoading(true);
    let {
      name,
      nickname,
      photo,
      background,
      post,
      postsCount,
      followersCount,
      lastActivity,
      status,
      skills,
      coursesEnd,
      adress,
      profSkills,
      lastCompanies,
      personal,
      posts,profile
    } = this.state
      if(Object.keys(this.props.profile).length){
          setLoading(false);
          profile = this.props.profile;
      }
    return (
      <div className="profile">
        <div className="row">
          <div className="col-xl-4">
            <div
              className="card profile__header"
            >
              <div className="profile__header-card">
                <div className="card-body text-center">
                  <Avatar src={photo} size="110" border="true" borderColor="white" />
                  <br />
                    <h5 className="mt-2">{profile.firstName ? profile.firstName: ''} { profile.lastName ? profile.lastName: ''}</h5>
                </div>
              </div>
            </div>


            <div className="card">
              <div className="card-body">
                <h5 className="mb-3 text-black">
                  <strong>Calendar</strong>
                </h5>
                <Calendar fullscreen={false} />
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body">
                  <SettingsForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        profile: state.user.profile
    };
}

export default connect(mapStateToProps, {fetchUser}) (ProfileApp)
