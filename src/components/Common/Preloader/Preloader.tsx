
import React from "react";
import {Spin} from "antd";

type PropsType = {

}

let Preloader: React.FC<PropsType> = () => {
    return <div style={{textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
    </div>

}
export default Preloader;