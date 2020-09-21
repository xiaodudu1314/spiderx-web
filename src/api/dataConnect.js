import fetch from 'dva/fetch';
import {gatewayUrl} from "./cong"

let token="$2a$10$ZuVxPar1X7IJb0CstXMXBudB1tzP.Fw"
// 数据连接接口(左侧列表）
export function handleGetDataList(params){
  // debugger
    return fetch(
        gatewayUrl + '/datasource/dblink/getListByPage?createUserId='+params.createUserId+'&startPage='+params.startPage+'&pageSize='+params.pageSize,{
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
        })
}
 //单条数据详情
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


//获取数据库全部表
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
}