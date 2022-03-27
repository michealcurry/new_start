import React from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { useNavigate,Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from 'antd';
import Header from '../../components/Header/Header';
import LeftNav from '../../components/Left_nav/LeftNav';

export default function Admin(){


  const { Footer, Sider, Content } = Layout;

  const navigate = useNavigate()

  const user = memoryUtils.user

  useEffect(()=>{
    //如果内存中没有user
    if(!user){
      navigate('/login')
  }
  },)

  return (
    <>
      <Layout style={{height:"100%"}}>
        <Sider><LeftNav/></Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{"margin":"20px",backgroundColor:'white'}}><Outlet/></Content>
          <Footer style={{'textAlign':'center','marginBottom':'0','color':'gray'}}>推荐使用谷歌浏览器，观感更佳</Footer>
        </Layout>
      </Layout>
    </>
  )
}
