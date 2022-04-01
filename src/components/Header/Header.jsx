import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Header.less"
import { reqWeather } from '../../api'
import { useEffect } from 'react'
import { useState } from 'react'
import { message } from 'antd'
import { formDateTime } from '../../utils/timeUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import storegeUtils from '../../utils/storageUtils'

export default function Header() {

  const user = memoryUtils.user
  const navigate = useNavigate()
  var title = '首页'

  const [weather,changeWeather] = useState('晴')
  const [temperature,changeTemputer] = useState('null')
  const [time,changeTime] = useState('2021-1-1 0:0:0')
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const logout = ()=> {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    storegeUtils.removeUser()
    memoryUtils.user = {}
    navigate('/login')
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  useEffect(()=>{
    getTime()
    return ()=>{
      clearInterval()
    }
  })

  const changeTitle = () => {
    const pathname = window.location.pathname.slice(7)
    menuList.forEach((item)=>{
      if(item.key === pathname) title = item.title
      else if(item.children) {
        item.children.forEach((child)=>{
          if(child.key === pathname) title = child.title
        })
      }
    })
  }

  return (
    <div className='header'>
        <div className='header_top'>
          <span>欢迎,{user.username}</span>
          <a href='javescript:' onClick={logout}>退出</a>
          <Modal title="提示框" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>你确定要退出吗？</p>
          </Modal>
        </div>
        {
          changeTitle()
        }
        <div className='header_bottom'>
          <div className='header_bottom_left'>{title}</div>
          <div className='header_bottom_right'>
            <span>{time}</span>
            <span className='middle'>{temperature}度</span>
            <span>{weather}</span>
          </div>
        </div>
    </div>
  )
}
