import React, { Component } from 'react';

import {Table, Radio, Divider, Pagination, Input, message, Button, Select} from 'antd';
import { SyncOutlined, WindowsOutlined, EditOutlined,PlusOutlined
    ,CopyOutlined,SearchOutlined,CreditCardFilled,DeleteOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './style.scss';
import {
    handleGetDataBaseType,
    handleGetDictionary,
    handleGetDictionaryDetail,
    handleDeleteDictionaryDetail,
    handleAddDictionaryDetail,
    handleGetTagDetail, handleChangeDataConfirm,
    handleSearchDictionary,
    changeDictionaryPage
} from "../../api/request"

import DataDemo from "../HookDemo/index.js"

const columns = [
    {
        title: '主词',
        dataIndex: 'mainWord',
        width:"20%",
    },
    {
        title: '同义词',
        dataIndex: 'thesaurus',
        width:"35%",
    },
    {
        title: '标签',
        dataIndex: 'tag',
        width:"20%",
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
        width:"25%",
    },
];

const columnsRight = [
    {
        title: '链接名称',
        dataIndex: 'name',
        // width:"40%",
        // render: text => <a>{text}</a>,
    },
    {
        title: '*****',
        className: 'column-money',
        dataIndex: 'money',
        // width:"60%",
    },
];

/*
const dataRight = [
    {
        key: '1',
        name: '词名称',
        money: 1,
        width:"130",
       
    },
    {
        key: '2',
        name: '标签',
        money: 2,
        width:"130",
      
    },
    {
        key: '3',
        name: '数据库',
        money:3,
        width:"30",
      
    },
    {
        key: '4',
        name: '表',
        money:4,
        width:"30",
      
    },
    {
        key: '5',
        name: '字段',
        money: 5,
        width:"30",
      
    },
    {
        key: '6',
        name: '同义词',
        money: 6,
        width:"30",
      
    },
];
*/

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
          selectedRowKeys1: [],
          baseList:[],
          dataRight:null,
          tagName:'',
          thesaurus:'',
          mainWord:'',
          mainWordNotConfirm:'',
          tag:'',
          dbInfo:{
              dbName:'',
              tbName:'',
              colName:"",
          },
          code:'',
          editToAdd:0,
          tagList:[],
          tagNameList:[],
          tagCodeList:[],
          tagListTotalInfo:[],
          tagCodeChoosed:'',
          thesaurusAdd:'',
          tagCode:'',
          thesaurusEdit:'',//编辑的时候的值
          editToChange:0,
          currentSelectId:'',
          searchWord:'',
          total:'',
          currentPage:'',
      }

  }

    componentDidMount(){
            let sid=464,
                pageSize=15
                let data={
                    sid,
                    pageSize
                }

        handleGetDictionary(data)
        .then(res=>res.json())
                            .then(res=>{
                                console.log(res)
                                if(res.success==true){
                                    this.setState({
                                        dataList:res.result.datarows,
                                        total:res.result.datamaster.totalrecord,
                                    })
                                }
                            })

/*
        handleGetDataBaseType()
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success=true){
                   let dataList=res.result
                    let arr=[]
                    dataList.map((item,index)=>{
                        arr.push(item.name)
                    })
                    this.setState({
                        baseList:arr
                    })
                   console.log(this.state.baseList)
                }


            })
*/

        /* 数据频率 时间颗粒度*/
/*
        handleGetFrequency()
            .then(res=>res.json())
*/
           /* .then(res=>{
                if(res.success==true){
                    this.setState({
                        frequencyList:res.result
                    })
                    let arr=[]
                    this.state.frequencyList.map((item,index)=>{
                        arr.push(item.name)
                    })
                    /!*
                                      console.log(arr)
                    *!/
                    this.setState({
                        arrList:arr
                    })
                    /!*
                                      console.log(this.state.frequencyList)
                                      console.log(this.state.arrList)
                    *!/

                    const columnsRight = [
                        {
                            title: '指标名称',
                            dataIndex: 'names',
                            width:30,
                            align:"left",
                        },
                        {
                            title: '*****',
                            className: 'column-money',
                            dataIndex: 'money',
                            align:"left",
                            render:(text,row,index)=>this.selectView(index,text),
                            width:30,
                        },
                    ];
                    this.setState({
                        columnsRight:columnsRight
                    })
                }

            })*/
    }

    changeMainWord=(event)=>{

      this.setState({
          mainWordNotConfirm:event.target.value
                    },()=>{
          console.log(this.state.mainWordNotConfirm)
      })
    }


    /* 标签选择 传code*/
    changeTagCode=(value)=>{
       /* this.setState({
            mainWordNotConfirm:event.target.value
        })*/
        console.log(value)
      let {tagListTotalInfo}=this.state,
          arr=[]
        tagListTotalInfo.map((item,index)=>{
            arr.push(item.code)
                         })
        console.log(arr)
        console.log("arr[value]")
        console.log(arr[value])
        this.setState({
                          tagCodeChoosed:arr[value]
                      })
    }

    /* 同义词新增*/
    handleAddTextArea=(event)=>{
        this.setState({
            thesaurusAdd:event.target.value
        },()=>{
            console.log(this.state.thesaurusAdd)
        })
    }

    /* 同义词修改*/
    handleChangeTextArea=(event)=>{
        this.setState({
            thesaurusEdit:event.target.value
        },()=>{
            console.log(this.state.thesaurusEdit)
        })
    }


    switchTagStatus=(status)=>{
       switch(status){

/*
           实体 entity  dim是维度 glossary 术语 默认指标 index
*/
                   case "entity":
                       return '实体'
                       break;
                   case "dim":
                       return '维度'
                       break;
                   case "glossary":
                       return '术语'
                       break;
                   case "index":
                       return '默认指标'
                       break;
               }
    }

   /* 新增列表项*/
    addDetail=()=>{
        let sid=464
        // let name=this.state.mainWord
        var realName=''
        handleGetTagDetail(sid)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success=true){

                let {TextArea}=Input
                let {result}=res,
                    name=[],
                    code=[]
                  this.setState({
                                  tagListTotalInfo:res.result
                              })
                result&&result.map((item,index)=>{
                    console.log(item.code)

/*
                     var resBefore=(item.code).match(/(\S*)$/)[1],
                         resAfter=(item.code).match(/$(\S*)/)[1];
*/

                    var [ , resBefore, resAfter ] = item.code.match(/(\S+)\$(\S+)|undefined/)

                    console.log(resBefore)
                    console.log(resAfter)
                     let status= this.switchTagStatus(resBefore),
                            str=":", str2="(", str3=")"
                    /* 拼接后*/
                       realName=item.name.concat(str2,status,str,resAfter,str3);
                     this.state.tagNameList.push(realName)
                })
               /* 最终的视图渲染列表*/
                let arrCurrent=Array.from(new Set(this.state.tagNameList))
                // console.log(arrCurrent)
                this.setState({
                    tagNameList:arrCurrent
                              })
                console.log(this.state.tagNameList)

                this.state.editToAdd=1

                const { Option } = Select;


                const dataRight = [
                    {
                        key: '1',
                        name: '词名称',
                        money: <Input defaultValue={this.state.mainWordNotConfirm} onChange={this.changeMainWord}/>,

                    },
                    {
                        key: '2',
                        name: '标签',
                        money: <Select defaultValue="请选择标签" style={{ width: 120 }} onChange={this.changeTagCode}>
                            {
                                this.state.tagNameList&&this.state.tagNameList.map((item,index) => {
                                    return (
                                        <Option value={index} key={index}>{item}</Option>
                                    )
                                })
                            }

                        </Select>

                    },
/*
                    {
                        key: '3',
                        name: '数据库',
                        money: <Input defaultValue="" onChange={this.changeMainWord}/>,

                    },
                    {
                        key: '4',
                        name: '表',
                        money: <Input defaultValue="" onChange={this.changeMainWord}/>,
                    },
                    {
                        key: '5',
                        name: '字段',
                        money:<Input defaultValue="" onChange={this.changeMainWord}/>,

                    },
*/
                    {
                        key: '6',
                        name: '同义词',
                        money:  <TextArea
                            defaultValue={this.state.thesaurusAdd}
                            onChange={this.handleAddTextArea}
                            placeholder="请输入同义词内容"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />,
                    },
                ];

                this.setState({
                    dataRight:dataRight
                })

            }
        })
    }
     //更改
    editDetail=()=>{
        console.log(this.state.currentSelectId)
        if(!this.state.currentSelectId){
            message.warning('请选择要编辑的列表项',1)
            return
        }else{

            this.setState({
                editToChange:1,
            })

            const{TextArea}=Input

            const dataRight = [
                {
                    key: '1',
                    name: '词名称',
                    money: this.state.mainWord,

                },
                {
                    key: '2',
                    name: '标签',
                    money: this.state.tag,

                },
                {
                    key: '3',
                    name: '数据库',
                    money: this.state.dbInfo.dbName,

                },
                {
                    key: '4',
                    name: '表',
                    money: this.state.dbInfo.tbName,
                },
                {
                    key: '5',
                    name: '字段',
                    money: this.state.dbInfo.colName,

                },
                {
                    key: '6',
                    name: '同义词',
                    money:<TextArea
                        defaultValue={this.state.thesaurus}
                        onChange={this.handleChangeTextArea}
                        placeholder="请输入同义词内容"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />,
                },
            ];
            this.setState({
                dataRight
            })

        }
    }

     /*删除*/
    deleteDetail=()=>{
      let sid=464,
          userId="19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
          locale="zh_CN"

      let data={
          word:this.state.mainWord,
          tag:this.state.tagCode,
          userId,
          locale,
          sid
      }
      if(!this.state.currentSelectId){
          message.warning('请选择删除列表项',2);
          return
      }
        handleDeleteDictionaryDetail(data)
        .then(res=>res.json())
                            .then(res=>{
                                console.log(res)
                                if(res.success=true){
                                    message.success(res.result,2);
                                    let sid=464,
                                        pageSize=15
                                    let data={
                                        sid,
                                        pageSize
                                    }
                                    handleGetDictionary(data)
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

                                }else{
                                    message.warning(res.result,2);
                                }
                            })
    }

    onRowClick=(value)=>{
        console.log(value)
    }

   /* 左侧勾选 右侧对应数据发生改变*/
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log(666)
        this.setState({ selectedRowKeys });
        let sid=464
        if(selectedRowKeys.length>0) {

            let arr = selectedRowKeys
            console.log(arr[arr.length - 1])

            this.setState({
                currentSelectId: arr[arr.length - 1]
            }, () => {

                /*左侧表格勾选 右侧展示对应数据*/
                handleGetDictionaryDetail(sid,this.state.currentSelectId,)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        let {thesaurus,mainWord,tag,code}=res.result
                        let {dbName,tbName,colName}=res.result.dbInfo

                        console.log(dbName,tbName,colName,thesaurus,mainWord,tag)
                        this.setState({
                            tag,thesaurus,mainWord,
                            tagCode:code,
                            dbInfo:{
                                dbName,tbName,colName
                            }
                                      })

                        const dataRight = [
                            {
                                key: '1',
                                name: '词名称',
                                money: mainWord,
                               
                            },
                            {
                                key: '2',
                                name: '标签',
                                money: tag,
                              
                            },
                            {
                                key: '3',
                                name: '数据库',
                                money: dbName,
                              
                            },
                            {
                                key: '4',
                                name: '表',
                                money: tbName, address: 'London No. 1 Lake Park',
                            },
                            {
                                key: '5',
                                name: '字段',
                                money: colName,
                              
                            },
                            {
                                key: '6',
                                name: '同义词',
                                money: thesaurus,
                              
                            },
                        ];

                        this.setState({
                            dataRight:dataRight
                                      })

                    })
            })
        }
    }
     // 点击页数跳转
    changeCenterTable = (pageNumber)=>{
        let sid=464
        console.log('Page: ', pageNumber);
        this.setState({
                          currentPage:pageNumber
                      })
        let data={
            startPage:pageNumber,
            sid,
        }
        changeDictionaryPage(data)
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

     /* 编辑-(删除-新增)*/
    dataEditConfirm=()=>{


        let sid=464,
            userId="19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            locale="zh_CN"

        let data={
            word:this.state.mainWord,
            tag:this.state.tagCode,
            userId,
            locale,
            sid,
        }
        console.log(data)
        /* 删除*/
        handleDeleteDictionaryDetail(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success=true){
                    let sid=464,
                        userId="19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
                        locale="zh_CN"


                  /*  thesaurusAdd*/
                    /*let data={
                        sid,
                        userId:userId,
                        locale:"zh_CN",
                        mainWord:this.state.mainWordNotConfirm,
                        tagCode:this.state.tagCodeChoosed,
                        thesaurus: this.state.thesaurusAdd,
                    }*/
                    /*新增*/

                    console.log(data)

                }

        })
            .then(res=>{

                let data={
                    sid,
                    userId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
                    locale:"zh_CN",
                    mainWord:this.state.mainWord,
                    tagCode:this.state.tagCode,
                    thesaurus: this.state.thesaurusEdit,
                }
                console.log(data)
               /* 新增*/
                handleAddDictionaryDetail(data)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        if(res.success==true){
                            message.success('编辑成功',1)}
                        let sid=464,
                            pageSize=15
                        let data={
                            sid,
                            pageSize
                        }
                            handleGetDictionary(data)
                            .then(res=>res.json())
                            .then(res=>{
                                console.log(res)
                                if(res.success==true){
                                    this.setState({
                                        dataList:res.result.datarows,
                                        dataRight:[],
                                        editToChange:0,
                                        selectedRowKeys:[],
                                        currentSelectId:'',
                                    })
                                }
                            })
                    })
            })
    }

    dataAddConfirm=()=>{
        let sid=464
        let{TextArea}=Input
        let data={
            sid,
            userId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
            locale:"zh_CN",
            mainWord:this.state.mainWordNotConfirm,
            tagCode:this.state.tagCodeChoosed,
            thesaurus: this.state.thesaurusAdd,
        }
        console.log(data)

        handleAddDictionaryDetail(data)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success==true){
                    message.success('新增成功',1);
                    this.setState({
                        editToAdd:0,
                        mainWordNotConfirm:'',
                        tag:'',
                        thesaurusAdd:'',
                                  })

                    let sid=464,
                        pageSize=15
                    let data={
                        sid,
                        pageSize
                    }

                    handleGetDictionary(data)
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
                }else{
                    message.success('添加失败，请重新新增',1);
                }
            })

        /*
                handleChangeDataConfirm(data)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res)
                        if(res.success==true){

                            message.success('修改成功',2);
                            this.setState({
                                editable:0,
                                alreadyChange:1,
                            })

                            let dataRight = [

                                {
                                    key: '0',
                                    names: '指标名称',
                                    money:this.state.name,
                                    width:"130",
                                    address: 'New York No. 1 Lake Park',
                                },
                                {
                                    key: '1',
                                    names: '表',
                                    // money: 'movie',
                                    // money: tableName,
                                    money:this.state.tableName,
                                    width:"130",
                                    address: 'New York No. 1 Lake Park',
                                },
                                {
                                    key: '2',
                                    names: '字段',
                                    // money: '*************',
                                    // money: columnName,
                                    money:this.state.columnName,
                                    width:"130",
                                    address: 'London No. 1 Lake Park',
                                },
                                {
                                    key: '3',
                                    names: '指标单位',
                                    money:this.state.indicsUnit.unit,
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
                                    // money: '*************',
                                    money: '*************',
                                    width:"30",
                                    address: 'London No. 1 Lake Park',
                                },
                                {
                                    key: '5',
                                    names: '转换比例',
                                    // money: unitConversion,
                                    money:this.state.unit,
                                    width:"30",
                                    address: 'London No. 1 Lake Park',
                                },
                                {
                                    key: '6',
                                    names: '指标来源',
                                    money: this.state.type?"数据库":"衍生计算",
                                    width:"30",
                                    address: 'London No. 1 Lake Park',
                                },
                                {
                                    key: '7',
                                    names: '指标类型',
                                    money: '*************',
                                    width:"30",
                                    address: 'London No. 1 Lake Park',
                                },
                                {
                                    key: '8',
                                    names: '数据频率',
                                    money: '*************',
                                    width:"30",
                                    address: 'London No. 1 Lake Park',
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
                        }else{
                            message.warning(res.msg,2);
                        }
                    })
        */

    }

   /* 取消新增*/
    dataAddCancel=()=>{
     let   {TextArea}=Input
/*
        let dataRight = [

            {
                key: '0',
                names: '指标名称',
                money:"",
                width:"130",
               
            },
            {
                key: '1',
                names: '表',
                money:"",
                width:"130",
               
            },
            {
                key: '2',
                names: '字段',
                money:"",
                width:"130",
              
            },
            {
                key: '3',
                names: '指标单位',
                money:"",
                width:"130",
              
            },
            {
                key: '4',
                names: '数据类型',
                editable: true,
                dataIndex: 'step',
                align: 'center',
                filtered: true,
                money: '',
                width:"30",
              
            },
            {
                key: '5',
                names: '转换比例',
                money:"",
                width:"30",
              
            },
            {
                key: '6',
                names: '指标来源',
                money: '',
                width:"30",
              
            },
            {
                key: '7',
                names: '指标类型',
                money: '',
                width:"30",
              
            },
            {
                key: '8',
                names: '数据频率',
                money: '',
                width:"30",
              
            },
            {
                key: '9',
                names: '同义词',
                money: <TextArea
                        value={this.state.thesaurus}
                        onChange={this.handleChangeTextArea}
                        placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />,

                width:"30",

            },
        ];
*/
     let dataRight=[]
        this.setState({
            dataRight:dataRight,
            editToAdd:0,
        })
    }
   /* 取消编辑*/
    dataEditCancel=()=> {

        let {TextArea} = Input
        /*
                let dataRight = [

                    {
                        key: '0',
                        names: '指标名称',
                        money:"",
                        width:"130",

                    },
                    {
                        key: '1',
                        names: '表',
                        money:"",
                        width:"130",

                    },
                    {
                        key: '2',
                        names: '字段',
                        money:"",
                        width:"130",

                    },
                    {
                        key: '3',
                        names: '指标单位',
                        money:"",
                        width:"130",

                    },
                    {
                        key: '4',
                        names: '数据类型',
                        editable: true,
                        dataIndex: 'step',
                        align: 'center',
                        filtered: true,
                        money: '',
                        width:"30",

                    },
                    {
                        key: '5',
                        names: '转换比例',
                        money:"",
                        width:"30",

                    },
                    {
                        key: '6',
                        names: '指标来源',
                        money: '',
                        width:"30",

                    },
                    {
                        key: '7',
                        names: '指标类型',
                        money: '',
                        width:"30",

                    },
                    {
                        key: '8',
                        names: '数据频率',
                        money: '',
                        width:"30",

                    },
                    {
                        key: '9',
                        names: '同义词',
                        money: <TextArea
                                value={this.state.thesaurus}
                                onChange={this.handleChangeTextArea}
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />,

                        width:"30",

                    },
                ];
        */
        let dataRight = []
        this.setState({
            dataRight: dataRight,
            editToAdd: 0,
            editToChange:0,
            selectedRowKeys:[],
            currentSelectId:'',
        },()=>{
            console.log(this.state.selectedRowKeys)
            console.log(this.state.currentSelectId)
        })
    }

    /* 搜索关键字*/
    handleSearch=()=> {
        let sid=464,
            name=this.state.searchWord
        console.log(name)
        let data={
            sid,
            name
        }
        handleSearchDictionary(data)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success=true){
                message.success("查询成功",1)
                this.setState({
                    dataList:res.result.datarows
                })
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


    render() {
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
                          {/*增*/}
                          <PlusOutlined style={{marginRight:15}} onClick={this.addDetail}/>
                          {/*删*/}
                          <DeleteOutlined style={{marginRight:15}} onClick={this.deleteDetail}/>
                         {/* 改*/}
                          <EditOutlined style={{marginRight:15}} onClick={this.editDetail}/>
                          <WindowsOutlined style={{marginRight:15}}/>
                          <CopyOutlined style={{marginRight:15}}/>
                          <SyncOutlined style={{marginRight:15}}/>
                      </div>
                      <div>
                          {/*<SearchOutlined />*/}
                          <Input  size="small" placeholder="关键字"
                                  defaultValue={this.state.searchWord}
                                  onChange={this.getKeyWords}
                                  prefix={<SearchOutlined onClick={this.handleSearch}/>}
                          />
                      </div>
                  </div>
                  {/*中部内容部分*/}
                  <div className="center">
                      <div className="center-connect">
                          <Table
                              className={"table-style-one"}
                              scrollx={true}
                              pagination={{ position: [this.state.top, this.state.bottom],pageSize: 15 }}
                              rowSelection={rowSelection}
                              columns={columns}
                              dataSource={this.state.dataList}
                              rowKey={record => record.id}
                          />

                        {/*  <DataDemo />*/}
                      </div>

                  </div>
                  {/*底部分页*/}
                  <div className="bottom">
                      <Pagination
                          showTotal={total => `共${total}条`}
                          total={this.state.total}
                          defaultPageSize={15}
                          defaultCurrent={2}
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
                          // dataSource={dataRight}
                          dataSource={this.state.dataRight}
                          bordered
                          title={() => '属性名称'}
                      />
                      {
                          this.state.editToAdd?
                              <div className={"edit-add"}>
                                  <Button type="primary" onClick={this.dataAddConfirm}>确认</Button>
                                  <Button onClick={this.dataAddCancel}>取消</Button>
                              </div>
                              :null
                      }

                      {
                          this.state.editToChange&&this.state.currentSelectId?
                              <div className={"edit-add"}>
                                  <Button type="primary" onClick={this.dataEditConfirm}>确认</Button>
                                  <Button onClick={this.dataEditCancel}>取消</Button>
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
export default DataConnect;