import React, { Component } from 'react';
import { Table, Radio, Divider, Pagination,Input,Select,InputNumber, Popconfirm, Form,Checkbox,Button,message,} from 'antd';
import {
    SyncOutlined, WindowsOutlined, EditOutlined, PlusOutlined,
    CopyOutlined, SearchOutlined, CreditCardFilled, DeleteOutlined
} from '@ant-design/icons';
import {
    handleGetIndexType,
    handleGetDataType,
    handleGetSecondMenu, handleSearchIndex,
} from "../../api/request"

import {handleGetDataList,handleGetDataListDetail,handleEditDataDetail,handelGetDBName,handleGetTableList,handelGetColumnInfo,handelDeleData,handleSearch} from "../../api/demisionManage"


import 'antd/dist/antd.css';
import './style.scss';
const columnsReal = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '来源表名',
        dataIndex: 'tableName',
    },
    {
        title: '来源字段名',
        dataIndex: 'columnName',
        // render: text => <a>{text}</a>,
    },
    {
        title: '词典生成状态',
        dataIndex: 'marked',
        render: text => text==1?"已生成":"未生成",
    },
    {
        title: '更新字段',
        dataIndex: 'updateColumn',
    },
    {
        title: '类型',
        dataIndex: 'type',
        width:80,
    },
    {
        title: '同义词',
        dataIndex: 'thesaurus',

    },
    {
        title: '更新时间',
        dataIndex: 'dicTime',
    },
];

var that=this

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}
const plainOptions = ['是否为时点值', '区分交易日',];
const { Option } = Select;
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

class DimensionManagement extends Component {

  constructor(dataIndexs) {
    super(dataIndexs)
      this.state = {
          searchWord:"",
          columnList:[],
          dbName:"",
          tbList:[],
          dbId:"",
          actColName:"",//字段名
          code:"",
          currentPage:1,
          total:"",
          entityCode:"1.com_basic_info",
          childrenTypeValue:"日期维度",
          childrenTypeList:["日期维度","指标名","无"],
          FatherTypeValue:"默认",
          FatherTypeList:["简称","时间范围","默认",],
          editable:0,
          selectedRowKeys: [],
          top: 'none',
          bottom: 'bottomLeft',
          selectedRowKeys1: [],
          secondMenu:["人口查询数据","基金","行业demo","沪深股票代码","公司","大盘指数"],
          dataList:[],
          frequencyList:[],
          frequency:"日",
          arrList:[],
          columnsRight:null,
          currentSelectId:'',
          dataRight:[],
          dataTypeList:[],
          dataType:'数量',
          dataTypeReal:'',
          indexTypeList:[],
          indexType:"默认指标",
          secondMenuList:[],

          name:'',
          tableName:'',
          columnName:'',
          indicsUnit:'',
          thesaurus:'',
          unitConversion:'',
          unit:'',
          type:'',
          currencyType:'',
          typeId:'',
          dataRightOld:{},
          alreadyChange:0,
      }

  }
     /* 更改数据类型*/
    changeDataType=(value)=>{
        console.log(value)
        console.log(this.state.editable)
        if(this.state.editable==0) return
        if(this.state.editable){
            switch(value){
                case "数量":
                    // alert(1)
                    this.setState({
                        dataType:1
                    })
                    break;
                case "金额":
                    // alert(2)
                    this.setState({
                        dataType:2
                    })
                    break;
                case "百分比":
                    // alert(3)
                    this.setState({
                        dataType:3
                    })
                    break;
            }
        }
    }

    changeIndexType=(value)=>{
        this.setState({
            indexType:value
        })

    }
    /* 数据频率*/
    changeFrequency=(value)=>{
        this.setState({
            frequency:value
        })
    }

