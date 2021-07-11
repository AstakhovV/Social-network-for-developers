
import React from "react";
import {Spin} from "antd";

type PropsType = {

}

let Preloader: React.FC<PropsType> = () => {
    return <div>
        <Spin size="large" />
    </div>

}
export default Preloader;