import React, { Component } from 'react';
import {  CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import {  Avatar } from 'antd';
import './style.scss';


class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "abcft",
    }

  }

  render() {
    const { username} = this.state;
    return (
      <div className="header">
        <img src="" alt="" className="logo" />
        <div className='user-div'>
          <div className='user-info'>
            <Avatar icon={<UserOutlined/>}  />
            <div className='user-name'>{username}</div>
            <CaretDownOutlined />
          </div>
        </div>
      </div>
    )
  }
}
export default Header;