import React, { Component } from 'react';

import {Table, Radio, Divider, Pagination, Input, Tree, Checkbox} from 'antd';
import {
    SyncOutlined, WindowsOutlined, EditOutlined, PlusOutlined, CopyOutlined, SearchOutlined, CreditCardFilled,
    UserOutlined, DownOutlined, FolderTwoTone, DatabaseOutlined, TableOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './style.scss';
import {handleGetDataList,handleGetDataDetail,handleGetTableList} from "../../api/dataConnect.js"
const columns = [
    {
        title: '链接名称',
        dataIndex: 'name',
    },
    {
        title: '状态',
        dataIndex: '',
        render:()=>{
            return "已连接"
        }
    },
    {
        title: '类型',
        dataIndex: 'dbType',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
    },
];

const columnsRight = [
    {
        title: '链接名称',
        dataIndex: 'name',
        width:"30%",
    },
    {
        title: '*****',
        className: 'column-money',
        dataIndex: 'data',
    },
];
let dataRight = [
    {
        key: '1',
        name: '名称',
        money: 'movie',
        width:"130",
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: '数据库名称',
        money: '*************',
        width:"130",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: '数据库类型',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '4',
        name: '用户名',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '5',
        name: '密码',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '6',
        name: 'IP',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '7',
        name: '端口',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '8',
        name: '所属部门',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        status: "已连接",
        type: `MySQL`,
        time: `2020-7-${i} 17:29:20`,
    });
}
class DataConnect extends Component {

  constructor(dataIndexs) {
    super(dataIndexs)
      this.state = {
          selectedRowKeys: [],
          top: 'none',
          bottom: 'bottomLeft',
          baseList:[],
          dataList:[],
          total:0,
          currentSelectId:'',
          dataDetail:[],
          dbName:'',
          dbTitle:'',
          dataTableList:[]
      }
  }

