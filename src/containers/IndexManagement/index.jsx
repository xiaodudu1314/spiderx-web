import React, { Component } from 'react';
import { Table, Radio, Divider, Pagination,Input,Select,InputNumber, Popconfirm, Form,Checkbox,Button,message,} from 'antd';
import { SyncOutlined, WindowsOutlined, EditOutlined,PlusOutlined ,
         CopyOutlined,SearchOutlined,CreditCardFilled,DeleteOutlined} from '@ant-design/icons';
import {
    handleIndexManage,
    handleGetFrequency,
    handleGetIndexType,
    handleIndexManageDetail,
    handleGetDataType,
    handleGetSecondMenu,
    handleChangeDataConfirm,
    changeIndexPage,
    handleSearchIndex,
    handleDeleteIndex,
    handleAddIndex,
    handelGetDBName,
    handelGetTableList,//数据库表
    handelGetColumnInfo

} from "../../api/request"
import 'antd/dist/antd.css';
import './style.scss';

const columnsReal = [
    {
        title: '名称',
        dataIndex: 'name',
        width:"15%",
    },
    {
        title: '来源表名',
        dataIndex: 'tableName',

    },
    {
        title: '来源字段名',
        dataIndex: 'columnName',
    },
    {
        title: '指标来源',
        dataIndex: 'index',
    },
    {
        title: '指标类型',
        dataIndex: 'typeCode',
    },
    {
        title: '同义词',
        dataIndex: 'thesaurus',
        width:"25%",
    },
];
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

class IndexManagement extends Component {

  constructor(dataIndexs) {
    super(dataIndexs)
      this.state = {
          narrowTableAdd:false,
          narrowTable:true,
          funcAdd:0,
          funcOrigion:'',
          func:"ifunc$avg",
          funcStatus:1,
          funcCurrent:'',
          funList:["MIN","SUM","MAX","AVG"],
          editable:0,
          selectedRowKeys: [],
          top: 'none',
          total:'',
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
          dataTypeAdd:'',
          dataTypeReal:'',
          indexTypeList:[],
          indexType:"默认指标",
          secondMenuList:[],
          entityCode:"1.com_basic_info",
          name:'',
          tableName:'',
          columnName:'',
          indicsUnit:'',thesaurus:'',
          unitConversion:'',
          unit:'',
          type:'',
          typeName:'',
          currencyType:'',
          typeId:'',
          dataRightOld:{},
          alreadyChange:0,
          searchWord:'',
          addStatus:0,
          unitConversionAdd:'',
          sourceOrigion:false,//新增时候的指标来源
          thesaurusAdd:'',
          timeUnit:'',
          section:false,//时点值
          trading:false,//区分交易日
          timeFrequency:'',
          dbId:'',
          dbTableList:[],
          AddNew:0,
          tableList:[],//数据库表
          wordChoose:'',//选择的字段
          dbName:'',
          colName:[],//字段列表
          typeIdInfo:[],//typeId 信息
          typeIdCurrent:'',
          colNameCurrent:''//选中的字段
      }
  }

