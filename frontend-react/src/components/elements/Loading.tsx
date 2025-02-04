import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[50dvh]">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    );
};

export default Loading;