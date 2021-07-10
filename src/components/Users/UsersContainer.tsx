import React from "react";
import { useSelector} from "react-redux";
import Preloader from "../Common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";

type UsersPagePropsType = {

}

export const UsersPage: React.FC<UsersPagePropsType> = (props) =>{
    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>Users</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}