    /*更改表字段*/
    changeColName=(value)=>{
        const {TextArea}=Input
        console.log(value)
        this.setState({
                          colNameCurrent:value//字段
                      },()=>{
            const columnsRight = [
                {
                    title: '指标名称',
                    dataIndex: 'names',
                    align:"left",
                    width:"40%",
                },
                {
                    title: '*****',
                    className: 'column-money',
                    dataIndex: 'money',
                    align:"left",
                    render:(text,row,index)=>this.selectView(index,text,row),
                },
            ];

            const dataRight = [
                {
                    key: '0',
                    names: '指标名称',
                    money: <Input defaultValue={this.state.name} placeholder={"请输入指标名称"} onChange={this.addName}/>,
                },
                {
                    key: '1',
                    names: '表',
                    money: <Select defaultValue={this.state.tableList}  style={{ width: 120 }} onChange={this.chooseTableDetail}>
                        {
                            this.state.tableList.length>0&&this.state.tableList.map((item,index) => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                },
                {
                    key: '2',
                    names: '字段',
                    money: <Select value={this.state.colNameCurrent} style={{ width: 120 }} onChange={this.changeColName}>
                        {
                            this.state.colName.length>0&&this.state.colName.map((item,index) => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })
                        }

                    </Select>

                },
                {
                    key: '3',
                    names: '指标单位',
                    money: <Input defaultValue="" onChange={this.addNewIndex} placeholder={"请输入指标单位"}/>,
                },
                {
                    key: '4',
                    names: '数据类型',
                    money: <Select defaultValue="请选择字段" style={{ width: 120 }} onChange={this.changeDataType}>
                        {
                            this.state.dataTypeList&&this.state.dataTypeList.map((item,index) => {
                                return (
                                    <Option value={index} key={index}>{item}</Option>
                                )
                            })
                        }

                    </Select>

                },
                {
                    key: '5',
                    names: '转换比例',
                    money: <Input defaultValue={this.state.unitConversionAdd} onChange={this.addTransformRate} placeholder={"请输入转换比例"}/>,
                },
                {
                    key: '6',
                    names: '指标来源',
                    money:

                        <Radio.Group onChange={this.chooseSourceOrigion} defaultalue={1}>
                            <Radio value={1}>数据库</Radio>
                            <Radio value={2}>衍生计算</Radio>
                        </Radio.Group>
                },
                {
                    key: '7',
                    names: '指标类型',
                    money: <Select defaultValue="请选择指标类型" style={{ width: 120 }} onChange={this.changeIndexType}>
                        {
                            this.state.IndexTypeList&&this.state.IndexTypeList.map((item,index) => {
                                return (
                                    <Option value={index} key={index}>{item}</Option>
                                )
                            })         }
                    </Select>

                },
                {
                    key: '8',
                    names: '数据频率',
                    money: <Select defaultValue="请选择数据频率" style={{ width: 120 }} onChange={this.changeFrequency}>
                        {
                            this.state.frequencyList&&this.state.frequencyList.map((item,index) => {
                                return (
                                    <Option value={index} key={index}>{item}</Option>
                                )
                            })
                        }
                    </Select>

                },
                {
                    key: '9',
                    names: '同义词',
                    money:  <TextArea
                        defaultValue={this.state.thesaurusAdd}
                        onChange={this.handleAddTextArea}
                        placeholder="请输入同义词内容"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />,
                },
            ];

            this.setState({
                dataRight:dataRight,
                columnsRight:columnsRight,
            })
        })
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
                        dataTypeReal:1,
                        dataType:"数量",
                    },()=>{
                        console.log(this.state.dataTypeReal)
                    })
                    break;
                case "金额":
                    // alert(2)
                    this.setState({
                        dataTypeReal:2,
                        dataType:"金额",
                    },()=>{
                        console.log(this.state.dataType)
                    })
                    break;
                case "百分比":
                    // alert(3)
                    this.setState({
                        dataTypeReal:3,
                        dataType:"百分比",
                    },()=>{
                        console.log(this.state.dataType)
                    })
                    break;
            }
        }
    }

    changeIndexType=(value)=>{
      const {typeIdInfo}=this.state
        console.log(this.state.typeIdInfo)
       typeIdInfo.map((item,index)=>{
                           if(item.name==value){
                             this.setState({
                                               typeIdCurrent:item.id
                                           },()=>{
                                 console.log(this.state.typeIdCurrent)//typeId
                             })
                           }
                         })

        this.setState({
            typeName:value,
            indexType:value
        },()=>{
            console.log(this.state.indexType)
        })
    }
    /* 数据频率*/
    changeFrequency=(value)=>{
        console.log(value)
         switch(value){
                     case "日":
                         this.setState({
                             frequency:"DAY",//传值
                             timeFrequency:"日"//显示值
                         },()=>{
                             console.log(this.state.timeFrequency)
                         })
                         break;
                     case "周":
                         this.setState({
                             frequency:"WEEK",
                             timeFrequency:"周"//显示值
                         },()=>{
                             console.log(this.state.timeFrequency)
                         })
                         break;
                     case "月":
                         this.setState({
                             frequency:"MONTH",
                             timeFrequency:"月"//显示值
                         },()=>{
                             console.log(this.state.timeFrequency)
                         })
                         break;
                     case "季度":
                         this.setState({
                             frequency:"QUARTER",
                             timeFrequency:"季度"//显示值
                         },()=>{
                             console.log(this.state.timeFrequency)
                         })
                         break;

                     case "年":
                         this.setState({
                             frequency:"YEAR",
                             timeFrequency:"年"//显示值
                         },()=>{
                             console.log(this.state.timeFrequency)
                         })
                         break;
                 }
    }

    /* 同义词新增*/
    handleAddTextArea=(event)=>{
        this.setState({
            thesaurusAdd:event.target.value
        },()=>{
            console.log(this.state.thesaurusAdd)
        })
    }

  /*  原始数据展示*/
     selectView=(index,text,row)=>{
        // let {frequencyList}=this.state
/*
         console.log(index)
         console.log(text)
         console.log(row)
*/
         let {editable}=this.state
/*
         console.log(editable)
         console.log(this.state.dataType)
         console.log(this.state.typeName)
         console.log(this.state.timeFrequency)
*/
        switch(index){
            case  4:
                return(
                    <Select className={'ass'} value={this.state.dataType} style={{ width: 120 }} onChange={this.changeDataType} disabled={editable?false:true}>
                        {
                            this.state.dataTypeList.map((item,index) => {
                                return (
                                    <Option value={item} key={index} >{item}</Option>
                                )
                            })
                        }

                    </Select>
                )
                break;
            case  7:
                return(
                    <Select className={'ass'} value={this.state.typeName} style={{ width: 120 }} onChange={this.changeIndexType} disabled={editable?false:true}>
                        {
                            this.state.indexTypeList.map((item,index) => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })

                        }

                    </Select>
                )
                break;
            case  8:
                return(
                    <Select className={'ass'} value={this.state.timeFrequency} style={{ width: 120 }} onChange={this.changeFrequency} disabled={editable?false:true}>
                        {
                            this.state.arrList.map((item,index) => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })
                        }

                    </Select>
                )
                break;
            default :
                return text
        }

    }



  componentDidMount() {

      let sid=464,
          pageSize=15

     /* 获取指标类型*/
      handleGetIndexType(sid)
          .then(res => res.json())
          .then(res => {
          console.log("获取指标类型")
          console.log(res)
          let arr = []
          res.result.map((item, index) => {
              arr.push(item.name)
          })
          this.setState({
              indexTypeList: arr,
              typeIdInfo:res.result
          })
      })




/*
      handelGetDBName(sid)
          .then(res=>res.json())
          .then(res=>{
              console.log(res)
              let arr=[]
              let {datarows}=res.result
              datarows.map((item,index)=>{
                      if(item.id=this.state.dbId) arr.push(item.dbName)
                              })
              this.setState({
                                dbName:arr[0]
                            },()=>{
                  console.log(this.state.dbName)
              })
          })
*/


      /*左侧列表*/


      handleIndexManage(464,"1.com_basic_info",pageSize)
          .then(res=>res.json())
          .then(res=>{
              console.log(res)

             this.setState({
                               dataList:res.result.datarows,
                               total:res.result.datamaster.totalrecord,
                           })
          })


      /*获取数据类型*/
      handleGetDataType(sid).then(res=>res.json()).then(res=>{
          /*
                          console.log("获取数据类型")
                          console.log(res)
          */
          let arr=[]
          res.result.map((item,index)=>{
              arr.push(item.des)
          })
          this.setState({
              dataTypeList:arr
          })
                          console.log("this.state.dataTypeList")
                          console.log(this.state.dataTypeList)
      })
      /*  获取指标类型*/
      handleGetIndexType(sid).then(res=>res.json()).then(res=>{
                          console.log("获取指标类型")
                          console.log(res)
          let arr=[]
          res.result.map((item,index)=>{
              arr.push(item.name)
          })
          this.setState({
              indexTypeList:arr
          })
          console.log("this.state.indexTypeList")
          console.log(this.state.indexTypeList)
      })



       /*  获取二级菜单 实体类*/
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


     /* 数据频率 时间颗粒度*/
      handleGetFrequency()
          .then(res=>res.json())
          .then(res=>{
              if(res.success==true){
                  this.setState({
                      frequencyList:res.result
                  })
                  let arr=[]
                  this.state.frequencyList.map((item,index)=>{
                      arr.push(item.name)
                  })
                  this.setState({
                      arrList:arr
                                })
              }
          })
  }

