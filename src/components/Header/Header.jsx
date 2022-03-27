import React from 'react'
import "./Header.less"
import { reqWeather } from '../../api'
import { useEffect } from 'react'
import { useState } from 'react'
import { message } from 'antd'
import { formDateTime } from '../../utils/timeUtils'
import memoryUtils from '../../utils/memoryUtils'

export default function Header() {

  const user = memoryUtils.user

  const [weather,changeWeather] = useState('晴')
  const [temperature,changeTemputer] = useState('null')
  const [time,changeTime] = useState('2021-1-1 0:0:0')

  reqWeather().then( response => {
    changeWeather(response.data.lives[0].weather)
    changeTemputer(response.data.lives[0].temperature)
  }).catch(error => {
    message.error(error.message)
  })

  const getTime = () => {
    setInterval(()=>{
      const currentTime = Date.now()
      changeTime(formDateTime(currentTime))
    },1000)
  }

  useEffect(()=>{
    getTime()
  },)

  return (
    <div className='header'>
        <div className='header_top'>
          <span>欢迎,{user.username}</span>
          <a href='javescript:'>退出</a>
        </div>
        <div className='header_bottom'>
          <div className='header_bottom_left'>首页</div>
          <div className='header_bottom_right'>
            <span>{time}</span>
            <span className='middle'>{temperature}度</span>
            <span>{weather}</span>
          </div>
        </div>
    </div>
  )
}
