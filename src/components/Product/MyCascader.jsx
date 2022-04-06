import React, { useEffect, useState } from 'react'
import { Cascader } from 'antd';
import { reqCategory } from '../../api/index'

export default function MyCascader() {

    const [options,changeOptions] = useState([])

    useEffect(()=>{
        const getCategory = async () => {
            const { data : { data } } = await reqCategory(0)
            const array = data.map((item)=>{
                return {'label':item.name,'value':item.name,'isLeaf':false,children:[],_id:item._id}
            })
            changeOptions(array)
        }
        getCategory()
    },[])

    function onChange(value,selectedOptions) {
        console.log(value);
        console.log(selectedOptions)
    }

    const loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        setTimeout(()=>{
            targetOption.loading = false;
            reqCategory(targetOption._id).then(response=>{
                const {data:{data}} = response
                data.map((item)=>{
                    return targetOption.children =[...targetOption.children,{value:item.name,label:item.name}]
                })
            })
            changeOptions([...options]);
        },1000)
    };

    return (
        <Cascader
            options={options}
            loadData={loadData}
            onChange={onChange}
        />
    )
}





