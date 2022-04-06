import React from 'react'
import { Card,List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import './ProductDetails.less'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function ProductDetails() {

  const { state:{event} } = useLocation()
  console.log(event)

  return (
    <>
      <Card title={<span><NavLink to='/admin/product'><ArrowLeftOutlined/></NavLink>商品详情</span>}>
        <List>
          <List.Item>
            <span className='list-title'>商品名称:</span>
            <span>{event.name}</span>
          </List.Item>
          <List.Item>
            <span className='list-title'>商品描述:</span>
            <span>{event.desc}</span>
          </List.Item>
          <List.Item>
            <span className='list-title'>商品价格:</span>
            <span>{event.price}</span>
          </List.Item>
          <List.Item>
            <span className='list-title'>所属分类:</span>
            <span>数码--电脑</span>
          </List.Item>
          <List.Item>
            <span className='list-title'>商品图片:</span><img src='http://localhost:5001/upload/image-1648795940017.png' alt='img' 
                    style={{'width':'40px','height':'40px'}}></img>
          </List.Item>
          <List.Item>
            <span className='list-title'>商品详情:</span>
            <span style={{'width':'800px'}}>{event.detail}</span>
          </List.Item>
        </List>
      </Card>
    </>
  )
}