    componentDidMount(){
      //数据连接列表
        let data={
            createUserId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            pageSize:15,
            startPage:1,
        }
        handleGetDataList(data)
            .then(res=>res.json())
            .then(res=>{
                if(res.success=true){
                    console.log(res)
                    let {result,count}=res.result
                    this.setState({
                        dataList:result,
                        total:count
                    })
                }
            })
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({
            selectedRowKeys,
                currentSelectId:selectedRowKeys[0]
            },()=>{
            let data={
                id:this.state.currentSelectId
            }
            //数据详情展示
            handleGetDataDetail(data)
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    if(res.success==true){
                       let {result} =res
                        this.setState({
                              dataDetail:result,
                              dbName:result.dbName,
                              dbTitle:result.name,//表的标题
                          },()=>{
                            //数据库表
                            let idInfo={
                                dbId:this.state.currentSelectId,
                                dbName:this.state.dbName,
                            }
                            handleGetTableList(idInfo)
                                .then(res=>res.json())
                                .then(res=>{
                                    console.log(res)
                                     this.setState({
                                                 dataTable:result.table,
                                             })
                                    let arr=[]

                                    res.result.table.map((item,index)=>{
                                        let infoList={}
                                        infoList.title=item.tbComment
                                        infoList.key=`0-0-${index}`
                                        infoList.icon=<TableOutlined />
                                        arr.push(infoList)
                                    })
                                    console.log(arr)
                                      this.setState({
                                                  dataTableList:arr,
                                              })
                                })
                        })
                        let dataRight = [
                            {
                                key: '1',
                                name: '名称',
                                data: result.name,
                                width:"130",
                            },
                            {
                                key: '2',
                                name: '数据库名称',
                                data: result.dbName,
                                width:"130",
                            },
                            {
                                key: '3',
                                name: '数据库类型',
                                data: result.dbType,
                                width:"30",
                            },
                            {
                                key: '4',
                                name: '用户名',
                                data: result.username,
                                width:"30",
                            },
                            {
                                key: '5',
                                name: '密码',
                                data: result.password,
                                width:"30",
                            },
                            {
                                key: '6',
                                name: 'IP',
                                data: result.ip,
                                width:"30",
                            },
                            {
                                key: '7',
                                name: '端口',
                                data: result.port,
                                width:"30",
                            },
                            {
                                key: '8',
                                name: '所属部门',
                                data: result.orgName,
                                width:"30",
                            },
                        ];
                        this.setState({
                           dataRight
                     })
                    }
                })

        });
    };
     // 点击页数跳转
    changeCenterTable = (pageNumber)=>{
        console.log('Page: ', pageNumber);
        let data={
            createUserId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            pageSize:15,
            startPage:pageNumber,
        }
        handleGetDataList(data)
            .then(res=>res.json())
            .then(res=>{
                if(res.success=true){
                    console.log(res)
                    let {result,count}=res.result
                    this.setState({
                        dataList:result,
                        total:count
                    })
                }
            })
    }

    render() {

        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const treeData = [
            {
                title: this.state.dbTitle,
                key: '0-0',
                icon: <DatabaseOutlined />,
/*
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0',
                        icon:  <TableOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-1',
                        icon: ({ selected }) => (selected ? <TableOutlined /> : <TableOutlined />),
                    },
                ],
*/
                children:this.state.dataTableList
            },
        ];

    return (
      <div className="company-info">
          <div className="company-container">
              <div className="container-left data-connect">
                  {/*顶部菜单*/}
                  <div className="top">
                      <div>
                          <PlusOutlined style={{marginRight:15}}/>
                          <EditOutlined style={{marginRight:15}}/>
                          <WindowsOutlined style={{marginRight:15}}/>
                          <CopyOutlined style={{marginRight:15}}/>
                          <SyncOutlined style={{marginRight:15}}/>
                      </div>
                      <div>
                          {/*<SearchOutlined />*/}
                          <Input  size="small" placeholder="关键字" prefix={<SearchOutlined />} />
                      </div>
                  </div>
                  {/*中部内容部分*/}
                  <div className="center">
                      <div className="center-connect">
                          <Table
                              className={"table-style-one"}
                              scrollx={true}
                              pagination={{ position: [this.state.top, this.state.bottom],pageSize:15 }}
                              rowSelection={rowSelection}
                              columns={columns}
                              dataSource={this.state.dataList}
                              rowKey={record => record.id}
                          />
                      </div>

                  </div>
                  {/*底部分页*/}
                  <div className="bottom">
                      <Pagination
                          showTotal={total => `共${total}条`}
                          total={this.state.total}
                          defaultPageSize={15}
                          defaultCurrent={1}
                          onChange={this.changeCenterTable}
                          showQuickJumper
                          pageSizeOptions={[15]}
                      />
                  </div>
              </div>
              <div className="container-right">
                  <div className="container-right-basicInfo">
                      <Table
                          showHeader={false}
                          columns={columnsRight}
                          dataSource={this.state.dataRight}
                          bordered
                          title={() => '数据库信息'}
                      />
                      <div className="data-structure">
                          <div className="data-structure-title">
                              <p>数据结构</p>
                          </div>
                          <div className="data-structure-search">
                              <Input size="small"  prefix={<SearchOutlined />} allowClear={true}/>
                          </div>
                          <div className={'data-base-table'}>
                              {
                                  [1].map((item, index) => {
                                      return (
                                              this.state.currentSelectId? <Tree
                                                  key={index}
                                                  autoExpandParent={false}
                                                  showIcon
                                                  defaultSelectedKeys={['0-0-0']}
                                                  switcherIcon={<DownOutlined/>}
                                                  treeData={treeData}
                                              />:null
                                      )
                                  })
                              }
                          </div>
                      </div>
                  </div>
                  <div className="container-right-menu">
                      <CreditCardFilled />
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
export default DataConnect;