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