/*左侧勾选 */

    onSelectChange = selectedRowKeys => {
       const  {TextArea}=Input
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        let sid=464
        this.setState({
            selectedRowKeys,
            addStatus:0,
        });
        if(selectedRowKeys.length>0){

        let arr=selectedRowKeys
            console.log(arr[arr.length-1])

            this.setState({
                currentSelectId:arr[arr.length-1]
            },()=>{

                /*左侧表格勾选 右侧展示对应数据*/
                handleIndexManageDetail(this.state.currentSelectId,sid)
                    .then(res=>res.json())
                    .then(res=>{
/*
                                            console.log("handleGetIndexType")
                                            console.log(res)
                                            console.log(res.result.func)
*/
                        if(res.result.func!==null&&res.result.func.length>6){
                            console.log("ifunc$avg".match(/\$(\S+)/)[1].toUpperCase())
                             this.setState({
                                         funcCurrent:res.result.func.match(/\$(\S+)/)[1].toUpperCase(),
                                     },()=>{
                                 console.log(this.state.funcCurrent)
                             })
                        }else if(res.result.func==null){
                              this.setState({
                                          funcOrigion:null,
                                      })
                        }
                                            console.log(res.result.name)
                                            console.log(res.result.tableName)
                        const { TextArea } = Input;
                        if(res.result.name){
                            let {name,tableName,columnName,indicsUnit,thesaurus,type,typeId,typeName,timeUnit,section,trading,value}=res.result,
                                {unitConversion,unit,currencyType,dataType}=res.result.indicsUnit

                            this.setState({
                                name,tableName,columnName,indicsUnit,thesaurus,unitConversion,type,currencyType,
                                dataTypeReal:dataType,typeId,typeName,timeUnit,section,trading,
                                unit:unit,//指标单位,
                                narrowTable:value,
                            },()=>{
                                console.log(this.state.dataTypeReal)
                                console.log(this.state.timeUnit)

                                console.log(this.state.dataType)
                                console.log(this.state.typeName)

                                switch(this.state.dataTypeReal){
                                    case 1:
                                        this.setState({
                                            dataType:"数量"
                                        })
                                        break;

                                    case 2:
                                        this.setState({
                                            dataType:"金额"
                                        })

                                        break;
                                    case 3:
                                        this.setState({
                                            dataType:"百分比"
                                        })
                                        break;
                                }
                                switch(this.state.timeUnit){
                                    case "DAY":
                                        this.setState({
                                            timeFrequency:"日"
                                        })
                                        break;
                                    case "WEEK":
                                        this.setState({
                                            timeFrequency:"周"
                                        })
                                        break;
                                    case "MONTH":
                                        this.setState({
                                            timeFrequency:"月"
                                        })
                                        break;
                                    case "QUARTER":
                                        this.setState({
                                            timeFrequency:"季度"
                                        })
                                        break;
                                    case "YEAR":
                                        this.setState({
                                            timeFrequency:"年"
                                        })
                                        break;
                                }

                                const columnsRight = [
                                    {
                                        title: '指标名称',
                                        dataIndex: 'names',
                                        align:"left",
                                        width:"40%",
                                    },
                                    {
                                        title: '*****',
                                        className: 'column-money',
                                        dataIndex: 'money',
                                        align:"left",
                                        render:(text,row,index)=>this.selectView(index,text,row),
                                    },
                                ];
                                this.setState({
                                    columnsRight:columnsRight,
                                })
                                /*  更改value值*/
                                const dataRight = [

                                    {
                                        key: '0',
                                        names: '指标名称',
                                        money: this.state.editable?<Input value={this.state.name}/> :this.state.name,
                                        width:"130",
                                    },
                                    {
                                        key: '1',
                                        names: '表',
                                        money: this.state.editable?<Input value={this.state.tableName}/> :this.state.tableName,
                                        width:"130",
                                    },
                                    {
                                        key: '2',
                                        names: '字段',
                                        money: this.state.columnName,
                                        width:"130",
                                    },
                                    {
                                        key: '3',
                                        names: '指标单位',
                                        money: this.state.unit,
                                        width:"130",
                                    },
                                    {
                                        key: '4',
                                        names: '数据类型',
                                        editable: true,
                                        dataIndex: 'step',
                                        align: 'center',
                                        filtered: true,
                                        money: '*************',
                                        width:"30",
                                    },
                                    {
                                        key: '5',
                                        names: '转换比例',
                                        money: this.state.unitConversion,
                                        width:"30",
                                    },
                                    {
                                        key: '6',
                                        names: '指标来源',
                                        money: this.state.type?"衍生计算":"数据库",
                                        width:"30",
                                    },
                                    {
                                        key: '7',
                                        names: '指标类型',
                                        money: '*************',
                                        width:"30",
                                    },
                                    {
                                        key: '8',
                                        names: '数据频率',
                                        money: '*************',
                                        width:"30",
                                    },
                                    {
                                        key: '9',
                                        names: '同义词',
                                        money: this.state.editable?
                                            <TextArea
                                                value={this.state.thesaurus}
                                                onChange={this.handleChangeTextArea}
                                                placeholder="Controlled autosize"
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                            />
                                            :this.state.thesaurus,
                                        width:"30",
                                    },
                                ];
                                this.setState({
                                    dataRight,
                                    trading:this.state.trading,
                                    section:this.state.section
                                },()=>{
                                    console.log(this.state.trading)
                                })
                            })
                        }
                    })
                    .then(()=>{
                        /* 更改key值*/
                    })
            })


             /*获取数据类型*/
            handleGetDataType(sid).then(res=>res.json()).then(res=>{
/*
                console.log("获取数据类型")
                console.log(res)
*/
                let arr=[]
                 res.result.map((item,index)=>{
                     arr.push(item.des)
                                 })
                this.setState({
                                  dataTypeList:arr
                              })
/*
                console.log("this.state.dataTypeList")
                console.log(this.state.dataTypeList)
*/
            })
          /*  获取指标类型*/
            handleGetIndexType(sid).then(res=>res.json()).then(res=>{
                console.log("获取指标类型")
                console.log(res)
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
        let sid=464,
            pageSize=15

        console.log('Page: ', pageNumber);
        this.setState({
            currentPage:pageNumber
        })
        let data={
            startPage:pageNumber,
            sid,
            entityCode:this.state.entityCode,
            pageSize
        }
        changeIndexPage(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success==true){
                    this.setState({
                        dataList:res.result.datarows,
                        dataRight:[]
                    })
                }
            })
    }
    /*
      */  二级目录选择
    changeSecondMenu=(checkedValues)=>{
        console.log('checked = ', checkedValues);
        console.log(this.state.selectedRowKeys)
        console.log(this.state.currentSelectId)
        let sid=464
        let pageSize=15
        console.log(typeof(checkedValues))
        this.setState({
                          AddNew:1,
                      selectedRowKeys:[],
                      currentSelectId:''
                      })
        switch(checkedValues){

            case "行业demo":
                this.setState({
                    entityCode:"2.car_edb_demo",
                    dbId:2,
                              })
                handleIndexManage(464,"2.car_edb_demo",pageSize)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord,

                        })
                    })
                break;
            case "沪深股票代码":
                this.setState({
                    entityCode:"1.stk_basic_info",
                    dbId:1,
                })
                handleIndexManage(464,"1.stk_basic_info",pageSize)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)

                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord,
                        })
                    })
                break;
            case "公司":
                this.setState({
                    entityCode:"1.com_basic_info",
                    dbId:1,
                })
                handleIndexManage(464,"1.com_basic_info",pageSize)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)

                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord,
                        })
                    })
                break;
            case "大盘指数":
                this.setState({
                    entityCode:"1.stock_market_basicinfo",
                    dbId:1,
                })
                handleIndexManage(464,"1.stock_market_basicinfo",pageSize)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord,
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
    changeState=()=>{
        console.log(this.state.dataRightOld)
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
            let dataRight = [

                {
                    key: '0',
                    names: '指标名称',
                    money:editable?<Input defaultValue={this.state.name} onChange={this.eidtDataName}/>
                    :this.state.name,
                    width:"130",
                    editable: true
                },
                {
                    key: '1',
                    names: '表',
                    money:editable?<Input defaultValue={this.state.tableName} onChange={this.eidtDataTableName}/>
                        :this.state.tableName,
                    width:"130",
                },
                {
                    key: '2',
                    names: '字段',
                    money: editable?<Input defaultValue={this.state.columnName} onChange={this.eidtDataColumnName}/>
                        :this.state.columnName,
                    width:"130",
                },
                {
                    key: '3',
                    names: '指标单位',
                    money: editable?<Input defaultValue={this.state.unit} onChange={this.eidtDataUnit}/>
                        :this.state.unit,
                    width:"130",
                },
                {
                    key: '4',
                    names: '数据类型',
                    editable: true,
                    dataIndex: 'step',
                    align: 'center',
                    filtered: true,
                    money: '*************',
                    width:"30",
                },
                {
                    key: '5',
                    names: '转换比例',
                    // money: unitConversion,
                    money:editable?<Input defaultValue={this.state.unitConversion} onChange={this.eidtDataunitConversion}/>
                        :this.state.unitConversion,
                    width:"30",
                },
                {
                    key: '6',
                    names: '指标来源',
                    money:editable?<Input defaultValue={this.state.type?"衍生计算":"数据库"}
                                 onChange={this.eidtDataSource}
                    />
                        :(this.state.type?"数据库":"衍生计算"),
                    width:"30",
                },
                {
                    key: '7',
                    names: '指标类型',
                    money: '*************',
                    width:"30",
                },
                {
                    key: '8',
                    names: '数据频率',
                    money: '*************',
                    width:"30",
                },
                {
                    key: '9',
                    names: '同义词',
                    money:editable? <TextArea
                            defaultValue={this.state.thesaurus}
                            onChange={this.handleChangeTextArea}
                            placeholder="请输入同义词内容"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                        :this.state.thesaurus,

                    width:"30",
                },
            ],
            dataRightOld=[

                {
                    key: '0',
                    names: '指标名称',
                    money:this.state.name,
                    width:"130",
                    editable: true
                },
                {
                    key: '1',
                    names: '表',
                    money:this.state.tableName,
                    width:"130",
                },
                {
                    key: '2',
                    names: '字段',
                    money:this.state.columnName,
                    width:"130",
                },
                {
                    key: '3',
                    names: '指标单位',
                    money:this.state.unit,
                    width:"130",
                },
                {
                    key: '4',
                    names: '数据类型',
                    editable: true,
                    dataIndex: 'step',
                    align: 'center',
                    filtered: true,
                    money: '*************',
                    width:"30",
                },
                {
                    key: '5',
                    names: '转换比例',
                    money:this.state.unitConversion,
                    width:"30",
                },
                {
                    key: '6',
                    names: '指标来源',
                    money:(this.state.type?"衍生计算":"数据库"),
                    width:"30",
                },
                {
                    key: '7',
                    names: '指标类型',
                    money: '*************',
                    width:"30",
                },
                {
                    key: '8',
                    names: '数据频率',
                    money: '*************',
                    width:"30",
                },
                {
                    key: '9',
                    names: '同义词',
                    // money: thesaurus,
                    money:this.state.thesaurus,
                    width:"30",
                },
            ]
            this.setState({
                dataRight,
                dataRightOld
            })

        })
    }

    /*修改表格数据取消*/
    dataEditCancel=()=>{
        this.setState({
                          editable:0,
                          editAlready:1,
                          currentSelectId:'',
                          selectedRowKeys:[]
                      })

        this.setState({
            dataRight:this.state.dataRightOld
        })
    }

     /* 是否交易日*/
    onChangeTrading=(value)=>{
        console.log(value)
/*
        let curentValue=value[value.length-1]
        console.log(curentValue)
*/
        this.setState({
                          trading:value
                      })
    }

      /*增加列表项取消*/
    dataAddCancel=()=>{
        let   {TextArea}=Input
        let dataRight=[]
        this.setState({
            dataRight:dataRight,
            currentSelectId:null,
            addStatus:0,
            editable:0,
            editToAdd:0,
        })
    }
    /*修改表格数据确认*/
    dataEditConfirm=()=>{

        let {name,tableName,columnName,thesaurus,unit,dataType,type,indexType,frequency,unitConversion,trading,section}=this.state
        console.log(name,tableName,unit,columnName,thesaurus,unitConversion,dataType,indexType,frequency)
        let{TextArea}=Input

        let changeFuncName=`func$`+this.state.funcCurrent.toLowerCase()
           console.log(this.state.funcCurrent)//没选
           console.log(this.state.funcStatus)
           console.log(changeFuncName)
        let data={
            value:this.state.narrowTable,
            func:this.state.funcStatus==1?"func$sum":this.state.funcCurrent,//选择 -- 没选
            trading,
            section,
            name,tableName,columnName,thesaurus,
            type:type=="数据库"?false:true,
            typeName:indexType,//指标类型
            timeUnit:frequency,
            indicsUnit:{
                unit:this.state.unit,
                unitConversion:this.state.unitConversion,
                dataType:this.state.dataTypeReal,
                currencyType:this.state.currencyType
            },
            id:this.state.currentSelectId,
            // typeId:
            sid:464,
            userId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            dataType:this.state.dataType,
            locale:"zh_CN",
            typeId:this.state.typeId,
        }
/*
        console.log(data)
        console.log("this.state.dataRight")
        console.log(this.state.dataRight)
*/
        handleChangeDataConfirm(data)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success==true){

                message.success('修改成功',2);
                this.setState({
                    editable:0,
                    alreadyChange:1,
                    selectedRowKeys:[],
                    currentSelectId:'',
                              })
                let dataRight = [

                    {
                        key: '0',
                        names: '指标名称',
                        money:this.state.name,
                        width:"130",
                    },
                    {
                        key: '1',
                        names: '表',
                        money:this.state.tableName,
                        width:"130",
                    },
                    {
                        key: '2',
                        names: '字段',
                        money:this.state.columnName,
                        width:"130",
                    },
                    {
                        key: '3',
                        names: '指标单位',
                        money:this.state.unit,
                        width:"130",
                        address: 'London No. 1 Lake Park',
                    },
                    {
                        key: '4',
                        names: '数据类型',
                        editable: true,
                        dataIndex: 'step',
                        align: 'center',
                        filtered: true,
                        money: '*************',
                        width:"30",
                    },
                    {
                        key: '5',
                        names: '转换比例',
                        money:this.state.unitConversion,
                        width:"30",
                    },
                    {
                        key: '6',
                        names: '指标来源',
                        money: this.state.type?"衍生计算":"数据库",
                        width:"30",
                    },
                    {
                        key: '7',
                        names: '指标类型',
                        money: '*************',
                        width:"30",
                    },
                    {
                        key: '8',
                        names: '数据频率',
                        money: '*************',
                        width:"30",
                    },
                    {
                        key: '9',
                        names: '同义词',
                        // money: thesaurus,
                        money: <TextArea
                                value={this.state.thesaurus}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />,

                        width:"30",
                        address: 'London No. 1 Lake Park',
                    },
                ];
                this.setState({
                    dataRight
                })

                let pageSize=15,
                    sid=464,
                    entityCode=this.state.entityCode


                handleIndexManage(sid,entityCode,pageSize)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        this.setState({
                            dataList:res.result.datarows,
                            total:res.result.datamaster.totalrecord,
                        })
                    })
            }else{
                message.warning(res.msg,2);
            }
        })
    }

    /*新增表格数据确认*/
    dataAddConfirm=()=>{
        console.log(this.state.colNameCurrent)
        console.log(this.state.trading)
        console.log(this.state.section)

        let {name,tableName,columnName,thesaurusAdd,unit,dataType,type,indexType,frequency,unitConversionAdd,trading,section}=this.state
        console.log(name,tableName,unit,columnName,thesaurusAdd,type,unitConversionAdd,dataType,indexType,frequency,trading)
        let{TextArea}=Input
        let data={
            value:this.state.narrowTableAdd,
            func:!this.state.funcAdd?"func$sum":this.state.funAddHandleBefore,
            entityCode:this.state.entityCode,
            trading,
            section,
            name,
            tableName:this.state.wordChoose,//具体表名
            columnName:this.state.colNameCurrent,
            thesaurus:thesaurusAdd,
            type:this.state.sourceOrigion,//是否计算指标-数据来源
            typeName:indexType,//指标类型
            timeUnit:frequency,//频率
            indicsUnit:{
                unit:this.state.unit,
                unitConversion:this.state.unitConversionAdd,
                dataType:this.state.dataTypeReal,
                currencyType:null
            },
            sid:464,
            userId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            locale:"zh_CN",
            typeId:this.state.typeIdCurrent
        }
        console.log(data)
        handleAddIndex(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success==true){
                    message.success('新增成功',2);
                    this.setState({
                        name:'',
                        addStatus:0,
                        alreadyChange:1,
                    },()=>{
                        console.log(this.state.currentSelectId)
                    })
                    let dataRight = []
                    this.setState({
                        dataRight
                    })
                    let pageSize=15,
                        sid=464,
                        entityCode=this.state.entityCode
                    handleIndexManage(sid,entityCode,pageSize)
                        .then(res=>res.json())
                        .then(res=>{
                            console.log(res)
                            this.setState({
                                dataList:res.result.datarows,
                                total:res.result.datamaster.totalrecord,
                            })
                        })
                }else{
                    message.warning(res.msg,2);
                }
            })

    }

    /* 输入搜索内容*/
    getKeyWords=(event)=>{
        this.setState({
            searchWord:event.target.value
        },()=>{
        })
    }

    /*删除*/
    deleteDetail=()=>{
        let sid=464,
            id=this.state.currentSelectId,
            userId="19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9"
        console.log(id)
/*
            userId="19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            locale="zh_CN"
*/

        let data={
            sid,
            id,
            userId
        }
        if(!this.state.currentSelectId){
            message.warning('请选择删除列表项',2);
            return
        }
        handleDeleteIndex(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success=true){
                    message.success('删除成功',2)
                    let sid=464,
                        pageSize=15,
                        entityCode=this.state.entityCode
                    let data={
                        sid,
                        pageSize,
                        entityCode:this.state.entityCode
                    }

                    handleIndexManage(sid,entityCode,pageSize)
                        .then(res=>res.json())
                        .then(res=>{
                            console.log(res)
                            if(res.success==true){
                                this.setState({
                                    dataList:res.result.datarows,
                                    total:res.result.datamaster.totalrecord,
                                    dataRight:[],
                                })
                            }
                        })

                }else{
                    message.warning(res.result,2);
                }
            })
    }

    //新增选择指标类型
    chooseIndexType=(value)=>{
        console.log(value)
    }




    /* 搜索关键字*/
    handleSearch=()=> {
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
        handleSearchIndex(data)
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

      /*新增表名*/
    addName=(event)=>{

        this.setState({
            name:event.target.value
        },()=>{
            console.log(this.state.name)
        })
    }
    /*新增指标名*/
    addNewIndex=(event)=>{

        this.setState({
            unit:event.target.value
        },()=>{
            console.log(this.state.unit)
        })
    }
    /*新增转换比例*/
    addTransformRate=(event)=>{

        this.setState({
            unitConversionAdd:event.target.value
        },()=>{
            console.log(this.state.unitConversionAdd)
        })
    }
     /*新增选择数据来源*/
    chooseSourceOrigion=(event)=>{
        console.log('radio checked', event.target.value);
         switch(event.target.value){
                     case 1:
                         this.setState({
                             sourceOrigion:false,
                         },()=>{
                             console.log(this.state.sourceOrigion)
                         });

                         break;
                     case 2:
                         this.setState({
                             sourceOrigion:true,
                         },()=>{
                             console.log(this.state.sourceOrigion)
                         });
                         break;
                 }
    }
    /* 选择数据类型*/
    chooseDataType=(value)=>{
        console.log(666)
        console.log(value)
        console.log(this.state.editable)
/*
        if(this.state.editable==0) return
*/
/*
        if(this.state.editable){
*/
            switch(value){
                case "数量":
                    // alert(1)
                    this.setState({
                        dataTypeAdd:1
                    })
                    break;
                case "金额":
                    // alert(2)
                    this.setState({
                        dataTypeAdd:2
                    })
                    break;
                case "百分比":
                    // alert(3)
                    this.setState({
                        dataTypeAdd:3
                    })
                    break;
            }
    }

    handleChangeFuncValue=(value)=>{
        console.log(value)
        console.log(this.state.funcCurrent)
        console.log(this.state.func)

          this.setState({
                      funcCurrent:value,
                      funcStatus:2,
                  })
    }

    handleAddFuncValue=(value)=>{
        console.log(value)
        console.log(this.state.funcAddCurrent)
        console.log(this.state.funcAdd)

     let  funcAddCurrent=value.match(/\$(\S+)/)[1].toUpperCase()
        this.setState({
            funcAddCurrent,
            funAddHandleBefore:value,
            funcAdd:1,
        })
        console.log(funcAddCurrent)
    }

      // 窄表配置更改
    onChangeNarrowTable=(e)=>{
        console.log(e.target.checked)
        this.setState({
            narrowTable:e.target.checked
        })
    }


    /*更改是否时点值*/
    onChangeTime=(e)=>{
        console.log(e.target.checked)
        this.setState({
            section:e.target.checked
        })
    }
     // 新增是否增加窄表配置
    onChangeNarrowTableAdd=(e)=>{
        console.log(e.target.checked)
        this.setState({
            narrowTableAdd:e.target.checked
        })
    }

    /*是否时点值*/
    onChooseTime=(e)=>{
        console.log(e.target.checked)
        this.setState({
            section:e.target.checked
        })
    }
   /* 是否区分交易日*/
    onChooseDay=(e)=>{
        console.log(e.target.checked)
        this.setState({
            trading:e.target.checked
        })
    }



    /* 更改--是否区分交易日*/
    onChangeDay=(e)=>{
        console.log(e.target.checked)
        this.setState({
            trading:e.target.checked
        })
    }
    /* 新增列表项*/
    addIndexDetail=()=>{

       if(!this.state.AddNew){
           message.warning('请选择二级目录进行新增')
           return
       }
        console.log(this.state.dbId)

        let sid = 464
        let data= {
            sid,
            dbId:this.state.dbId,
            }

         /* 获取dbName*/
        handelGetDBName(sid)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                let arr=[]
                let {datarows}=res.result
                console.log(this.state.dbId)
                datarows.map((item,index)=>{
                    if(item.id=this.state.dbId) arr.push(item.dbName)
                })
                this.setState({
                    dbName:arr[0]
                },()=>{
                    console.log(this.state.dbName)
                })
            })
       /* 获取数据库表列表*/
        handelGetTableList(data)

        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            let arr=[],
                {table,view}=res.result

            table.map((item,index)=>{
                arr.push(item.tbName)
                             })
            view.map((item,index)=>{
                arr.push(item.tbName)
            })
            console.log(arr)
            this.setState({
                              tableList:arr
                          },()=>{
                console.log(this.state.tableList)
                console.log(this.state.tableList[0])

                this.chooseTableDetail(this.state.tableList[0])
            })
        })

        .then(()=>{
            console.log(this.state.currentSelectId)
            this.setState({
                name:'',
                editable:1,
                addStatus:1,
                currentSelectId:null,
                selectedRowKeys:[]
            },()=>{
                this.setState({
                    currentSelectId:null,
                })
                console.log(this.state.currentSelectId)
            })
            // let name=this.state.mainWord
            var realName = ''
            let {TextArea}=Input
            const columnsRight = [
                {
                    title: '指标名称',
                    dataIndex: 'names',
                    align:"left",
                    width:"40%",
                },
                {
                    title: '*****',
                    className: 'column-money',
                    dataIndex: 'money',
                    align:"left",
                    render:(text,row,index)=>this.selectView(index,text,row),
                },
            ];

            const dataRight = [
                {
                    key: '0',
                    names: '指标名称',
                    money: <Input defaultValue={this.state.name} placeholder={"请输入指标名称"} onChange={this.addName}/>,
                },
                {
                    key: '1',
                    names: '表',
                    money: <Select defaultValue={this.state.tableList}  style={{ width: 120 }} onChange={this.chooseTableDetail}>
                        {
                            this.state.tableList.length>0&&this.state.tableList.map((item,index) => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                },
                {
                    key: '2',
                    names: '字段',
                    money: <Select value={this.state.colName} style={{ width: 120 }} onChange={this.changeColName}>
                        {
                            this.state.colName.length>0&&this.state.colName.map((item,index) => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })
                        }

                    </Select>

                },
                {
                    key: '3',
                    names: '指标单位',
                    money: <Input defaultValue="" onChange={this.addNewIndex} placeholder={"请输入指标单位"}/>,
                },
                {
                    key: '4',
                    names: '数据类型',
                    money: <Select defaultValue="请选择字段" style={{ width: 120 }} onChange={this.changeDataType}>
                        {
                            this.state.dataTypeList&&this.state.dataTypeList.map((item,index) => {
                                return (
                                    <Option value={index} key={index}>{item}</Option>
                                )
                            })
                        }

                    </Select>

                },
                {
                    key: '5',
                    names: '转换比例',
                    money: <Input defaultValue={this.state.unitConversionAdd} onChange={this.addTransformRate} placeholder={"请输入转换比例"}/>,
                },
                {
                    key: '6',
                    names: '指标来源',
                    money:

                        <Radio.Group onChange={this.chooseSourceOrigion} defaultalue={1}>
                            <Radio value={1}>数据库</Radio>
                            <Radio value={2}>衍生计算</Radio>
                        </Radio.Group>
                },
                {
                    key: '7',
                    names: '指标类型',
                    money: <Select defaultValue="请选择指标类型" style={{ width: 120 }} onChange={this.changeIndexType}>
                        {
                            this.state.IndexTypeList&&this.state.IndexTypeList.map((item,index) => {
                                return (
                                    <Option value={index} key={index}>{item}</Option>
                                )
                            })         }
                    </Select>

                },
                {
                    key: '8',
                    names: '数据频率',
                    money: <Select defaultValue="请选择数据频率" style={{ width: 120 }} onChange={this.changeFrequency}>
                        {
                            this.state.frequencyList&&this.state.frequencyList.map((item,index) => {
                                return (
                                    <Option value={index} key={index}>{item}</Option>
                                )
                            })
                        }
                    </Select>

                },
                {
                    key: '9',
                    names: '同义词',
                    money:  <TextArea
                        defaultValue={this.state.thesaurusAdd}
                        onChange={this.handleAddTextArea}
                        placeholder="请输入同义词内容"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />,
                },
            ];

            this.setState({
                dataRight:dataRight,
                columnsRight:columnsRight,
            })
/*
        .then(()=>{
            if(this.state.wordChoose){
                handelGetColumnInfo()
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                    })
            }
        })
*/
        })

/*
        if(this.state.wordChoose){
            let data={
                tableName:this.state.wordChoose,
                dbId:this.state.dbId
            }
            handelGetColumnInfo(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
            })
*/
        // }


    }


    //选择数据库某表字段
    chooseTableDetail=(value)=>{
        console.log(value)
        this.setState({
            wordChoose:value
        },()=>{

            const {TextArea} =Input
            let data={
                tableName:this.state.wordChoose,
                dbId:this.state.dbId,
                sid:464,
                dbName:this.state.dbName
            }
            handelGetColumnInfo(data)
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    let arr=[]
                    if(res.success=true){
                        let {result}=res
                        result.map((item,index)=>{
                            arr.push(item.colName)
                        })
                    }
                    this.setState({
                        colName:arr
                    },()=>{
                        console.log(this.state.colName)

                        const columnsRight = [
                            {
                                title: '指标名称',
                                dataIndex: 'names',
                                align:"left",
                                width:"40%",
                            },
                            {
                                title: '*****',
                                className: 'column-money',
                                dataIndex: 'money',
                                align:"left",
                                render:(text,row,index)=>this.selectView(index,text,row),
                            },
                        ];

                        const dataRight = [
                            {
                                key: '0',
                                names: '指标名称',
                                money: <Input defaultValue={this.state.name} placeholder={"请输入指标名称"} onChange={this.addName}/>,
                            },
                            {
                                key: '1',
                                names: '表',
                                money: <Select defaultValue={this.state.tableList}  style={{ width: 120 }} onChange={this.chooseTableDetail}>
                                    {
                                        this.state.tableList.length>0&&this.state.tableList.map((item,index) => {
                                            return (
                                                <Option value={item} key={index}>{item}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            },
                            {
                                key: '2',
                                names: '字段',
                                money: <Select value={this.state.colName} style={{ width: 120 }} onChange={this.changeColName}>
                                    {
                                        this.state.colName.length>0&&this.state.colName.map((item,index) => {
                                            return (
                                                <Option value={item} key={index}>{item}</Option>
                                            )
                                        })
                                    }

                                </Select>

                            },
                            {
                                key: '3',
                                names: '指标单位',
                                money: <Input defaultValue="" onChange={this.addNewIndex} placeholder={"请输入指标单位"}/>,
                            },
                            {
                                key: '4',
                                names: '数据类型',
                                money: <Select defaultValue="请选择字段" style={{ width: 120 }} onChange={this.changeDataType}>
                                    {
                                        this.state.dataTypeList&&this.state.dataTypeList.map((item,index) => {
                                            return (
                                                <Option value={index} key={index}>{item}</Option>
                                            )
                                        })
                                    }

                                </Select>

                            },
                            {
                                key: '5',
                                names: '转换比例',
                                money: <Input defaultValue={this.state.unitConversionAdd} onChange={this.addTransformRate} placeholder={"请输入转换比例"}/>,
                            },
                            {
                                key: '6',
                                names: '指标来源',
                                money:

                                    <Radio.Group onChange={this.chooseSourceOrigion} defaultalue={1}>
                                        <Radio value={1}>数据库</Radio>
                                        <Radio value={2}>衍生计算</Radio>
                                    </Radio.Group>
                            },
                            {
                                key: '7',
                                names: '指标类型',
                                money: <Select defaultValue="请选择指标类型" style={{ width: 120 }} onChange={this.changeIndexType}>
                                    {
                                        this.state.IndexTypeList&&this.state.IndexTypeList.map((item,index) => {
                                            return (
                                                <Option value={index} key={index}>{item}</Option>
                                            )
                                        })         }
                                </Select>

                            },
                            {
                                key: '8',
                                names: '数据频率',
                                money: <Select defaultValue="请选择数据频率" style={{ width: 120 }} onChange={this.changeFrequency}>
                                    {
                                        this.state.frequencyList&&this.state.frequencyList.map((item,index) => {
                                            return (
                                                <Option value={index} key={index}>{item}</Option>
                                            )
                                        })
                                    }
                                </Select>

                            },
                            {
                                key: '9',
                                names: '同义词',
                                money:  <TextArea
                                    defaultValue={this.state.thesaurusAdd}
                                    onChange={this.handleAddTextArea}
                                    placeholder="请输入同义词内容"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />,
                            },
                        ];

                        this.setState({
                            dataRight:dataRight,
                            columnsRight:columnsRight,
                        })
                    })
                })
        })
    }
    render() {
        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
      <div className="company-info">
          <div className="company-container">
              <div className="container-left index">
                  {/*顶部菜单*/}
                  <div className="top">
                      <div>
                         {/* 增加*/}
                          <PlusOutlined style={{marginRight:15}} onClick={this.addIndexDetail}/>
                          {/*删除*/}
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
                          <Input  size="small" placeholder="关键字"
                                  defaultValue={this.state.searchWord}
                                  onChange={this.getKeyWords}
                                  prefix={<SearchOutlined  onClick={this.handleSearch}/>} />
                      </div>
                  </div>
                  {/*中部内容部分*/}
                  <div className="center">
                      <Table
                          className={"table-style-one"}
                          scrollx={true}
                          pagination={{ position: [this.state.top, this.state.bottom],pageSize: 15 }}
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
                          this.state.currentSelectId?
                              <div className={"check-style"}>
                                  <div>
                                      <Checkbox disabled={!this.state.editable} checked={this.state.section} onChange={this.onChangeTime}>是否为时点值</Checkbox>
                                      <Checkbox disabled={!this.state.editable} checked={this.state.trading} onChange={this.onChangeDay}>区分交易日</Checkbox>
                                      <Checkbox  disabled={!this.state.editable} checked={this.state.narrowTable} onChange={this.onChangeNarrowTable}>是否是指标值(窄表)</Checkbox>
                                  </div>

                                  <div className="check-style-fun">
                                      <span className="check-fun-title">默认聚合函数</span>
                                      <div className="fun-style">
                                          <Select
                                              disabled={this.state.editable?false:true}
                                              value={this.state.funcOrigion==null?"SUM":this.state.funcCurrent}
                                              style={{ width: 120 }}
                                              onChange={this.handleChangeFuncValue}>
                                              {
                                                 this.state.funList.map((item,index)=>{
                                                     return (
                                                         <Option value={`ifunc$`+item.toLowerCase()} key={index}>{item}</Option>
                                                     )
                                                 })
                                              }
                                          </Select>
                                      </div>
                                  </div>

                              </div>
                              :null
                      }

                      {
                          this.state.addStatus?

                              <div className={"check-style"}>
                                  <div>
                                      <Checkbox checked={this.state.section} onChange={this.onChooseTime}>是否为时点值</Checkbox>
                                      <Checkbox checked={this.state.trading} onChange={this.onChooseDay}>区分交易日</Checkbox>
                                      <Checkbox checked={this.state.narrowTableAdd} onChange={this.onChangeNarrowTableAdd}>是否是指标值(窄表)</Checkbox>
                                  </div>


                                  <div className="check-style-fun">
                                      <span className="check-fun-title">默认聚合函数</span>
                                      <div className="fun-style">
                                          <Select
                                              disabled={this.state.editable?false:true}
                                              value={!this.state.funcAdd?"SUM":this.state.funcAddCurrent}
                                              style={{ width: 120 }}
                                              onChange={this.handleAddFuncValue}>
                                              {
                                                  this.state.funList.map((item,index)=>{
                                                      return (
                                                          <Option value={`ifunc$`+item.toLowerCase()} key={index}>{item}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      </div>
                                  </div>
                              </div>
                              :null
                      }
                      {
                          this.state.addStatus==0&&this.state.editable&&this.state.currentSelectId?<div className={"editConfirm"}>
                              <Button type="primary" onClick={this.dataEditConfirm}>确认1</Button>
                              <Button onClick={this.dataEditCancel}>取消</Button>
                          </div>
                              :null
                      }
                      {
                          this.state.addStatus?<div className={"editConfirm"}>
                                  <Button type="primary" onClick={this.dataAddConfirm}>确认2</Button>
                                  <Button onClick={this.dataAddCancel}>取消</Button>
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
export default IndexManagement;