import React, { useState } from 'react';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const PictureWalls = () => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({file,fileList }) => {
    if(file.status === 'done'){
        if(file.response.status === 0){
            message.success('上传成功')
            const {name,url} = file.response.data
            file.name = name
            file.url = url
        }
        else message.error('上传失败')
    }
    setFileList(fileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="/manage/img/upload"
        method='POST'
        name='image'
        accept='image/*'
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default PictureWalls