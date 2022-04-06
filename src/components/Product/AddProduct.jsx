import { Card,Form,Input,Button } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import MyCascader from './MyCascader'
import PictureWalls from './PictureWalls'

export default function AddProduct() {
  return (
    <Card title={<span><NavLink to='/admin/product'><ArrowLeftOutlined /></NavLink>商品详情</span>}>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="商品名称"
          name="productname"
          rules={[{ required: true, message: '输入商品名称' }]}
        >
          <Input placeholder='请输入商品名称'/>
        </Form.Item>

        <Form.Item
          label="商品描述"
          name="desc"
          rules={[{ required: true, message: '请输入商品描述' }]}
        >
          <Input.TextArea placeholder='请输入商品描述'/>
        </Form.Item>

        <Form.Item
          label="商品价格"
          name="price"
          rules={[{ required: true, message: '请输入商品价格' }]}
        >
          <Input type='number' addonAfter='元' placeholder='请输入商品价格'/>
        </Form.Item>

        <Form.Item
          label="商品分类"
          name="category"
          rules={[{ required: true, message: '请输入商品分类' }]}
        >
          <MyCascader/>
        </Form.Item>
        <Form.Item
          label='商品图片'
          name='image'
        >
          <PictureWalls/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
