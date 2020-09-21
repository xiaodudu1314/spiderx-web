import React, { Component } from 'react';

import { Table, Radio, Divider, Pagination,Input} from 'antd';
import { SyncOutlined, WindowsOutlined, EditOutlined,PlusOutlined ,CopyOutlined,SearchOutlined,CreditCardFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './style.scss';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const columnsRight = [
    {
        title: '角色ID',
        dataIndex: 'name',
        width:30,
        // render: text => <a>{text}</a>,
    },
    {
        title: '82',
        className: 'column-money',
        dataIndex: 'money',
        width:30,
    },
];
const dataRight = [
    {
        key: '1',
        name: '名称',
        money: '智能方案研究员',
        width:"130",
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: '创建人',
        money: '*************',
        width:"130",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: '创建时间',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '4',
        name: '创建人',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '5',
        name: '更新人名称',
        money: '*************',
        width:"30",
        address: 'London No. 1 Lake Park',
    },
    {
        key: '6',
        name: '更新时间',
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
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
class CompanyInfo extends Component {

  constructor(dataIndexs) {
    super(dataIndexs)
      this.state = {
          selectedRowKeys: [],
      }

  }





    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
     // 点击页数跳转
    changeCenterTable = (pageNumber)=>{
        console.log('Page: ', pageNumber);
    }

    render() {


      /*  const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }
*/
        const {selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

    return (
      <div className="company-info">
          <div className="company-container">
              <div className="container-left">
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
                      <Table
                          className={"table-style-one"}
                          scrollx={true}
                          rowSelection={rowSelection} columns={columns} dataSource={data} />
                  </div>
                  {/*底部分页*/}
                  <div className="bottom">
                      <Pagination
                          showTotal={total => `共${total}条`}
                          total={85}
                          defaultPageSize={20}
                          defaultCurrent={1}
                          onChange={this.changeCenterTable}
                          showQuickJumper
                      />
                  </div>
              </div>
              <div className="container-right">
                  <div className="container-right-basicInfo">
                      <Table
                          columns={columnsRight}
                          dataSource={dataRight}
                          bordered
                          title={() => '基本信息'}
                      />
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
export default CompanyInfo;