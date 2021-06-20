import React, {useState} from "react";
import style from './Paginator.module.css';
import cn from "classnames";


type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}
let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={style.paginator}>
        {portionNumber > 1 &&
        <button className={style.button} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}> Prev </button>}


        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [style.selectedPage]: currentPage === p
                }, style.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}


        {portionCount > portionNumber &&
        <button className={style.button} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}> Next </button>}

    </div>

}

export default Paginator