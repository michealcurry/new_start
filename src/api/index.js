/*
根据api定义接口请求函数
*/

import ajax from "./ajax";

export const reqLogin = (username,password) => {
    return ajax('/login',{username,password},'POST')
}

export const reqAddUser = (username,password,phone,email,role_id) => {
    return ajax('/manage/user/add',{username,password,phone,email,role_id},'POST')
}

export const reqWeather = () => {
    return ajax('https://restapi.amap.com/v3/weather/weatherInfo?key=2d64fccaa0f8e843bc6155a102cef567&city=110115',
    {},'GET')
}

export const reqCategory = (parentId) => {
    return ajax('/manage/category/list',{parentId},'GET')
}

export const reqAddCategory = ({parentId,categoryName}) => {
    return ajax('/manage/category/add',{parentId,categoryName},'POST')
}

export const reqGetProducts = (pageNum,pageSize) => {
    return ajax('/manage/product/list',{pageNum,pageSize},'GET')
}

export const reqUpdateStatus = (productId,status) => {
    return ajax('/manage/product/updateStatus',{productId,status},'POST')
}

export const reqGetRole = () => {
    return ajax('/manage/role/list',{},'GET')
}

export const reqAddRole = (roleName) => {
    return ajax('/manage/role/add',{roleName},'POST')
}

export const reqUpdateRole = (_id,menus,auth_time,auth_name) => {
    return ajax('/manage/role/update',{_id,menus,auth_time,auth_name},'POST')
}