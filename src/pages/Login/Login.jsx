import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.less"
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storegeUtils from '../../utils/storageUtils';
import store from 'store';

export default function Login() {

  const navigate = useNavigate()

  const user = store.get('user_key')
  
  useEffect(()=>{
    if(user){
      navigate('/admin')
    }
  })

  const onFinish = async (event)=>{
    const response = await reqLogin(event.username,event.password)
    const result = response.data
    if(result.status === 0){
      memoryUtils.user = result.data
      storegeUtils.saveUser(result.data)
      message.success('登陆成功！')
      navigate('/admin')

    }
    if(result.status === 1){
      message.error(result.msg)
    }

  }

  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt='logo'/>
        <h1>后台管理</h1>
      </header>
      <section className='login-content'>
        <h2>用户登陆</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入你的用户名' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入你的密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
