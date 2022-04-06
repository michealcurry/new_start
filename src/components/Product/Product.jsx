import React, { useEffect, useState } from 'react'
import { Card,Input,Select,Button,Table } from 'antd'
import { reqGetProducts, reqUpdateStatus } from '../../api'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Product() {

  const [products,changeProducts] = useState([])
  const [total,changeTotal] = useState(0)
  const [pageNum,changePageNum] = useState(1)
  const [Status,ChangeStatus] = useState(false)

  const navigate = useNavigate()
  useEffect(()=>{
    const getProducts = async ()=>{
      const result = await reqGetProducts(pageNum,3)
      changeProducts(result.data.data.list)
      changeTotal(result.data.data.total)
    }
    getProducts()
  },[pageNum,Status])

  const showDetails = (event)=>{
    navigate('/admin/productdetails',{state:{event}})
  }

  const changeStatus = (_id,status)=>{
    if(status===1) status=0
    else if(status===0) status=1
    reqUpdateStatus(_id,status)
    ChangeStatus(status)
  }



  const title = (
    <>
      <span>
        <Select>
          <Select.Option key='1'>
            按名字搜索
          </Select.Option>
          <Select.Option key='2'>
            按关键字搜索
          </Select.Option>
        </Select>
        <Input placeholder='关键字' style={{ "margin": '0 15px 0 15px',"width":'150px' }}></Input>
        <Button type='primary'>搜索</Button>
      </span>
    </>
  )
  
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render : (price) => {
        return (
          `¥${price}`
        )
      }
    },
    {
      title:'状态',
      dataIndex:'',
      render : (event) => {
        const {status,_id} = event
        return (
          status===1 ? 
          <><Button type='primary' onClick={()=>{changeStatus(_id,status)}}>下架</Button><br></br>在售</> : 
          <><Button type='primary' onClick={()=>{changeStatus(_id,status)}}>上架</Button><br></br>售磬</>
        )
      }
    },
    {
      title:'操作',
      render: (event)=>{
        return (
          <>
            <Button type='link' onClick={()=>{showDetails(event)}}>详情</Button>
            <br></br>
            <Button type='link'>修改</Button>
          </>
        )
      }
    }
  ];


  return (
    <>
    {
      
    }
      <Card
        title={title}
        extra={<><NavLink to='/admin/AddProduct'><Button type='primary'>添加商品</Button></NavLink></>}
      >
        <Table
          rowKey={record => record._id}
          dataSource={products}
          columns={columns}
          bordered
          pagination = {{pageSize:3,showQuickJumper:true,total:total,onChange:(pageNum)=>{changePageNum(pageNum)}}}
        />
      </Card>
    </>
  )
}
