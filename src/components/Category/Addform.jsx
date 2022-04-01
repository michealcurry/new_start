import { Form,Select,Input } from 'antd'
import React from 'react'
import PubSub from 'pubsub-js'

export default function Addform(props) {

    const {categories} = props

    const handleChange = (value)=>{
        PubSub.publish('selectedCategory',value)
    }

    const handleChangeinput = (event)=>{
        PubSub.publish('input_text',event.target.value)
    }

    return (
        <>
            <Form>
                <Form.Item key='select'>
                    <Select defaultValue='一级分类' onChange={handleChange}>
                        <Select.Option key='一级分类' value={'0'}>
                            一级分类
                        </Select.Option>
                        {
                            categories.map((item) => {
                                return (<Select.Option key={item._id} value={item._id}>
                                    {item.name}
                                </Select.Option>)
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item 
                    key='input'
                    name='input'
                    rules={[{ required: true, message: '请输入添加的类别' }]}
                    >
                    <Input style={{ width: '100%' }} onChange={handleChangeinput}/>
                </Form.Item>
            </Form>
        </>
    )
}
