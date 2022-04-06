import { Button,Card, Table,Modal,Input,Form, message,TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import { formDateTime } from '../../utils/timeUtils';
import { reqGetRole,reqAddRole, reqUpdateRole } from '../../api';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';


export default function Role() {
  
  const [roles,changeRoles] = useState([])
  const [role,changeRole] = useState({})
  const [isVisible,setIsVisible] = useState(false)
  const [isVisible_add,setIsVisible_add] = useState(false)
  const [inputContent,setInputContent] = useState('')
  const [value, setValue] = useState(undefined);
  const [treeNode,setTreeNode] = useState(<></>)
  const [success,setSuccess] = useState(false)

  const onChange = (value) => {
    setValue(value);
  };

  useEffect(()=>{
    const getRole = async ()=> {
      const {data:{data}} = await reqGetRole()
      changeRoles(data)
    }
    getRole()
  },[success])

  useEffect(()=>{
    setTreeNode(menuList.map((item)=>{
      if(item.children) {
        return {title:item.title,value:item.key,key:item.key,children:item.children.map((child)=>{
          return {title:child.title,value:child.key,key:child.key}
        })}
        
      }
      else return {title:item.title,value:item.key,key:item.key}
    }))
  },[])

  const handleChange = (event) => {
    setInputContent(event.target.value)
  }
  
  const handleOk = async() => {
    const result = await reqAddRole(inputContent)
    if(result.data.status === 0) message.success('添加成功！')
    else if(result.data.status === 1) message.error('添加失败,请稍后重试')
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleOk_add = async() => {
    const currentTime = Date.now()
    const result = await reqUpdateRole(role._id,value.map(item => '/'+item),currentTime,memoryUtils.user.username)
    if(result.data.status === 0){
      message.success('设置成功！')
      setSuccess(true)
    }
    else if(result.data.status === 1) message.error('设置失败,请稍后重试')
    setIsVisible_add(false);
  };

  const handleCancel_add = () => {
    setIsVisible_add(false);
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render : (create_time) => {return formDateTime(create_time)}
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      key: 'auth_time',
      render : (auth_time) => {return formDateTime(auth_time)}
    },
    {
      title:'授权人',
      dataIndex:'auth_name',
      key:'auth_name'
    }
  ];


  return (
    <Card
    title = {
      <>
        <Button type='primary' style={{'margin':'0 15px'}} onClick={()=>{setIsVisible(true)}}>创建角色</Button>
        <Button type='primary' disabled={!role._id} onClick={()=>{setIsVisible_add(true)}}>设置角色权限</Button>
      </>
    }
    >
      <Modal title='添加角色' visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label='角色名称' name='角色名称' key='name' rules={[{required:true}]}>
            <Input placeholder='请输入角色名称' onChange={handleChange}></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title='设置角色权限' visible={isVisible_add} onOk={handleOk_add} onCancel={handleCancel_add}>
        <TreeSelect
          treeData={treeNode}
          showSearch
          style={{ width: '100%' }}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择需要设置的权限"
          allowClear
          //multiple
          treeDefaultExpandAll
          onChange={onChange}
          treeCheckable
        >
        </TreeSelect>
      </Modal>
      <Table
        rowKey={record => { return record._id }}
        rowSelection={{
          type: 'radio',
          //...rowSelection,
          selectedRowKeys:[role._id]
        }}
        dataSource={roles}
        columns={columns}
        pagination={{pageSize:3}}
        onRow={record=>{
          return {
            onClick : () => {
              changeRole(record)
              setValue(record.menus.map((item)=>{
                return item.slice(1)
              }))
            }
          }
        }}
      >

      </Table>
    </Card>
  )
}
