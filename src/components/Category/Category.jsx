import React, { useEffect, useState } from 'react'
import { Card,Table,Button,Modal} from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { reqAddCategory, reqCategory } from '../../api';
import Addform from './Addform';
import Updateform from './Updateform';
import PubSub from 'pubsub-js'

export default function Category() {

  const [parentId,changeParentId] = useState('0')
  const [categories,changeCategories] = useState([])
  const [loading,changLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(0);
  const [parentName,changeParentName] = useState('')
  const [Add_form,changeAddform] = useState({})

  PubSub.subscribe('selectedCategory',(msg,data)=>{
    changeAddform({...Add_form,parentId:data})
  })

  PubSub.subscribe('input_text',(msg,data)=>{
    changeAddform({...Add_form,categoryName:data})
  })


  const showSubCategories = (event)=>{
    changeParentId(event._id)
    changeParentName(event.name)
  }

  const handleOk = () => {
    reqAddCategory(Add_form)
    changeParentId(Add_form.parentId)
    setIsModalVisible(0);
  };

  const handleCancel = () => {
    setIsModalVisible(0);
  };
  
  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'operate',
      render:(event)=>{
        return (
          <span>
            <Button type='link' onClick={()=>{setIsModalVisible(1)}}>修改分类</Button>
            <Modal title="修改分类" visible={isModalVisible===1?true:false} onOk={handleOk} onCancel={handleCancel}>
                <Updateform/>  
            </Modal>
            <Button type='link' onClick={()=>{showSubCategories(event)}}>查看子分类</Button>
          </span>
        )
      }
    },
  ];

  useEffect(()=>{
    const getCategories = async () => {
      const response = await reqCategory(parentId)
      const raw_data = response.data.data
      const data = raw_data.map((item)=>{
        return {...item,key:item._id}
      })
      changeCategories(data)
    }
    changLoading(true)
    getCategories()
    changLoading(false)
  },[parentId])



  return (
    <>
      <Card
        title={parentId === '0' ? 
        <span>一级分类</span> : 
        <span>
          <Button 
          type='link' 
          onClick={() => { changeParentId('0') }}>一级分类</Button><ArrowRightOutlined/>{parentName}
        </span>} 
        extra={<>
                <Button onClick={()=>{setIsModalVisible(2)}}>
                  添加
                </Button>
                <Modal title="添加分类" visible={isModalVisible===2?true:false} onOk={handleOk} onCancel={handleCancel}>
                  <Addform categories={categories}/>
                </Modal>
              </>
                } 
        style={{ width: "100%" }}>
        <Table 
          dataSource={categories} 
          columns={columns} 
          pagination={{pageSize:5}}
          loading = {loading}
        />
      </Card>
    </>
  )
}
