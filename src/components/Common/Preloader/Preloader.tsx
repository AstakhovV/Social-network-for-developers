import loader from "../../../assets/image/loader.gif";
import React from "react";

type PropsType = {

}

let Preloader: React.FC<PropsType> = () => {
    return <div>
        <img src={loader}/>
    </div>

}
export default Preloader;