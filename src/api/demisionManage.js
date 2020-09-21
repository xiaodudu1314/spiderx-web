import fetch from 'dva/fetch';
import {gatewayUrl} from "./cong"

let token="$2a$10$ZuVxPar1X7IJb0CstXMXBudB1tzP.Fw"
//维度管理接口(左侧列表）
export function handleGetDataList(params){
  // debugger
    return fetch(
        gatewayUrl + '/apix/dimension/getListByPage?entityCode='+params.entityCode+'&sid='+params.sid+'&startPage='+params.startPage+'&pageSize='+params.pageSize,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
}
//详细信息
export function handleGetDataListDetail(id,sid){
   // debugger
    return fetch(
        gatewayUrl + "/apix/dimension/findById?id="+id+"&sid="+sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*获取配置的业务数据库列表,获取dbName*/
export function handelGetDBName(sid){

    return fetch(
        gatewayUrl + '/apix/db/getListByPage?sid='+sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}


/*-获取所有数据库表*/
export function handleGetTableList(params){

    return fetch(
        gatewayUrl + '/apix/db/getTableList?dbId='+params.dbId+'&sid='+params.sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*-获取所有字段*/
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

/*关键字查询*/
export function handleSearch(params){

    return fetch(
        gatewayUrl + '/apix/indics/getListByPage?sid='+params.sid+'&value='+params.name+'&entityCode='+params.entityCode+'&pageSize='+params.pageSize,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*-删除*/
export function handelDeleData(params){

    return fetch(
        gatewayUrl + '/apix/dimension/delete?sid='+params.sid+'&id='+params.id+'&userId='+params.userId,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}

/*
/!*获取所有数据库表*!/
export function handleGetTableList(params){

    return fetch(
        gatewayUrl + '/apix/db/getTableList?dbId='+params.dbId+'&sid='+params.sid,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
        })
}
*/

//更新右侧表详情信息--编辑
export function handleEditDataDetail(params){
    // debugger
    return fetch(
        gatewayUrl + "/apix/dimension/update?sid="+params.sid+"&userId="+params.userId,{
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json', "Authorization": token,
            },
            body:JSON.stringify(params)
        })
}

//二级目录
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

/*
export function handleGetDataDetail(params){
    // debugger
    return fetch(
        gatewayUrl + '/datasource/dblink/findById?id='+params.id,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
}
*/


//获取数据库全部表
/*
export function handleGetTableList(params){
    // debugger
    return fetch(
        gatewayUrl + '/datasource/dblink/getTableList?dbId='+params.dbId+'&dbName='+params.dbName,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
}*/
