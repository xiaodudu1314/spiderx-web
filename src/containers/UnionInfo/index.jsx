
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
    PlusSquareOutlined

} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './style.scss';
import {Input, Table, Tree} from "antd";

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

const dataList=[
    treeData,treeData2,treeData3,treeData4, treeData5,treeData6,treeData7,treeData8,
    treeData9,treeData10,treeData11,treeData12, treeData13,treeData14,treeData15,treeData16
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


class UnionInfo extends Component {
    constructor(dataIndexs) {
        super(dataIndexs)
        this.state = {
            selectedRowKeys: [],
        }
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
                    <div className="left-top-union">
                        <div className="left-top-menu">
                            <span>组织架构</span>
                            <div>
                                <FullscreenOutlined />
                                <FullscreenExitOutlined />
                                <EditOutlined />
                            </div>

                        </div>
                        <div className="left-top-search">
                            <Input  size="small" placeholder="关键字" prefix={<SearchOutlined />} />
                        </div>
                    </div>
                    <div className="left-bottom">
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
                <div className="right">
                    <div className="admin">
                        <div className={"union-table-top"}>
                            <div className={"union-table-left"}>
                                {/*<CaretRightOutlined />*/}
                                <CaretDownOutlined />
                                <p style={{marginTop:-4}}>系统管理员</p>
                            </div>
                            <div>
                                <PlusSquareOutlined />
                            </div>
                        </div>
                        <div className={"union-table"}>
                            <Table
                                className={"table-style-one"}
                                scrollx={true}
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                            />
                        </div>

                    </div>
                    <div className="implement-manager">
                        <div className={"implement-table"}>
                            <div className={"implement-table-top"}>
                                {/*<CaretRightOutlined />*/}
                                <CaretRightOutlined />
                                <p style={{marginTop: -4}}>执行经理</p>
                            </div>
                            <div>
                                <PlusSquareOutlined style={{marginRight:20}}/>
                            </div>
                        </div>
                    </div>
                    <div className="customer-manager">
                        <div className={"implement-table"}>
                            <div className={"implement-table-top"}>
                                <CaretRightOutlined />
                                <p style={{marginTop: -4}}>客户经理</p>
                            </div>
                            {/*<CaretRightOutlined />*/}

                            <div>
                                <PlusSquareOutlined style={{marginRight:20}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UnionInfo;


