import React, { Component } from 'react';
import { UserOutlined, UserAddOutlined, KeyOutlined,CalendarOutlined } from '@ant-design/icons';
import './style.scss';

class LeftNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstKey: 0,
      secondKey: 0,
    }

  }
  setFirstKey = (item) => {
    this.setState({ firstKey: item.key, secondKey: 0 });
    this.props.updateState({
      activeMenuList: [item.list[0]],
      activeId: item.id,
    })
  }
  setSecondKey = (item) => {
    const { activeMenuList } = this.props;
    this.setState({ secondKey: item.key });
    let flag = false;
    activeMenuList.forEach(it => {
      if (it.id === item.id) {
        flag = true;
      }
    })
    this.props.updateState({
      activeMenuList: flag ? activeMenuList : [...activeMenuList, item],
      activeId: item.id,
    })
  }
  getFirstItm = (key) => {
    if (key === 0) {
      return <UserOutlined />
    }
    if (key === 1) {
      return <UserAddOutlined />
    }
    if (key === 2) {
      return <KeyOutlined />
    }
    if (key === 3) {
      return <CalendarOutlined />
    }
    return "";
  }

  render() {
    const { menuList } = this.props;
    const { firstKey, secondKey } = this.state;
    const secondMenuList = menuList[firstKey].list;
    return (
      <div className="left-nav">
        <div className="first-menu">
          {
            menuList.map(item => {
              return (
                <div
                  className={firstKey === item.key ? "item item-active" : "item"}
                  key={item.key}
                  onClick={() => { this.setFirstKey(item) }}
                >
                  {this.getFirstItm(item.key)}
                </div>
              )
            })
          }

        </div>
        <div className="second-menu">
          {
            secondMenuList.map(item => {
              return (
                <div
                  className={secondKey === item.key ? "item item-active" : "item"}
                  onClick={() => { this.setSecondKey(item) }}
                  key={item.key}
                >
                  {item.title}
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}
export default LeftNav;