     //改表
    handleChangeTable=(value)=>{

        let tableName=value
        console.log(tableName)
        console.log(this.state.dbName)
          this.setState({
              tableName:value
                  })

        //获得字段
        let data={
            sid:464,
            dbId:this.state.dbId,
            tableName:value,
            dbName:this.state.dbName
        }
        handelGetColumnInfo(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                this.setState({
                    columnList:res.result,

                })
            })
    }

    onChangeFatherTypeValue=(e)=>{
            console.log(e.target.value)
         switch(e.target.value) {
                     case "时间范围":
                           this.setState({
                               FatherTypeValue: "时间范围"
                                   })
                         break;
                     case "简称":
                         this.setState({
                             FatherTypeValue: "简称"
                         })
                         break;
                     case "默认":
                         this.setState({
                             FatherTypeValue: "默认"
                         })
                         break;
                 }

        }

        //改字段
    handleChangeColumn=(value)=>{

              this.setState({
                          actColName:value,
                      },()=>{
                 console.log(this.state.actColName)
              })
        }
      //更新字段
    handleChangeUpdateColumn=(value)=>{

        this.setState({
            updateColumn:value,
        },()=>{
            console.log(this.state.updateColumn)
        })
    }
     selectView=(index,text)=>{

         const radioStyle = {
             display: 'block',
             height: '30px',
             lineHeight: '30px',
         };
        const {TextArea} = Input
         let {editable}=this.state
         console.log(editable)
        switch(index){
            case  1:
                return(
                    <Radio.Group onChange={this.onChangeFatherTypeValue} value={this.state.FatherTypeValue}>
                        {
                            this.state.FatherTypeList.map((item,index) => {
                                return (
                                    <Radio style={radioStyle} value={item} key={index}>
                                        {item}
                                    </Radio>
                                )
                            })
                        }
                    </Radio.Group>
                )
                break;
            case  2:
                return(
                    <Radio.Group onChange={this.onChange} value={this.state.childrenTypeValue}>
                        {
                            this.state.childrenTypeList.map((item,index) => {
                                return (
                                    <Radio style={radioStyle} value={item} key={index}>
                                        {item}
                                    </Radio>
                                )
                            })
                        }
                    </Radio.Group>
                )
                break;
            case  3:
                return(
                    this.state.editable?<Select defaultValue={this.state.tableName} style={{ width: 120 }} onChange={this.handleChangeTable}>
                       {/*tbList*/}
                        {
                            this.state.tbList.map((item,index) => {
                                return (
                                    <Option style={radioStyle} value={item.tbName} key={index}>
                                        {item.tbName}
                                    </Option>
                                )
                            })
                        }
                    </Select>:this.state.tableName
                )
                break;
            case  4:
                return(
                    this.state.editable?  <Select defaultValue={this.state.actColName} style={{ width: 120 }} onChange={this.handleChangeColumn}>
                        {
                            this.state.columnList.map((item,index) => {
                                return (
                                    <Option style={radioStyle} value={item.colName} key={index}>
                                        {item.colName}
                                    </Option>
                                )
                            })
                        }
                    </Select>:this.state.actColName
                )
                break;
            case  5:
                return(
                    this.state.editable?  <Select defaultValue={this.state.updateColumn} style={{ width: 120 }} onChange={this.handleChangeUpdateColumn}>
                        {
                            this.state.columnList.map((item,index) => {
                                return (
                                    <Option style={radioStyle} value={item.colName} key={index}>
                                        {item.colName}
                                    </Option>
                                )
                            })
                        }
                    </Select>:this.state.updateColumn
                )
                break;
            case  7:
                return(
                        this.state.editable? <TextArea
                            defaultValue={this.state.thesaurus}
                            onChange={this.handleEditTextArea}
                            placeholder="请输入同义词内容"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />:this.state.thesaurus
                )
                break;
            default :
                return text
        }

    }



  componentDidMount() {
      let sid=464
      let data={
          sid:464, entityCode:"1.com_basic_info",
          startPage:1,
          pageSize: 15,
          userId:"80117559100138994",
      }
       //获取dbId
      handelGetDBName(sid)
       .then(res=>res.json())
                 .then(res=>{
                     console.log(123)
                     console.log(res)
                     let {datarows}=res.result
                     console.log(this.state.entityCode)
                     let dbId=this.state.entityCode.split(".")[0]
                    console.log(this.state.entityCode.split(".")[0])

                     datarows.map((item,index)=>{
                         if(item.id==dbId){
                             console.log(item.id)
                             this.setState({
                                 dbId:item.id,
                                 dbName:item.dbName
                             },()=>{
                                 console.log(this.state.dbId)

                                 let data={
                                     sid:464,
                                     dbId:this.state.dbId
                                 }
                                 //获得表
                                 handleGetTableList(data)
                                  .then(res=>res.json())
                                            .then(res=>{
                                                console.log(res)
                                                let arr=res.result.table.concat(res.result.view)
                                                console.log(arr)
                                               this.setState({
                                                                 tbList:arr
                                                             })
                                            })
                             })
                         }
                     })
                 })

      //左侧列表
      handleGetDataList(data)
          .then(res=>res.json())
          .then(res=>{
              console.log(res)

             this.setState({
                               dataList:res.result.datarows,
                               total:res.result.datamaster.totalrecord
                           })


              const columnsRight = [
                  {
                      title: '指标名称',
                      dataIndex: 'names',
                      align:"left",
                      width:"30%",
                  },
                  {
                      title: '*****',
                      className: 'column-money',
                      dataIndex: 'money',
                      align:"left",
                      render:(text,row,index)=>this.selectView(index,text),
                  },
              ];
              this.setState({
                  columnsRight:columnsRight
              })
          })
       /* 获取二级菜单 实体类*/
      handleGetSecondMenu(sid)
          .then(res=>res.json())
          .then(res=>{
              let arr=[]
              let result= res.result.datarows
              result.map((item,index)=>{
                  arr.push(item.name)
              })
              this.setState({
                  secondMenuList:arr
              })
          })
  }

    /*修改数据操作*/
    editDimensionName=(event)=>{
        this.setState({
            name:event.target.value
        },()=>{
            console.log(this.state.name)
        })
    }
    editDimensionTableName=(event)=>{
        this.setState({
            tableName:event.target.value
        },()=>{
            console.log(this.state.tableName)
        })
    }
    editDimensionActColName=(event)=>{
        this.setState({
            actColName:event.target.value
        },()=>{
            console.log(this.state.actColName)
        })
    }
    editDimensionUpdateColumn=(event)=>{
        this.setState({
            updateColumn:event.target.value
        },()=>{
            console.log(this.state.updateColumn)
        })
    }
    editDimensionDefaultValue=(event)=>{
        this.setState({
            defaultValue:event.target.value
        },()=>{
            console.log(this.state.defaultValue)
        })
    }

    handleEditTextArea=(event)=>{
        this.setState({
            thesaurus:event.target.value
        },()=>{
            console.log(this.state.thesaurus)
        })
    }

    //获取右侧数据
    getDataRight = (data) =>{
       // debugger
        console.log(data)
        console.log(data.actColName)
        console.log(this.state.editable)
        const dataRight = [
            {
                key: '0',
                names: '维度名称',
                money: this.state.editable?<Input defaultValue={data.name} onChange={this.editDimensionName}/> :data.name,
                width:"130",
            },
            {
                key: '1',
                names: '类型',
                money: this.state.editable?<Input defaultValue={data.name} onChange={this.editDimensionName}/> :data.name,
                width:"130",
            },
            {
                key: '2',
                names: '子类型',
                money: this.state.editable?<Input value={data.name}/> :data.name,
                width:"130",
            },
            {
                key: '3',
                names: '表',
                money: this.state.editable?<Input defaultValue={data.tableName} onChange={this.editDimensionTableName}/> :(data.tableName),
                width:"130",
            },
            {
                key: '4',
                names: '字段',
                money:  this.state.editable?<Input defaultValue={data.actColName} onChange={this.editDimensionActColName}/> :(data.actColName),
                width:"130",
            },
            {
                key: '5',
                names: '更新字段',
                money:this.state.editable?<Input defaultValue={data.updateColumn} onChange={this.editDimensionUpdateColumn}/> :(data.updateColumn),
                width:"130",
            },
            {
                key: '6',
                names: '默认维度值',
                money: this.state.editable?<Input defaultValue={data.defaultValue} onChange={this.editDimensionDefaultValue}/> :data.defaultValue,
                width:"130",
            },
            {
                key: '7',
                names: '同义词',
                money:data.thesaurus,
                width:"30",
            },
        ];
        console.log(dataRight)
        return dataRight

    }

     //取消之后的原始数据
    getOldDataRight = () =>{

        let  dataRightOld=[
            {
                key: '0',
                names: '指标名称',
                money:this.state.name,
                width:"130",
                editable: true
            },
            {
                key: '1',
                names: '类型',
                money:this.state.tableName,
                width:"130",
            },
            {
                key: '2',
                names: '子类型',
                money:this.state.columnName,
                width:"130",
            },
            {
                key: '3',
                names: '表',
                money:this.state.tableName,
                width:"130",
            },
            {
                key: '4',
                names: '字段',
                money:this.state.actColName,
                width:"130",
            },

            {
                key: '5',
                names: '更新字段',
                money:this.state.updateColumn,
                width:"130",
            },
            {
                key: '6',
                names: '默认维度值',
                money:this.state.defaultValue,
                width:"130",
            },

            {
                key: '7',
                names: '同义词',
                money:this.state.thesaurus,
                width:"30",
            },
        ]
        return dataRightOld
    }

     //类型
    getFatherType=(name)=>{
             console.log(name)
        switch(name) {
            case "time_range":
                this.setState({
                    FatherTypeValue:"时间范围",
                })
                break;
            case "same":
                  this.setState({
                      FatherTypeValue:"简称",
                          })
                break;
            default:
                this.setState({
                    FatherTypeValue:"默认",
                })
                break;
        }
    }

    /*左侧勾选 */

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        let sid=464
        this.setState({
            selectedRowKeys
        });
        if(selectedRowKeys.length>0){

        let arr=selectedRowKeys
            console.log(arr[arr.length-1])

            this.setState({
                currentSelectId:arr[arr.length-1]
            },()=>{

                /*左侧表格勾选 右侧展示对应数据*/
                handleGetDataListDetail(this.state.currentSelectId,sid)

                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        const { TextArea } = Input;
                        let {name,tableName,columnName,defaultValue,thesaurus,type,updateColumn,actColName,code}=res.result
                        this.setState({
                            name,tableName,columnName,thesaurus,type,updateColumn,defaultValue,actColName,code
                        },()=>{
                            console.log(this.state.actColName)
                        })

                        let data={name,tableName,columnName,thesaurus,type,updateColumn,defaultValue,actColName}
                         let dataRight = this.getDataRight(data)

                        this.getFatherType(columnName)

                        this.setState({
                            dataRight:dataRight
                        })
                    })
            })


             /*获取数据类型*/
            handleGetDataType(sid).then(res=>res.json()).then(res=>{
                let arr=[]
                 res.result.map((item,index)=>{
                     arr.push(item.des)
                                 })
                this.setState({
                                  dataTypeList:arr
                              })
            })
          /*  获取指标类型*/
            handleGetIndexType(sid).then(res=>res.json()).then(res=>{
                let arr=[]
                res.result.map((item,index)=>{
                    arr.push(item.name)
                })
                this.setState({
                    indexTypeList:arr
                })
            })
        }
    };
     // 点击页数跳转
    changeCenterTable = (pageNumber)=>{
        console.log('Page: ', pageNumber);

        let sid=464,
            pageSize=15

        console.log('Page: ', pageNumber);
        this.setState({
            currentPage:pageNumber
        },()=>{
            console.log(this.state.currentPage)
            console.log(this.state.entityCode)
            let data={
                startPage:pageNumber,
                sid,
                entityCode:this.state.entityCode,
                pageSize
            }

            handleGetDataList(data)
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    if(res.success==true){
                        this.setState({
                            dataList:res.result.datarows,
                        })
                    }
                })
        })
    }

    handelSearchKeyWord=()=>{
        /* 搜索关键字*/
            let sid = 464,
                pageSize=15,
                name = this.state.searchWord,
                {entityCode} = this.state
            console.log(name)
            let data = {
                sid,
                name,
                entityCode,
                pageSize
            }

            handleSearch(data)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.success = true) {
                        message.success("查询成功", 1)
                        this.setState({
                            dataList: res.result.datarows,
                            total:res.result.datamaster.totalrecord,
                        })
                    }
                })
    }

    /* 二级目录选择 */
    changeSecondMenu=(checkedValues)=>{
        console.log('checked = ', checkedValues);
        switch(checkedValues){
            case "行业demo":
                this.setState({
                    entityCode:"2.car_edb_demo"
                              })
                let dataOne={
                    sid:464,
                    entityCode:"2.car_edb_demo",
                    pageSize:15,
                    startPage:1,
                }
                handleGetDataList(dataOne)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord
                        })
                    })
                break;
            case "沪深股票代码":
                this.setState({
                    entityCode:"1.stk_basic_info"
                })
                let dataTwo={
                    sid:464,
                    entityCode:"1.stk_basic_info",
                    pageSize:15,
                    startPage:1,
                }
                handleGetDataList(dataTwo)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)

                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord
                        })
                    })
                break;
            case "公司":
                this.setState({
                    entityCode:"1.com_basic_info"
                })
                let dataThree={
                    sid:464,
                    entityCode:"1.com_basic_info",
                    pageSize:15,
                    startPage:1,
                }
                handleGetDataList(dataThree)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)

                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord
                        })
                    })
                break;
            case "大盘指数":
                this.setState({
                    entityCode:"1.stock_market_basicinfo"
                })
                let dataFour={
                    sid:464,
                    entityCode:"1.stock_market_basicinfo",
                    pageSize:15,
                    startPage:1,
                }

                handleGetDataList(dataFour)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord
                        })
                    })
                break;
        }
    }

    eidtDataName=(event)=>{
          this.setState({
                            name:event.target.value
                        },()=>{
          })
    }
    eidtDataTableName=(event)=>{
        this.setState({
            tableName:event.target.value
        },()=>{
        })
    }

    eidtDataColumnName=(event)=>{
        this.setState({
            columnName:event.target.value
        },()=>{
        })
    }

    eidtDataUnit=(event)=>{
        this.setState({
            unit:event.target.value
        },()=>{
        })
    }

    /* 同义词修改*/
    handleChangeTextArea=(event)=>{
        this.setState({
            thesaurus:event.target.value
        },()=>{
        })
    }

    eidtDataunitConversion=(event)=>{
        this.setState({
            unitConversion:event.target.value
        },()=>{
            console.log(this.state.unitConversion)
        })
    }

    /* 更改数据来源*/
    eidtDataSource=(event)=>{
        this.setState({
            type:event.target.value
        },()=>{
        })
    }

    //编辑
    changeState=()=>{
          // debugger
        if(this.state.currentSelectId==""){
            message.warning('请选择要修改的列表项',1);
            return
        }
        this.setState({
            editable:1
        },()=>{
            this.setState({
                editable:1
            })
            console.log(this.state.editable)

            const {TextArea}=Input
            let {editable}=this.state

                let {name,tableName,columnName,thesaurus,updateColumn,defaultValue,actColName}=this.state,
                data={name,tableName,columnName,thesaurus,updateColumn,defaultValue,actColName},
                dataRight=this.getDataRight(data),
                oldData={name,tableName,columnName,thesaurus,updateColumn,defaultValue,actColName},
                dataRightOld=this.getOldDataRight(oldData)
                console.log(updateColumn)
                this.setState({
                    dataRight,
                    dataRightOld
                })
        })

        /*
                if(this.state.currentSelectId){
                    alert(this.state.currentSelectId)
                    this.setState({
                        editable:1
                    },()=>{
                        this.setState({
                            editable:1
                        })
                        console.log(this.state.editable)
                    })
                }
        */
    }

    /*修改表格数据取消*/
    dataEditCancel=()=>{
        this.setState({
                          editable:0,
                          editAlready:1,
                      })
        console.log(this.state.dataRightOld)
        this.setState({
            dataRight:this.state.dataRightOld
        })
    }

    getTypeCurrent=()=>{
         switch(this.state.FatherTypeValue) {
                     case "时间范围":
                           this.setState({
                                       columnName:"time_range",
                                   })
                         break;
                     case "简称":
                         this.setState({
                             columnName:"same",
                         })
                         break;
                     case "默认":
                         break;
                 }

      /*  switch(name) {
            case "time_range":
                this.setState({
                    FatherTypeValue:"时间范围",
                })
                break;
            case "same":
                this.setState({
                    FatherTypeValue:"简称",
                })
                break;
            default:
                this.setState({
                    FatherTypeValue:"默认",
                })
                break;
        }*/
    }

     /*修改表格数据确认*/
    dataEditConfirm=()=>{
        let {name,tableName,columnName,thesaurus,defaultValue,updateColumn,actColName,code,entityCode}=this.state
        console.log(name,tableName,columnName,thesaurus,defaultValue,updateColumn,actColName,code,entityCode)
        this.getTypeCurrent()
        let data={
            id:this.state.currentSelectId,
            sid:464,
            //userId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            userId:"80117559100138994",
            locale:"zh_CN",
            name,tableName,columnName,thesaurus,defaultValue,updateColumn,actColName,code,entityCode
        }
        console.log(data)

        handleEditDataDetail(data)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success==true){
                this.setState({
                    editable:0,
                    alreadyChange:1,
                })

                message.success('修改成功',2);

                let dataAlreadyChange={name,tableName,columnName,thesaurus,defaultValue,updateColumn,actColName}
                console.log(tableName,columnName)

                let  dataRight=this.getDataRight(dataAlreadyChange)

                this.setState({
                    dataRight
                })


                let data={
                    sid:464, entityCode:this.state.entityCode,
                    startPage:1,
                    pageSize: 15,
                    userId:"80117559100138994",
                }

                handleGetDataList(data)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord
                        })
                    })
            }else{
                message.warning(res.msg,2);
            }
        })
    }


    /*删除*/
    deleteDetail=()=>{
        let sid=464,
            //userId="19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            userId="80117559100138994",
            locale="zh_CN"

        let data={
            userId,
            locale,
            sid,
            id:this.state.currentSelectId
        }

        if(!this.state.currentSelectId){
            message.warning('请选择删除列表项',2);
            return
        }
        handelDeleData(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success=true){
                    message.success("删除成功",2);
                    let sid=464,
                        pageSize=15
                    let data={
                        sid,
                        pageSize,
                        startPage:this.state.currentPage,
                        entityCode:this.state.entityCode,
                }
                    handleGetDataList(data)
                        .then(res=>res.json())
                        .then(res=>{
                            console.log(res)
                            if(res.success==true){
                                this.setState({
                                    dataList:res.result.datarows,
                                    dataRight:[],
                                 total:res.result.datamaster.totalrecord
                                })
                            }
                        })

                }else{
                    message.warning(res.result,2);
                }
            })
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

        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        const {secondMenu}=this.state

        const EditableCell = ({
                                  editing,
                                  dataIndex,
                                  title,
                                  inputType,
                                  record,
                                  index,
                                  children,
                                  ...restProps
                              }) => {
            const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
            return (
                <td {...restProps}>
                    {editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    ) : (
                        children
                    )}
                </td>
            );
        };

        return (


      <div className="company-info">
          <div className="company-container">
              <div className="container-left special">
                  {/*顶部菜单*/}
                  <div className="top">
                      <div>

                          {/*增加*/}
                          <PlusOutlined style={{marginRight:15}} disabled/>
                          <DeleteOutlined style={{marginRight:15}} onClick={this.deleteDetail}/>
                          {/*编辑*/}
                          <EditOutlined style={{marginRight:15}} onClick={this.changeState}/>
                          <WindowsOutlined style={{marginRight:15}} disabled/>
                          <CopyOutlined style={{marginRight:15}} disabled/>
                          <SyncOutlined style={{marginRight:15}} disabled/>
                          <Select defaultValue="请选择二级目录" style={{ width: 120 }} onChange={this.changeSecondMenu}>
                              {
                                  this.state.secondMenuList&&this.state.secondMenuList.map((item,index) => {
                                      return (
                                          <Option value={item} key={index}>{item}</Option>
                                      )
                                  })
                              }

                          </Select>
                      </div>
                      <div>
                          {/*<SearchOutlined />*/}
                          <Input  size="small" placeholder="关键字1" prefix={<SearchOutlined />} value={this.state.searchWord} onChange={this.handelSearchKeyWord}/>
                      </div>
                  </div>
                  {/*中部内容部分*/}
                  <div className="center">
                      <Table
                          className={"table-style-one"}
                          scrollx={true}
                          pagination={{ position: [this.state.top, this.state.bottom],pageSize:15 }}
                          rowSelection={rowSelection}
                          rowKey={record => record.id}
                          columns={columnsReal}
                          dataSource={this.state.dataList}
                      />


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
                          columns={this.state.columnsRight}
                          dataSource={this.state.dataRight}
                          bordered
                          title={() => '属性'}
                      />
                      {
                          this.state.editable?<div className={"editConfirm"}>
                              <Button type="primary" onClick={this.dataEditConfirm}>确认1</Button>
                              <Button onClick={this.dataEditCancel}>取消1</Button>
                          </div>
                              :null
                      }

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
export default DimensionManagement;