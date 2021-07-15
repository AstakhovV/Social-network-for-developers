import React from "react";
import { useSelector} from "react-redux";
import Preloader from "../Common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {Divider} from "antd";

type UsersPagePropsType = {
}

const UsersPage: React.FC<UsersPagePropsType> = (props) =>{
    const isFetching = useSelector(getIsFetching)

    return <>
        <Divider orientation="left">Developers</Divider>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}
export const UsersContainer = WithAuthRedirect(UsersPage)