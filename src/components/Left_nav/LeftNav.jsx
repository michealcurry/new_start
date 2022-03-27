import React from 'react'
import './Left_nav.less'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

export default function LeftNav() {

  const showMenuList = (menuList) => {
    return menuList.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Menu.Item>)
      }
      else {
        return (
          <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
            {showMenuList(item.children)}
          </SubMenu>
        )
      }
      
    })
  }

  return (
    <div className='left_nav'>
      <div className='left_nav_head'>
        <img src={logo} alt='logo'/>
        <NavLink to='/admin'>
          <h1>
            硅谷后台
          </h1>
        </NavLink>
      </div>
      <div>
        <Menu
          selectedKeys={[window.location.pathname.slice(7)]}
          mode="inline"
          theme="dark"
        >
          {
            showMenuList(menuList)
          }
        </Menu>
      </div>
    </div>
  )
}
