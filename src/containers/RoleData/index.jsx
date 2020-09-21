
import React, {Component} from 'react';
import { FullscreenOutlined, WindowsOutlined,FullscreenExitOutlined,EditOutlined,SearchOutlined} from '@ant-design/icons';
import {
    DownOutlined,
    FrownOutlined,
    SmileOutlined,
    MehOutlined,
    FrownFilled,
    FolderTwoTone,
    CaretDownOutlined,
    CaretRightOutlined,
    PlusSquareOutlined,
    CopyOutlined,
    DeleteOutlined,
    DatabaseOutlined,
    TableOutlined

} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './style.scss';
import {Input, Table, Tree, Checkbox} from "antd";

const treeData = [
    {
        title: 'everydroid',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData2 = [
    {
        title: '数据中心',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData3 = [
    {
        title: '阿伯茨科技',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData4 = [
    {
        title: '易方达',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData5 = [
    {
        title: 'everydroid',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData6 = [
    {
        title: '数据中心',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData7 = [
    {
        title: '阿伯茨科技',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData8= [
    {
        title: '易方达',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData9 = [
    {
        title: 'everydroid',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData10 = [
    {
        title: '数据中心',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData11 = [
    {
        title: '阿伯茨科技',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData12 = [
    {
        title: '易方达',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData13= [
    {
        title: 'everydroid',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData14 = [
    {
        title: '数据中心',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData15= [
    {
        title: '阿伯茨科技',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const treeData16= [
    {
        title: '易方达',
        key: '0-0',
        icon: <FolderTwoTone />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];

const baseData = [
    {
        title: 'lsit1',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData2 = [
    {
        title: 'list2',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <TableOutlined />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData3 = [
    {
        title: 'list3',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData4 = [
    {
        title: 'list4',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData5 = [
    {
        title: 'list5',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData6 = [
    {
        title: 'list6',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData7 = [
    {
        title: 'list7',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData8= [
    {
        title: 'list8',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData9 = [
    {
        title: 'list9',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData10 = [
    {
        title: 'list10',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData11 = [
    {
        title: 'list11',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: 'leaf',
                key: '0-0-0',
                icon: <FolderTwoTone />,
            },
            {
                title: 'leaf',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <FolderTwoTone /> : <FolderTwoTone />),
            },
        ],
    },
];
const baseData12 = [
    {
        title: 'list12',
        key: '0-0',
        icon: <DatabaseOutlined />,
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
    },
];
const baseData13= [
    {
        title: 'list13',
        key: '0-0',
        icon: <DatabaseOutlined />,
        children: [
            {
                title: '债券基本信息表base_info_data',
                key: '0-0-0',
                icon:  <TableOutlined />,
            },
            {
                title: '债券基本信息要素表info_data_base',
                key: '0-0-1',
                icon: ({ selected }) => (selected ? <TableOutlined /> : <TableOutlined />),
            },
            {
                title: '公司基本信息表information_basic_company',
                key: '0-0-2',
                icon:  <TableOutlined />,
            },
            {
                title: '可转债发行',
                key: '0-0-3',
                icon: ({ selected }) => (selected ? <TableOutlined /> : <TableOutlined />),
            },
            {
                title: '债券每日利息',
                key: '0-0-4',
                icon:  <TableOutlined />,
            },
            {
                title: '资产支持证券基本信息表',
                key: '0-0-5',
                icon: ({ selected }) => (selected ? <TableOutlined /> : <TableOutlined />),
            },
        ],
    },
];

const wordData= [
    {
        title: '字符型',
        key: '0-0',
        children: [
            {
                title: '公司统一编码base_info_data',
                key: '0-0-0',
            },
            {
                title: '证券统一编码info_data_base',
                key: '0-0-1',
            },
            {
                title: '证券全称',
                key: '0-0-2',
            },
        ],
    },
];
const wordData1= [
    {
        title: '数值型',
        key: '0-1',
        children: [
            {
                title: 'info_data',
                key: '0-1-0',
            },
            {
                title: 'info_data_base',
                key: '0-1-1',
            },
            {
                title: 'data_analysis',
                key: '0-1-2',
            },
        ],
    },
];

const dataList=[
    treeData,treeData2,treeData3,treeData4, treeData5,treeData6,treeData7,treeData8,
    treeData9,treeData10,treeData11,treeData12, treeData13,treeData14,treeData15,treeData16
]

const dataBaseList=[
    baseData,baseData2,baseData3,baseData4, baseData5,baseData6,baseData7,baseData8,
    baseData9,baseData10,baseData11,baseData12, baseData13
]

const wordList=[
    wordData,wordData1

]

const columns = [
    {
        title: '用户ID',
        dataIndex: 'name',
        // render: text => <a>{text}</a>,
    },
    {
        title: '域账号',
        dataIndex: 'form',
    },
    {
        title: '手机号码',
        dataIndex: 'word',
    },
    {
        title: '邮箱',
        dataIndex: 'index',
    },
    {
        title: '用户头像',
        dataIndex: 'type',
    },
    {
        title: '用户昵称',
        dataIndex: 'same',
    },
    {
        title: '用户职务',
        dataIndex: 'time',
    },
    {
        title: '角色',
        dataIndex: 'time',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `持股比例 ${i}`,
        form:`sec_main_holder`,
        word:`King ${i}`,
        index:`数据库`,
        status: "已连接",
        type: `默认指标`,
        same: `ROA`,
        time: `2020-7-${i} 17:29:20`,
    });
}

const columnsRight = [
    {
        title: '角色ID',
        dataIndex: 'name',
        // render: text => <a>{text}</a>,
    },
    {
        title: '82',
        className: 'column-money',
        dataIndex: 'money',
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



class RoleData extends Component {
    constructor(dataIndexs) {
        super(dataIndexs)
        this.state = {
            selectedRowKeys: [],
        }
    }


     onChangeAll=(e)=>{
        console.log(`checked = ${e.target.checked}`);
    }


    render() {
        const {selectedRowKeys}=this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="union-info">
                <div className="left">
                    <div className="left-top">
                        <div className="left-top-menu">
                            <div>
                                <CaretDownOutlined />
                                <span className={"role-style"}>角色</span>
                            </div>
                            <div>
                                <CopyOutlined style={{marginRight:10}}/>
                                <DeleteOutlined />
                            </div>

                        </div>
                        <div className="left-top-search">
                            <Input  size="small" placeholder="关键字" prefix={<SearchOutlined />} />
                        </div>
                        <div  className={"top-table-role"}>
                            <Table
                                columns={columnsRight}
                                dataSource={dataRight}
                                bordered
                            />
                        </div>
                    </div>
                    <div className="left-bottom">
                        <div className="role-data-bottom">
                            <div>
                                <CaretDownOutlined />
                                <span className={"role-style"}>组织</span>
                            </div>
                            <div>
                                <CopyOutlined style={{marginRight:10}}/>
                                <DeleteOutlined />
                            </div>
                        </div>
                        <div>
                            {
                                dataList.map((item,index)=>{
                                    return (
                                            <Tree
                                                key={index}
                                                autoExpandParent={false}
                                                showIcon
                                                defaultSelectedKeys={['0-0-0']}
                                                switcherIcon={<DownOutlined />}
                                                treeData={item}
                                            />

                                    )
                                })

                            }

                        </div>
                    </div>


                </div>
                <div className="right special">
                    <div className="right-main">
                        <div className="right-one">
                            <div className="right-one-top">
                              <span>数据库和表</span>
                                <div>
                                    <Checkbox style={{marginRight:5}} onChange={this.onChangeAll}></Checkbox>
                                    <span >全选</span>
                                </div>
                            </div>
                            <div className="right-one-bottom">
                                {
                                    dataBaseList.map((item,index)=>{
                                        return (
                                            <div className={'data-base-check'}>
                                                    <Tree
                                                        key={index}
                                                        autoExpandParent={false}
                                                        showIcon
                                                        defaultSelectedKeys={['0-0-0']}
                                                        switcherIcon={<DownOutlined />}
                                                        treeData={item}
                                                    />

                                                    <div className={'base-check-every'}>
                                                        <Checkbox></Checkbox>
                                                    </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                        <div className="right-two">

                            <div className="right-two-top">
                                <span>字段</span>
                                <div>
                                    <Checkbox style={{marginRight:5}} onChange={this.onChangeAll}></Checkbox>
                                    <span >全选</span>
                                </div>
                            </div>
                            <div className="right-one-bottom">
                                {
                                    wordList.map((item,index)=>{
                                        return (
                                            <div className={'data-base-check'}>
                                                <Tree
                                                    key={index}
                                                    autoExpandParent={false}
                                                    showIcon
                                                    defaultSelectedKeys={['0-0-0']}
                                                    switcherIcon={<DownOutlined />}
                                                    treeData={item}
                                                />

                                                <div className={'base-check-every'}>
                                                    <Checkbox></Checkbox>
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>

                        </div>
                        <div className="right-three">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoleData;


