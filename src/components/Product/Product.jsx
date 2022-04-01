import React from 'react'
import { Card,Input,Select,Button,Table } from 'antd'

export default function Product() {

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

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  return (
    <>
      <Card
        title={title}
        extra={<Button type='primary'>添加商品</Button>}
      >
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </>
  )
}
