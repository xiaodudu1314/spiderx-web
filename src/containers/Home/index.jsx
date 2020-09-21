import React, { Component } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Header from 'components/Header';
import LeftNav from 'components/LeftNav';
import CompanyInfo from 'containers/CompanyInfo';
import UnionInfo from 'containers/UnionInfo';
import DataConnect from 'containers/DataConnect';
import IndexManagement from 'containers/IndexManagement';
import RoleData from 'containers/RoleData';
import DictionaryManage from 'containers/DictionaryManage';
import DimensionManagement from "../DimensionManagement";


import './style.scss';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeMenuList: [{ key: 0, id: "1-1", title: "企业信息" }],
      activeId: "1-1",
    }

    this.menuList = [
      {
        key: 0, id: "1-1",
        list: [
          { key: 0, id: "1-1", title: "企业信息" },
          { key: 1, id: "1-2", title: "组织管理" },
          { key: 2, id: "1-3", title: "角色管理" },
          { key: 3, id: "1-4", title: "用户信息管理" },
          { key: 4, id: "1-5", title: "数据链接" },
          { key: 5, id: "1-6", title: "指标管理" },
          { key: 6, id: "1-7", title: "维度管理" },
        ]
      },
      {
        key: 1, id: "2-1",
        list: [
          { key: 0, id: "2-1", title: "角色数据权限" },
          { key: 1, id: "2-2", title: "用户数据权限" },
        ]
      },
      {
        key: 2, id: "3-1",
        list: [
          { key: 0, id: "3-1", title: "修改密码" },
          { key: 1, id: "3-2", title: "个人资料" },
          { key: 2, id: "3-3", title: "账号管理" },
          { key: 3, id: "3-4", title: "外部账号" },
        ]
      },
      {
        key: 3, id: "4-1",
        list: [
          { key: 0, id: "4-1", title: "词典管理" },
        ]
      },
    ]
  }
  updateState = (state) => {
    this.setState(state);
  }
/*
  右侧展示的对应界面
*/
  getView = () => {
    const { activeId } = this.state;
    if (activeId === "1-1") {
      return <CompanyInfo />
    }else if(activeId === "1-2"){
      return <UnionInfo />
    }
    else if(activeId === "1-5"){
      return <DataConnect />
    }else if(activeId === "1-6"){
      return <IndexManagement />
    }
    else if(activeId === "1-7"){
      return <DimensionManagement />
    }
    else if(activeId === "2-1"){
      return <RoleData />
    }
    else if(activeId === "4-1"){
      return <DictionaryManage />
    }
    return "";
  }
  setActiveId = (id) => {
    debugger
    this.setState({ activeId: id });
  }
  deleteActiveMenu = (item, index) => {
    debugger
    console.log(222)
    const { activeMenuList, activeId } = this.state;
    if (item.id === activeId) {
      return;
    }
    activeMenuList.splice(index, 1);
    this.setState({ activeMenuList });
  }
  render() {
    const { activeMenuList, activeId } = this.state;
    return (
      <div className="home">
        <Header />
        <div className="home-content">
          <LeftNav menuList={this.menuList} updateState={this.updateState} activeMenuList={activeMenuList} />
          <div className="home-container">
            <div className="home-container-header">
              {
                activeMenuList.map((item, index) => {
                  return (
                    <div
                      className={activeId === item.id ? "item item-active" : "item"}
                      key={index}
                    >
                      <div className="item-text" onClick={() => { this.setActiveId(item.id) }} >{item.title} </div>
                      {activeId !== item.id ? <CloseOutlined onClick={() => { this.deleteActiveMenu(item, index) }} /> : ""}
                    </div>
                  )
                })
              }
            </div>
            {this.getView()}
          </div>
        </div>
      </div>
    )
  }
}
export default Home;