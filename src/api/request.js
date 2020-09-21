import fetch from 'dva/fetch';
import {gatewayUrl} from "./cong"

let token="$2a$10$ZuVxPar1X7IJb0CstXMXBudB1tzP.Fw"
/*  //配置环境
let gatewayUrl="https://sdve-dev.analyst.ai/api/gateway"
if (window.location.host.indexOf('localhost') >= 0) {
    //本地调试
    gatewayUrl = 'https://sdve-dev.analyst.ai/api/gateway';
} else if (window.location.host.indexOf('-dev') >= 0) {
    gatewayUrl = 'https://sdve-dev.analyst.ai/api/gateway';
} else if (window.location.host.indexOf('-test') >= 0) {
    gatewayUrl = 'https://sdve-test.analyst.ai/api/gateway';
} else if (window.location.host.indexOf('-prac') >= 0) {
    gatewayUrl = 'https://sdve-prac.analyst.ai/api/gateway';
} else {
    gatewayUrl = 'https://sdve.analyst.ai/api/gateway';
}*/
/*1.指标管理接口*/

/*获取左侧指标列表*/
export function handleIndexManage(sid,entityCode,pageSize){
    return fetch(
        // gatewayUrl + '/apix/indics/getListByPage?entityCode=1.com_basic_info&sid=464',{
            gatewayUrl + '/apix/indics/getListByPage?entityCode='+entityCode+'&sid='+sid+'&pageSize='+pageSize,{
        method: 'GET',
        mode: "cors",
        headers: {
        'Content-Type': 'application/json', "Authorization": token,
    },
    })
}

/*新增指标列表项*/
export function handleAddIndex(params){
    return fetch(
        gatewayUrl + '/apix/indics/save?sid='+params.sid+'&userId='+params.userId,{
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
          body:JSON.stringify(params)
        })
}

/*
trading,
    name,tableName,columnName,thesaurusAdd,
    type:this.state.sourceOrigion,//是否计算指标-数据来源
    typeName:indexType,//指标类型
    timeUnit:frequency,//频率
    indicsUnit:{
    unit:this.state.unit,
        unitConversion:this.state.unitConversionAdd,
        dataType:this.state.dataType,
        currencyType:null
},
sid:464,
    userId:"19f5ef31-d2a6-43cc-ba52-9c4de73cc9b9",
    locale:"zh_CN",
    typeId:this.state.typeId,
*/


export function handleDeleteIndex(params){
   /* debugger*/

    return fetch(
        gatewayUrl + '/apix/indics/delete?id='+params.id+'&sid='+params.sid+'&userId='+params.userId,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*关键字查询*/
export function handleSearchIndex(params){

    return fetch(
        gatewayUrl + '/apix/indics/getListByPage?sid='+params.sid+'&value='+params.name+'&entityCode='+params.entityCode+'&pageSize='+params.pageSize,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/* 更新————修改数据发送服务端确认*/
export function handleChangeDataConfirm(params){

    return fetch(
        gatewayUrl + '/apix/indics/update?sid='+params.sid+"&userId="+params.userId+"&locale="+params.locale,{
            // gatewayUrl + "/apix/indics/findById?id="+id+"&sid="+sid,{
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
            body:JSON.stringify(params)
        })
}



export function handleChangeSelectMenu(entityCode,sid){
    return fetch(
        gatewayUrl + '/apix/indics/getListByPage?entityCode=1.com_basic_info&sid=464',{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}


/*获取左侧实体类列表*/
export function handleGetSecondMenu(sid){
  /*  debugger*/
    return fetch(
        gatewayUrl + "/apix/entity/getListByPage?sid="+sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*获取时间粒度 数据频率*/
export function handleGetFrequency(params){
    return fetch(
        gatewayUrl + '/apix/indics/getTimeUnits?sid=464',{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*获取指标信息右侧  左侧表格对应数据*/
export function handleIndexManageDetail(id,sid){
    // debugger
    return fetch(
        gatewayUrl + "/apix/indics/findById?id="+id+"&sid="+sid,{
            // gatewayUrl + '/apix/indics/findById?id=2895&sid=464',{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*获取数据类型 右侧*/
export function handleGetDataType(sid){
    // debugger
    return fetch(
        gatewayUrl + "/apix/indics/getUnitDataTypes?sid="+sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}


/*获取指标类型 右侧*/
export function handleGetIndexType(sid){
    // debugger
    return fetch(
        gatewayUrl + "/apix/indics/getTypeList?sid="+sid,{
            // gatewayUrl + '/apix/indics/findById?id=2895&sid=464',{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*指标管理分页*/
export function changeIndexPage(params){

    return fetch(
        gatewayUrl + '/apix/indics/getListByPage?sid='+params.sid+'&entityCode='+params.entityCode+'&startPage='+params.startPage+'&pageSize='+params.pageSize,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*指标管理-获取配置的业务数据库列表,获取dbName*/
export function handelGetDBName(sid){
    //debugger

    return fetch(
        gatewayUrl + '/apix/db/getListByPage?sid='+sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*指标管理-获取所有数据库表*/
export function handelGetTableList(params){

    return fetch(
        gatewayUrl + '/apix/db/getTableList?dbId='+params.dbId+'&sid='+params.sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*指标管理-获取所有字段*/
export function handelGetColumnInfo(params){

    return fetch(
        gatewayUrl + '/apix/db/getColumnInfo?dbId='+params.dbId+'&tableName='+params.tableName+'&sid='+params.sid+'&dbName='+params.dbName,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}




/*2.数据连接接口*/

/*数据连接列表*/
export function handleGetDataConnect(params){
    return fetch(
        gatewayUrl + '/datasource/dblink/getListByPage',{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*获取数据库类型*/
export function handleGetDataBaseType(params){
    return fetch(
        gatewayUrl + '/datasource/dblink/getDatabaseTypes',{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}
/*3.词典管理*/

/*获取词典列表*/
export function handleGetDictionary(params){

    return fetch(
        gatewayUrl + '/apix/dic/getList?sid='+params.sid+"&pageSize="+params.pageSize,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}
/*获取词典详情*/
export function handleGetDictionaryDetail(sid,id){

    return fetch(
        gatewayUrl + '/apix/dic/findById?sid='+sid+'&id='+id,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}
/*关键字查询*/
export function handleSearchDictionary(params){

    return fetch(
        gatewayUrl + '/apix/dic/getList?sid='+params.sid+'&name='+params.name,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}
/*删除选中列表项*/
export function handleDeleteDictionaryDetail(params){

    return fetch(
        gatewayUrl + '/apix/dic/deleteWord?word='+params.word+'&tag='+params.tag+'&userId='+params.userId+'&locale='+params.locale+'&sid='+params.sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}
/*增加列表项*/
export function handleAddDictionaryDetail(params){

    return fetch(
        gatewayUrl + '/apix/dic/addWord?mainWord='+params.mainWord+'&tagCode='+params.tagCode+'&userId='+params.userId+'&locale='+params.locale+'&sid='+params.sid+'&thesaurus='+params.thesaurus,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*获取词典标签列表*/

export function handleGetTagDetail(sid,name){

    return fetch(
        gatewayUrl + '/apix/dic/getTagList?sid='+sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*词典列表分页*/
export function changeDictionaryPage(params){

    return fetch(
        gatewayUrl + '/apix/dic/getList?sid='+params.sid+'&startPage='+params.startPage,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}







