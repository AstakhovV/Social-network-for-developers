import React, {useState} from "react";
import style from './Paginator.module.css';
import cn from "classnames";
import { Pagination } from 'antd';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage?: number,
    onPageChanged?: (pageNumber: number) => void,
    portionSize?: number
}
let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged = () => {}, portionSize = 10}) => {

    function itemRender(current: any, type: string, originalElement: any) {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    }

    return (
        <>
            <Pagination total={totalUsersCount}
                        showSizeChanger={false}
                        onChange={onPageChanged}
                        itemRender={itemRender} />
        </>
    )

}

export default Paginator

//